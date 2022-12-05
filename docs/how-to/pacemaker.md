# Configure Pacemaker to manage PMM HA cluster

## Pacemaker
!!! caution alert alert-warning "Important"
    This document describes best practices and some recommendations but is not intended for production use. For production use please refer to your distribution documentation and enterprise support.

[Pacemaker] is a high-availability cluster resource manager.

Pacemaker high availability clusters provide highly available services by eliminating single points of failure and by failing over services from one cluster node to another in case a node becomes inoperative. Typically, services in a high availability cluster read and write data (utilizing read-write mounted file systems). Therefore, a high availability cluster must maintain data integrity as one cluster node takes over control of a service from another cluster node. Node failures in a high availability cluster are not visible from clients outside the cluster.

All of the currently supported distributions ship a high availability add-on/extension, which is based on the Pacemaker clustering stack, for example:

- [Red Hat High Availability Add-On]
- [SUSE Linux Enterprise High Availability Extension]

Check your distribution documentation on Pacemaker HA as well as [Pacemaker] documentation. This section provides an example of a possible PMM Server HA setup based on CentOS Stream 9.

Currently, it is only possible to have PMM Server running in Active/Passive configuration, as there are currently two resources that are exclusively owned by the PMM Server and should belong only to one instance of it:

- network address (DNS or IP)
- storage

So, at any point in time, only one PMM Server instance could own those resources to get the connection and receive data from the clients and write that data after processing it to databases on a mounted storage:

![](../_images/PMM-HA-Active-Standby.png "PMM Server, Two-Node (Active-Standby) High Availability Cluster")

In case of failures, Pacemaker should make sure that IP address migrates to another node and shared storage would be mounted there as well for the passive PMM Server that would be activated in case of a failover.

Fencing mechanism protects and restricts access to resources to avoid corruption and collisions between cluster nodes.

In this example we would:

- turn off the fencing for demonstration purposes and as it depends on HW that is used
- use High availability LVM volumes

!!! caution alert alert-warning "Important"
   For a production cluster, it is necessary to use proper Node Fencing along with network-attached storage with good performance (FC, iSCSI SAN, NVMEoF). Some storage solutions provide additional protections to isolate storage between nodes (SCSI-3 PR).

## Prerequisites

- two Nodes
- shared storage attached to both nodes (visible on both nodes as a block device, /dev/sda in our example)
- shared network
- shared NFS mount (/mnt/nfs_share) to share configuration files

## Setup two nodes

The following instructions are done on both nodes.

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
    In this example, we have the firewall disabled, but in production, you need to allow services and ports, so please refer to your distribution documentation for those procedures.


Make sure that chronyd is running and time is synced:
```sh
systemctl status chronyd
```

## Setup PMM Server

In this example, we would use SystemD to manage our PMM Server, the full procedure described in [Podman].

But for Pacemaker HA it requires modifications:
- config files should be located on a shared device
- `/srv` is bind mounted on a shared device

!!! caution alert alert-warning "Important"
    It is required to put configuration files in some shared resource, for example, NFS and mount it on all nodes. In our example, it is mounted under `/mnt/nfs_share`.
    By doing this we ensure that by changing some PMM parameters we would have similar parameters on the passive node. For example, updating PMM version through the image tag.
    If there would be a version mismatch between active and passive nodes in case of failover there is a possibility that either data could be corrupted or PM< Server just wouldn't start.

Create the configuration file for PMM Server on shared storage:

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

Create the configuration file for SystemD Service on shared storage:
```sh
cat << "EOF" > /mnt/nfs_share/pmm/env
PMM_TAG=2.33.0
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
Environment=PMM_TAG=2.33.0
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

## Setup network

On each node set up the network so to nodes could resolve and access each other.

In this example we have configured the network with `/etc/hosts` file:
```sh
[root@pmm1 ~]# hostnamectl hostname pmm1

