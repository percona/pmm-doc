# High Availability Cluster for PMM Server

High Availability for PMM Server will be achieved in three phases:

1. Prevent data loss with VM integration for short outages
2. HA data sources
3. Clustered PMM

The first phase improves PMM Client to survive broken connections and cache metrics configured for the `push` mode. This phase relies on external service to restore PMM Server or for manual interventions to bring PMM Server and/or its connectivity back to a healthy state.

The second phase would optionally separate PMM Server from its data sources that could run in highly available clusters (highly available [PostgreSQL cluster](https://docs.percona.com/postgresql/15/solutions/high-availability.html), VictoriaMetrics [HA](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#high-availability) or [cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#cluster-availability), [ClickHouse Replication](https://clickhouse.com/docs/en/manage/replication-and-sharding)).

The third phase would add Cluster support to PMM Server so it could run in cluster mode with other PMM Servers and possibly load balance the load as well.

The first two phases require PMM Server to be managed by some services or manually. In case of failures caused by network outages, resource saturation, hardware failures, operating system crashes, or unexpected reboots, something or someone would restore PMM Server and get it up and running so PMM Clients and users could connect to it. Also, it is required to have additional external monitoring and alerting to detect PMM Server availability and notify the PMM administrator to take some actions.

The first two phases would improve the availability of the PMM Server (or its data) but need to provide management capabilities to restore PMM Server to a desired healthy state. Currently, the PMM administrator has to do it manually and ensure that such resources are available:

- The network which connects PMM Server, PMM Clients, and PMM users
- Storage where PMM Server store the data
- PMM Server service is running (Docker, Podman, VM)

There are available solutions that could help PMM administrator to automate the process of managing resources:

- PMM on Kubernetes (see [Helm])
- Pacemaker: a high-availability cluster resource manager

## PMM on Kubernetes

Kubernetes is an open-source system for automating containerized applications' deployment, scaling, and management.

It helps PMM Administrator to avoid complexity in taking care of resources and shift this responsibility to the Kubernetes cluster:

- Networks: `Service` and `Ingress` provide DNS and IP access and connect PMM Server with clients and users
- Storage: `PVC` ensures that storage is claimed only by one PMM Server and attached to it
- PMM Server: `StatefulSet` runs PMM as a container and connects it to the correct storage and network

PMM administrator could deploy on Kubernetes via [Helm] chart. And Kubernetes would make sure that PMM is available in case of different failures.

Check our **How To**: [Install PMM Server on Amazon EKS].
## Pacemaker

[Pacemaker] is a high-availability cluster resource manager.

Pacemaker high availability clusters provide highly available services by eliminating single points of failure and by failing over services from one cluster node to another in case a node becomes inoperative. Typically, services in a high availability cluster read and write data (by means of read-write mounted file systems). Therefore, a high availability cluster must maintain data integrity as one cluster node takes over control of a service from another cluster node. Node failures in a high availability cluster are not visible from clients outside the cluster.

All the currently supported distributions ship a high availability add-on/extension, which is based on the Pacemaker clustering stack, for example:
- [Red Hat High Availability Add-On]
- [SUSE Linux Enterprise High Availability Extension]

Check your distribution documentation on Pacemaker HA as well as [Pacemaker] documentation.

Check our **How To**: [Configure Pacemaker to manage PMM HA cluster](../../how-to/pacemaker.md).

[Pacemaker]: https://wiki.clusterlabs.org/wiki/Pacemaker
[Red Hat High Availability Add-On]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_high_availability_clusters/index
[SUSE Linux Enterprise High Availability Extension]: https://documentation.suse.com/sle-ha/15-SP4/
[Install PMM Server on Amazon EKS]: ././../how-to/pmm-eks.md
[Helm]: helm.md
