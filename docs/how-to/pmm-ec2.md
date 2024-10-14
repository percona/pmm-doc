# PMM HA cluster on Amazon EC2 via Pacemaker

## Pacemaker
!!! caution alert alert-warning "Important"
    This document describes the best practices and recommendations but is not intended to be used in the production environment. Refer to your distribution documentation and enterprise support to use it in production.

At this article we provide information and procedures for configuring HA cluster, based on a Centos 9 Stream on Amazon Web Services using EC2 instances as cluster nodes.

## Prerequisites

- Two EC2 AWS Nodes built on the [Nitro System](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#ec2-nitro-instances)
- Shared storage attached to both nodes (visible on both nodes as a block device, /dev/nvme1n1 in our example)
- Shared network
- Shared NFS mount (/mnt/nfs_share) to share configuration files
- Allowed incoming/ougoing data in security groups for xpecific ports [Pacemaker](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/high_availability_add-on_reference/s1-firewalls-haar) and [PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/network.html), [Glusterfs](https://docs.gluster.org/en/latest/Administrator-Guide/Setting-Up-Clients/).


## Preparing environments

This instructions should be done on both nodes.

```sh
dnf update

dnf --enablerepo=highavailability -y install pacemaker pcs fence-agents-aws resource-agents-cloud podman
```
During installation the *pcs* and *pacemaker* was created user *hacluster*, You should create password for this user.

```sh
passwd hacluster
```
Start the *pcs* service and enable it to start on boot:

```sh
systemctl start pcsd.service
systemctl enable pcsd.service
```
In this example we have configured the network with `/etc/hosts` file:
```sh
[root@pmm1 ~]# hostnamectl hostname pmm1

[root@pmm1 ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.178.0.66 pmm1
10.178.0.215 pmm2

[root@pmm2 ~]# hostnamectl hostname pmm2

[root@pmm2 ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.178.0.215 pmm2
10.178.0.66 pmm1
```

## Installing AWS CLI on nodes

For next steps you should install and configure AWS CLI. This instructions should be done on both nodes.

The first install AWS CLI full instruction available [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

The next define AWS credentials:

```sh
[root@pmm1 ~]# aws configure
AWS Access Key ID [*******************]: *your_aws_access_key_id*
AWS Secret Access Key [****************]: *your_aws_secret_access_key*
Default region name [****]: *your_default_region*
Default output format [None]:

[root@pmm2 ~]# aws configure
AWS Access Key ID [*******************]: *your_aws_access_key_id*
AWS Secret Access Key [****************]: *your_aws_secret_access_key*
Default region name [****]: *your_default_region*
Default output format [None]:
```

## Configuring NFS storage

You can use some kinds of storages, one of them is NFS file share in AWS. More details about how to create it available [here](https://docs.aws.amazon.com/filegateway/latest/files3/CreatingAnNFSFileShare.html) and how to mount it available [here](https://docs.aws.amazon.com/filegateway/latest/files3/GettingStartedAccessFileShare.html).

Another kind is create local NFS share.

## Configuring shared block storage

First of all you should create [multi-attach EBS Volume](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes-multi.html) and [attach it](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-attaching-volume.html) to both nodes.

On both nodes in the */etc/lvm/lvm.conf* set *system_id_source* option to *uname*.

```sh
system_id_source = "uname"
```

Next procedure os done on one node that we would initially assigned as Active. In this example pmm1 node.

Create an LVM physical volume on partition:

```sh
[root@pmm1 ~]# pvcreate /dev/nvme1n1
  Physical volume "/dev/nvme1n1" successfully created.
```

Create the volume group *pmm-server* with flag *--setautoactivation n*:

```sh
[root@pmm1 ~]# vgcreate --setautoactivation n pmm-server /dev/nvme1n1
  Volume group "pmm-server" successfully created with system ID pmm1
```

Verify that the new volume group has the system ID of the node on which you are running and which you was created this volume group:

```sh
[root@pmm1 ~]# vgs -o+systemid
  VG         #PV #LV #SN Attr   VSize   VFree   System ID
  pmm-server   1   0   0 wz--n- <20.00g <20.00g pmm1
```

Create a logical volume with name *pmm-server* and check it:

```sh
[root@pmm1 ~]# lvcreate -l100%VG -n srv pmm-server
  Logical volume "srv" created.
[root@pmm1 ~]# lvs
  LV   VG         Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  srv  pmm-server -wi-a----- <20.00g
```

Create an ext4 file system:

```sh
[root@pmm1 ~]# mkfs.ext4 /dev/pmm-server/srv
mke2fs 1.46.5 (30-Dec-2021)
Creating filesystem with 5241856 4k blocks and 1310720 inodes
Filesystem UUID: 658bd61c-1861-4e7b-8f69-b23caf244fd9
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done
```

Finally create directory for mounting and mount into it:

```sh
mkdir -p /mnt/pmm-server/srv
mount /dev/pmm-server/srv /mnt/pmm-server/srv/
restorecon -R /mnt/pmm-server/srv/
```

## Creating a cluster

On one of the two nodes enter following command to authenticate the pcs user *hacluster*. In command you should specify the both node.

```sh
[root@pmm1 ~]# pcs host auth pmm1 pmm2 -u hacluster
Password:
pmm1: Authorized
pmm2: Authorized
```

Create the cluster by following command:

```sh
pcs cluster setup pmm-ha pmm1 pmm2
No addresses specified for host 'pmm1', using 'pmm1'
No addresses specified for host 'pmm2', using 'pmm2'
Sending 'corosync authkey', 'pacemaker authkey' to 'pmm1', 'pmm2'
pmm1: successful distribution of the file 'corosync authkey'
pmm1: successful distribution of the file 'pacemaker authkey'
pmm2: successful distribution of the file 'corosync authkey'
pmm2: successful distribution of the file 'pacemaker authkey'
Sending 'corosync.conf' to 'pmm1', 'pmm2'
pmm1: successful distribution of the file 'corosync.conf'
pmm2: successful distribution of the file 'corosync.conf'
Cluster has been successfully set up.
```

Enable and start created cluster:

```sh
[root@pmm1 ~]# pcs cluster enable --all
pmm1: Cluster Enabled
pmm2: Cluster Enabled
[root@pmm1 ~]# pcs cluster start --all
pmm1: Starting Cluster...
pmm2: Starting Cluster...
```

## Configuring fencing

Fencing configuration ensures that a malfunctioning node on your AWS cluster is automatically isolated, which prevents the node from consuming the cluster’s resources or compromising the cluster’s functionality. For configure fencing you should get Instance ID for each node.

```sh
[root@pmm1 ~]# echo $(curl -s http://169.254.169.254/latest/meta-data/instance-id)
i-08fbefec210b82649
[root@pmm2 ~]# echo $(curl -s http://169.254.169.254/latest/meta-data/instance-id)
i-0978929c70a86df38
```

And configure fence device:

```sh
[root@pmm1 ~]# pcs stonith create name fence_aws access_key=access-key secret_key=secret-access-key region=region pcmk_host_map="pmm1:i-08fbefec210b82649;pmm2:i-0978929c70a86df38" power_timeout=240 pcmk_reboot_timeout=480 pcmk_reboot_retries=4
```
More details about fencing available [here](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/deploying_red_hat_enterprise_linux_8_on_public_cloud_platforms/configuring-a-red-hat-high-availability-cluster-on-aws_deploying-a-virtual-machine-on-aws#aws-configuring-fencing_configuring-a-red-hat-high-availability-cluster-on-aws).

## Installing PMM

Full instructions how to set up PMM instance and how to test failover you can get [here](pacemaker.md).

## Installing network resource agents

Pacemaker cluster uses AWS networking resource agents to enable failover functionality. If a node does not respond to a heartbeat check in a set amount of time, the node is fenced and operations fail over to an additional node in the cluster. Network resource agents need to be configured for this to work.

You should define AWS Secondary Private IP Address, where *Unused-IP-Address* is unused IP address from the same availability zone:

```sh
[root@pmm1 ~]# pcs resource create privip awsvip secondary_private_ip=Unused-IP-Address --group pmm
```

Create a virtual resource. This is a VPC IP address that can be rapidly remapped from the fenced node to the failover node, masking the failure of the fenced node within the subnet, where *secondary-private-IP* is IP from previous step.

```sh
[root@pmm1 ~]# pcs resource create vip IPaddr2 ip=secondary-private-IP --group pmm
```

More details available [here](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/deploying_red_hat_enterprise_linux_8_on_public_cloud_platforms/configuring-a-red-hat-high-availability-cluster-on-aws_deploying-a-virtual-machine-on-aws#aws-installing-network-resource-agents_configuring-a-red-hat-high-availability-cluster-on-aws).

## Creating an elastic IP address

Elastic IP this is a address that can be quickly remapped from fenced node to failover node. This IP used for public access to your cluster.

Create elastic IP address:

```sh
[root@pmm1 ~]# aws ec2 allocate-address --domain pmm --output text
```

Create Secondary Elastic IP address resource, use the allocated IP address from previous step:

```sh
[root@pmm1 ~]# pcs resource create elastic awseip elastic_ip=Elastic-IP-Address allocation_id=Elastic-IP-Association-ID --group networking-group
```

## Add created resources to the cluster

And finally you should add created resources to your cluster:

```sh
pcs resource create pmm_lvm ocf:heartbeat:LVM-activate vgname=pmm-server vg_access_mode=system_id --group pmm

pcs resource create pmm_fs Filesystem device="/dev/pmm-server/srv" directory="/mnt/pmm-server/srv/" fstype="ext4" --group pmm

pcs resource create pmm-server systemd:pmm-server --group pmm
```
