# About PMM Client installation

There are different ways to install PMM Client on a node and register it with PMM Server. Choose from:

- [Docker](docker.md): Run PMM Client as a Docker container.

- [Package manager](#package-manager):
    - On Debian or Red Hat Linux, install `percona-release` and use a Linux package manager (`apt`/`dnf`) to install PMM Client.
    - On Debian or Red Hat, download `.deb`/`.rpm` PMM Client packages and manually install them.

!!! hint alert "Binary is only way to install PMM client without root permissions"
    - [Binary package](binary_package.md): For other Linux distributions, download and unpack generic PMM Client Linux binaries.

When you have installed PMM Client, you must:

- [Register the node with PMM Server](../register-client-node/index.md).
- [Configure and add services according to type](#add-services).

If you need to, you can [unregister](#unregister), [remove services](#remove-services) or [remove PMM Client](#remove).

---

Here's an overview of the choices.

![!image](../../_images/PMM_Client_Setup.png)

## Before you start

Before installing the PMM client, check [Prerequisites to install PMM client](./prerequisites.md)


## Add services

You must configure and adding services according to the service type.

- [MySQL](mysql.md) (and variants Percona Server for MySQL, Percona XtraDB Cluster, MariaDB)
- [MongoDB](mongodb.md)
- [PostgreSQL](postgresql.md)
- [ProxySQL](proxysql.md)
- [Amazon RDS](aws.md)
- [Microsoft Azure](azure.md)
- [Google Cloud Platform](google) (MySQL and PostgreSQL)
- [Linux](linux.md)
- [External services](external.md)
- [HAProxy](haproxy.md)
- [Remote instances](remote.md)

!!! hint alert alert-success "Tip"
    To change the parameters of a previously-added service, remove the service and re-add it with new parameters.

## Remove

How to remove (uninstall) PMM Client.

### Docker

!!! caution alert alert-warning "Caution"
    These steps delete the PMM Client Docker image and client services configuration data.

1. Stop pmm-client container.

    ```sh
    docker stop pmm-client
    ```

2. Remove containers.

    ```sh
    docker rm pmm-client
    ```

3. Remove the image.

    ```sh
    docker rmi $(docker images | grep "percona/pmm-client" | awk {'print $3'})
    ```

4. Remove the volume.

    ```sh
    docker volume rm pmm-client-data
    ```

### Package manager

#### Debian-based distributions

1. Uninstall the PMM Client package.

    ```sh
    apt remove -y pmm2-client
    ```

2. Remove the Percona repository

    ```sh
    dpkg -r percona-release
    ```

#### Red Hat-based distributions

1. Uninstall the PMM Client package.

    ```sh
    yum remove -y pmm2-client
    ```

2. Remove the Percona repository

    ```sh
    yum remove -y percona-release
    ```

## Unregister

How to unregister PMM Client from PMM Server.

```sh
pmm-admin unregister --force
```

All services monitored by this node will be removed from monitoring.

## Remove services

You must specify the service type and service name to remove services from monitoring.

```sh
pmm-admin remove <service-type> <service-name>
```

`service-type`
: One of `mysql`, `mongodb`, `postgresql`, `proxysql`, `haproxy`, `external`.

!!! seealso alert alert-info "See also"
    - [Percona release]
    - [PMM Client architecture](../../details/architecture.md#pmm-client)

[Debian 11 (Bullseye)]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/bullseye/
[Debian 10 (Buster)]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/buster/
[Debian 9 (Stretch)]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/stretch/
[Docker]: https://docs.docker.com/get-docker/
[Percona Monitoring and Management 2 download]: https://www.percona.com/downloads/pmm2/
[Percona release]: https://www.percona.com/doc/percona-repo-config/percona-release.html
[Percona software support life cycle]: https://www.percona.com/services/policies/percona-software-support-lifecycle#pt
[PMM Client Docker image]: https://hub.docker.com/r/percona/pmm-client/tags/
[Red Hat/CentOS/Oracle 7]: https://www.percona.com/downloads/pmm2/{{release}}/binary/redhat/7/
[Red Hat/CentOS/Oracle 8]: https://www.percona.com/downloads/pmm2/{{release}}/binary/redhat/8/
[Ubuntu 18.04 (Bionic Beaver)]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/bionic/
[Ubuntu 20.04 (Focal Fossa)]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/focal/
[Ubuntu 22.04 (Jammy Jellyfish)]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/jammy/
