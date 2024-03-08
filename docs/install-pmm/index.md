# About PMM installation

??? info "Summary"

    !!! summary alert alert-info ""
        1. [Install PMM Server](#install-pmm-server).
        2. [Install PMM Client(s)](#install-pmm-client).
        3. [Add services](#add-services).

## Install PMM Server

Install and run at least one PMM Server.

Choose from:

| Use | <i class="uil uil-thumbs-up"></i> **Benefits** | <i class="uil uil-thumbs-down"></i> **Drawbacks**|
|---|---|---
| [Docker] | 1. Quick.<br>2. Simple. | 1. Docker installation required.<br>2. Additional network configuration required.
| [Podman] | 1. Quick.<br>2. Simple.<br>3. Rootless. | 1. Podman installation required.
| [Helm] (Technical Preview) | 1. Quick.<br>2. Simple.<br>3. Cloud. | 1. Requires running Kubernetes cluster.
| [Virtual appliance]  | 1. Easily import into Hypervisor of your choice | 1. More system resources compared to Docker footprint.
| [Amazon AWS] | 1. Wizard-driven install. | 1. Non-free solution (infrastructure costs).

## Install PMM Client

Install and run PMM Client on every node where there is a service you want to monitor.

The choices are:

- With [Docker](install-pmm-client/docker.md);
- Natively, installed from:
    - [Linux package](install-pmm-client/package_manager.md) (installed with `apt`, `apt-get`, `dnf`, `yum`);
    - [Binary package](install-pmm-client/binary_package.md) (a downloaded `.tar.gz` file).

!!! hint alert "Binary is only way to install PMM client without root permissions"

## Add services

On each PMM Client, you configure then add to PMM Server's inventory the node or service you want to monitor.

??? info "Which services you can monitor?"

    - [MySQL] (and variants: Percona Server for MySQL, Percona XtraDB Cluster, MariaDB);
    - [MongoDB];
    - [PostgreSQL];
    - [ProxySQL];
    - [Amazon RDS];
    - [Microsoft Azure];
    - [Google Cloud Platform] (MySQL and PostgreSQL);
    - [Linux];
    - [External services];
    - [HAProxy];
    - [Remote instances].

[MySQL]: install-pmm-client/connect-database/mysql.md
[MongoDB]: install-pmm-client/connect-database/mongodb.md
[PostgreSQL]: install-pmm-client/connect-database/postgresql.md
[ProxySQL]: install-pmm-client/connect-database/proxysql.md
[Amazon RDS]: install-pmm-client/connect-database/aws.md
[Microsoft Azure]: install-pmm-client/connect-database/azure.md
[Google Cloud Platform]: install-pmm-client/connect-database/google.md
[Linux]: install-pmm-client/connect-database/linux.md
[External services]: install-pmm-client/connect-database/external.md
[HAProxy]: install-pmm-client/connect-database/haproxy.md
[Remote instances]: install-pmm-client/connect-database/remote.md
[Docker]: ../install-pmm/install-pmm-server/baremetal/docker/index.md
[Podman]: ../install-pmm/install-pmm-server/baremetal/podman/index.md
[Helm]: ../install-pmm/install-pmm-server/baremetal/helm/index.md
[virtual appliance]: ../install-pmm/install-pmm-server/baremetal/virtual/index.md
[Amazon AWS]: ../install-pmm/install-pmm-server/aws/aws.md
[easy install]: ../install-pmm/install-pmm-server/baremetal/easy-install.md
