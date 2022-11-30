# High Availability Cluster for PMM Server

High Availability for PMM Server would be achieved in 3 phases:

1. Prevent data loss with VM integration for short outages
2. HA data sources
3. Clustered PMM

First phase improves PMM Client to survive broken connections and cache metrics that are configured for the `push` mode. This phase rely on external service to restore PMM Server, or to manual interventions to bring PMM Server and/or it's connectivity back to healthy state.

Second phase would optionally separate PMM Server from it's data sources that could run in high available clusters (highly available [PostgreSQL cluster](https://docs.percona.com/postgresql/15/solutions/high-availability.html), VictoriaMetrics [HA](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#high-availability) or [cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#cluster-availability), [ClickHouse Replication](https://clickhouse.com/docs/en/manage/replication-and-sharding)).

Third phase would add Cluster support to PMM Server so it could run in cluster mode with other PMM Servers and possibly load balance the load as well.

First two phases requires PMM Server to be managed either by some services or manually, so in case of failures caused by network outages, resource saturation, hardware failures, operating system crashes, or unexpected reboots, something or someone would restore PMM Server and get it up and running so PMM Clients and users could connect to it. Also it is required to have additional external monitoring and alerting to detect PMM Server availability and notify PMM administrator to make some actions.

First two phases would improve availability of PMM Server (or it's data) but don't provide any management capabilities to restore PMM Server to desired healthy state. But there are available solutions that could help users to automate this process:
- PMM on Kubernetes (see [Helm](helm.md))
- Pacemaker: a high-availability cluster resource manager

## PMM on Kubernetes

PMM could be deployed on Kubernetes via [Helm](helm.md) chart. This chart uses StatefulSet... 

## Pacemaker

[Pacemaker] is a high-availability cluster resource manager.

Pacemaker high availability clusters provide highly available services by eliminating single points of failure and by failing over services from one cluster node to another in case a node becomes inoperative. Typically, services in a high availability cluster read and write data (by means of read-write mounted file systems). Therefore, a high availability cluster must maintain data integrity as one cluster node takes over control of a service from another cluster node. Node failures in a high availability cluster are not visible from clients outside the cluster.

All of the currently supported distributions ship a high availability add-on/extension, which is based on the Pacemaker clustering stack, for example:
- [Red Hat High Availability Add-On]
- [SUSE Linux Enterprise High Availability Extension]

Please check your distribution documentation on Pacemaker HA as well as [Pacemaker] documentation. In this section we will give an example of possible PMM Server HA setup based on CentOS Stream 9.

It is only possible currently to have PMM Server running in Active/Passive configuration, as there re currently two resources that are exclusivly owned by the PMM Server and should belong only to one instance of it:
- network address (DNS or IP)
- storage

So in one moment of a time only one PMM Server instance could own those resources to get connection and receive data from the client and write that data after processing to DBs on a mounted storage:


![](../../_images/PMM-HA-Active-Standby.png "PMM Server, Two-Node (Active-Standby) High Availability Cluster")

In case of failures Pacemaker should make sure that IP address migrates to another node and shared storage would be mounted there as well for the passive PMM Server that would be activated in a case of a failover.

Fencing mechanism protects and restrict access to resources to avoid corruptions and collisions between cluster nodes.

In this example we would:
- turn off fencing for demonstration purpose and as it depends on HW that is used
- use High availability LVM volumes

!!! caution alert alert-warning "Important"
    In a production cluster it is required to use proper Node Fencing as well as recommended to use network attached storage with a good performance (FC, iSCSI SAN, NVMEoF). Some of the storage solution provide additional protections to isolate storage between nodes (SCSI-3 PR). 

### Prerequisites

- two Nodes
- shared storage attached to both nodes (visible on both nodes as a block device, /dev/sda in our example)
- shared network
- shared NFS mount (/mnt/nfs_share) to share configuration files

### Setup two nodes

Following instructions are done on both nodes.

Install packages and enable services:
```sh
dnf update

dnf --enablerepo=highavailability -y install pacemaker pcs fence-agents-common podman

systemctl enable --now pacemaker corosync pcsd 
```

Setup password:
```sh
passwd hacluster
```

!!! note alert alert-primary ""
    In this example we have firewall disabled, but in production you need to allow services and ports, so please refer to your distribution documentation for those procedures.


Make sure that chronyd is running and time is synced:
```sh
systemctl status chronyd
```

### Setup PMM Server

In this example we would use SystemD to manage our PMM Server, full procedure described in [Podman].

But for Pacemaker HA it requires modifications:
- config files should be located on a shared device
- `/srv` is bind mounted on a shared device

!!! caution alert alert-warning "Important"
    It is required to put configuration files in some shared resource, for example NFS and mount it on all nodes. In our example it is mounted under `/mnt/nfs_share`.
    Doing this we ensure that changing some PMM parameters we would have similar parameters on the passive node. For example updating PMM version through image tag.
    If there would be version mismatch between active and passive nodes in case of failover there is a possibility that either data could be corrupted or PM< Server just wouldn't start.

Create configuration file for PMM Server on shared storage:

```sh
cat << "EOF" > /mnt/nfs_share/pmm/pmm-server.env
# env file passed to the container
# full list of environment variables:
# https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/server/docker.html#environment-variables

# keep updates disabled
# do image replacement instead (update the tag and restart the service)
DISABLE_UPDATES=1

# Enable DBaaS feature
#ENABLE_DBAAS=1
EOF
```

Create configuration file for SystemD Service on shared storage:
```sh
cat << "EOF" > /mnt/nfs_share/pmm/env
PMM_TAG=2.32.0
PMM_IMAGE=docker.io/percona/pmm-server
EOF
```

Create SystemD service on each node:
```sh
cat << "EOF" > /usr/lib/systemd/system/pmm-server.service
[Unit]
Description=pmm-server
Wants=network-online.target
After=network-online.target
After=nss-user-lookup.target nss-lookup.target
After=time-sync.target

[Service]
Type=simple

# set environment for this unit
Environment=PMM_PUBLIC_PORT=443
Environment=PMM_VOLUME_PATH=/mnt/pmm/srv
Environment=PMM_TAG=2.32.0
Environment=PMM_IMAGE=docker.io/percona/pmm-server
Environment=PMM_ENV_FILE=/mnt/nfs_share/pmm/pmm-server.env

# optional env file that could override previous env settings for this unit
EnvironmentFile=-/mnt/nfs_share/pmm/env

ExecStart=/usr/bin/podman run --rm --replace=true --name=%N -p ${PMM_PUBLIC_PORT}:443/tcp --ulimit=host --mount=type=bind,src=${PMM_VOLUME_PATH},dst=/srv,relabel=shared --env-file=${PMM_ENV_FILE} --health-cmd=none --health-interval=disable ${PMM_IMAGE}:${PMM_TAG}
ExecStop=/usr/bin/podman stop -t 10 %N
Restart=on-failure
RestartSec=20

[Install]
Alias=%N
WantedBy=default.target

EOF

systemctl daemon-reload
```

Pre pull PMM Server image on each node for fast start of the service:
```sh
podman pull docker.io/percona/pmm-server:2.32.0
```

### Setup network

On each node setup network so to nodes could resolve and access each other.

In this example we have configured network with `/etc/hosts` file:
```sh
[root@pmm1 ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.122.151 pmm1 
192.168.122.126 pmm2

[root@pmm2 ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.122.126 pmm2
192.168.122.151 pmm1
```

```
[root@pmm1 ~]# hostnamectl hostname pmm1
[root@pmm2 ~]# hostnamectl hostname pmm2
```

### Configuring an LVM volume with an ext4 file system

This procedure is done on one node that we would initially assigned as Active. In this example `pmm1` node.

```sh
pvcreate /dev/sda1
  Physical volume "/dev/sda1" successfully created.
  Creating devices file /etc/lvm/devices/system.devices

vgcreate --setautoactivation n pmm-server /dev/sda1
  Volume group "pmm-server" successfully created with system ID pmm1

vgs -o+systemid
  VG         #PV #LV #SN Attr   VSize   VFree   System ID
  pmm-server   1   0   0 wz--n- <20.00g <20.00g pmm1     

lvcreate -l100%VG -n srv pmm-server
  Logical volume "srv" created.

lvs
  LV   VG         Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  srv  pmm-server -wi-a----- <20.00g                                                    

mkfs.ext4 /dev/pmm-server/srv
mke2fs 1.46.5 (30-Dec-2021)
Discarding device blocks: done                            
Creating filesystem with 5241856 4k blocks and 1310720 inodes
Filesystem UUID: 2db9af47-f0b8-4724-980b-52b478750d76
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
	4096000

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done   

mkdir -p /mnt/pmm-server/srv
mount /dev/pmm-server/srv /mnt/pmm-server/srv/
restorecon -R /mnt/pmm-server/srv/

```

### Creating HA cluster

Authorize nodes and create a cluster:
```
pcs host auth pmm1 pmm2

pcs cluster setup pmm_ha_cluster --start pmm1 pmm2

pcs cluster status
```

Disabling fencing only for demo purposes:
```
pcs property set stonith-enabled=false
```

!!! caution alert alert-warning "Important"
    It is required to configure proper fencing on a production cluster.

### Adding resources to the cluster

With following commands we will add:
- LVM HA that would be properly migrated and mounted by Pacemaker
- VirtualIP that also would be migrated and added by the Pacemaker to the Active node
- PMM Server systemd service that would start PMM Server with correct resources in place

```sh
pcs resource create pmm_lvm ocf:heartbeat:LVM-activate vgname=pmm_server vg_access_mode=system_id --group pmm

pcs resource create pmm_fs Filesystem device="/dev/pmm-server/srv" directory="/mnt/pmm-server/srv/" fstype="ext4" --group pmm

pcs resource create VirtualIP IPaddr2 ip=192.168.122.111 cidr_netmask=24 --group pmm

pcs resource create pmm-server systemd:pmm-server --group pmm

pcs status
Cluster name: pmm_ha_cluster
Cluster Summary:
  * Stack: corosync
  * Current DC: pmm1 (version 2.1.4-5.el9-dc6eb4362e) - partition with quorum
  * Last updated: Thu Nov 24 10:58:29 2022
  * Last change:  Thu Nov 24 10:58:26 2022 by root via cibadmin on pmm1
  * 2 nodes configured
  * 4 resource instances configured

Node List:
  * Online: [ pmm1 pmm2 ]

Full List of Resources:
  * Resource Group: pmm:
    * pmm_lvm	(ocf:heartbeat:LVM-activate):	Started pmm1
    * VirtualIP	(ocf:heartbeat:IPaddr2):	Started pmm1
    * pmm_fs	(ocf:heartbeat:Filesystem):	Started pmm1
    * pmm-server	(systemd:pmm-server):	Started pmm1

```

And that it is, we have two nodes Active/Passive PMM Server HA cluster. 

### Failover
```sh
pcs node standby pmm1
pcs node unstandby pmm1
```

pcs resource move...

stickyness

TBD

### PMM Server update

To update PMM Server:
- change TAG in the configuration file
- pre pull image on all nodes
- restart systemd service

TBD


[Pacemaker]: https://wiki.clusterlabs.org/wiki/Pacemaker
[Red Hat High Availability Add-On]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_high_availability_clusters/index
[SUSE Linux Enterprise High Availability Extension]: https://documentation.suse.com/sle-ha/15-SP4/
[Podman]: podman.md