[root@pmm1 ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.122.151 pmm1 
192.168.122.126 pmm2

[root@pmm2 ~]# hostnamectl hostname pmm2

[root@pmm2 ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.122.126 pmm2
192.168.122.151 pmm1
```

## Configure an LVM volume with an ext4 file system

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

## Create HA cluster

Authorize the nodes and create a cluster:
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

## Add resources to the cluster

With the following commands we will add:
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

## Failover

In the case of node or service failure, Pacemaker would recover services and other resources on a passive/standby node. The cluster administrator would need to troubleshoot and recover failed node and bring it back online into the cluster.

The cluster administrator might have preferences on which node resources should run. This could be achieved with [constraints](https://www.clusterlabs.org/pacemaker/doc/2.1/Clusters_from_Scratch/html/apache.html#prefer-one-node-over-another) and [stickiness](https://www.clusterlabs.org/pacemaker/doc/2.1/Clusters_from_Scratch/html/active-passive.html#prevent-resources-from-moving-after-recovery).

Manually resources could be moved by:
- marking the node they are running as `standby`
- executing `pcs resource move` command

Force Pacemaker to failover to another node:
```sh
pcs node standby pmm1

[root@pmm1 ~]# pcs status
Cluster name: pmm_ha_cluster
Cluster Summary:
  * Stack: corosync
  * Current DC: pmm2 (version 2.1.4-5.el9-dc6eb4362e) - partition with quorum
  * Last updated: Thu Dec  1 07:26:19 2022
  * Last change:  Thu Dec  1 07:01:54 2022 by root via cibadmin on pmm1
  * 2 nodes configured
  * 4 resource instances configured

Node List:
  * Node pmm1: standby
  * Online: [ pmm2 ]

Full List of Resources:
  * Resource Group: pmm:
    * pmm_lvm	(ocf:heartbeat:LVM-activate):	Started pmm2
    * VirtualIP	(ocf:heartbeat:IPaddr2):	Started pmm2
    * pmm_fs	(ocf:heartbeat:Filesystem):	Started pmm2
    * pmm-server	(systemd:pmm-server):	Started pmm2

Daemon Status:
  corosync: active/disabled
  pacemaker: active/enabled
  pcsd: active/enabled
```

Don't forget to bring the node back online after resources migration:
```sh
pcs node unstandby pmm1

[root@pmm1 ~]# pcs status                
...
Node List:
  * Online: [ pmm1 pmm2 ]
```

Move resources from one node to another:
```sh
[root@pmm1 ~]# pcs resource move pmm pmm1 
Location constraint to move resource 'pmm' has been created
Waiting for the cluster to apply configuration changes...
Location constraint created to move resource 'pmm' has been removed
Waiting for the cluster to apply configuration changes...
resource 'pmm' is running on node 'pmm1'
[root@pmm1 ~]# pcs status                
Cluster name: pmm_ha_cluster
Cluster Summary:
  * Stack: corosync
  * Current DC: pmm2 (version 2.1.4-5.el9-dc6eb4362e) - partition with quorum
  * Last updated: Thu Dec  1 07:26:37 2022
  * Last change:  Thu Dec  1 07:26:31 2022 by root via cibadmin on pmm1
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

Daemon Status:
  corosync: active/disabled
  pacemaker: active/enabled
  pcsd: active/enabled
```

## PMM Server update

To update PMM Server:

- change the PMM_TAG in the configuration file
- pre pull image on all nodes
- restart systemd service

```sh
[root@pmm1 ~]# sed -i s/PMM_TAG=.*/PMM_TAG=2.33.0/ /mnt/nfs_share/pmm/env

[root@pmm1 ~]# podman pull docker.io/percona/pmm-server:2.33.0
[root@pmm2 ~]# podman pull docker.io/percona/pmm-server:2.33.0

[root@pmm1 ~]# systemctl restart pmm-server
```

Pre-pulling the image would make startup of the service faster.


[Pacemaker]: https://wiki.clusterlabs.org/wiki/Pacemaker
[Red Hat High Availability Add-On]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_high_availability_clusters/index
[SUSE Linux Enterprise High Availability Extension]: https://documentation.suse.com/sle-ha/15-SP4/
[Podman]: ../setting-up/server/podman.md
