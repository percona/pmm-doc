# Setting up PMM Client

PMM Client is a suite of agents and exporters that run on the host being monitored.

This section shows how to install the client software either natively on Linux or as a Docker container, and register the node with PMM Server.

## Prerequisites

- PMM Server installed known IP address accessible from client node
- Superuser access on the Linux host
- Linux packages:
	- `curl`
	- `gnupg`
	- `sudo`
	- `wget`
- Superuser access to any database servers to be added as monitored services
- System requirements:

	Supported platform:

	- Linux: PMM Client should run on any modern Red Hat or Debian-based 64-bit Linux distribution. ([Read more][PERCONA_TOOLS].)

	- Docker: To use PMM Client as a Docker container you need to install the [Docker software][GETDOCKER].


<!--

!!! alert alert-info "Note"

    Credentials used in communication between the exporters and the PMM Server are the following ones:

    * login is `pmm`
    * password is equal to Agent ID, which can be seen e.g. on the Inventory Dashboard.
-->

## Set up PMM Client on Linux

To set up PMM Client on Linux, you can:

- [Install with a package manager](#install-pmm-client-with-a-package-manager) on Debian- or Red Hat-based distributions
- [Download and install packages manually](#install-pmm-client-packages)
- Download and install generic Linux binaries
- Download the PMM Client source code, compile and install it (not covered here)


### Install PMM Client with a package manager

If you have previously enabled the experimental or testing Percona repository, disable and reenable the release component of the original repository before you start.

```sh
sudo percona-release disable all
sudo percona-release enable original release
```

Visit the the [Percona release][PERCONA_RELEASE] page for more information on setting up Percona repositories.

#### Debian-based distributions

1. Configure repositories.

    ```sh
    wget https://repo.percona.com/apt/percona-release_latest.generic_all.deb
    sudo dpkg -i percona-release_latest.generic_all.deb
    ```

2. Install the PMM Client package.

    ```sh
    sudo apt update
    sudo apt install -y pmm2-client
    ```

#### Red Hat-based distributions

1. Configure repositories.

    ```sh
    sudo yum install -y https://repo.percona.com/yum/percona-release-latest.noarch.rpm
    ```

2. Install the PMM Client package.

    ```sh
    sudo yum install -y pmm2-client
    ```


### Install PMM Client packages

1. Visit the [Percona Monitoring and Management 2 download][DOWNLOAD] page.
2. Under *Version:*, select the one you want (usually the latest).
3. Under *Software:*, select the item matching your software platform.
4. Click to download the package file:

	- For Debian, Ubuntu: `.deb`
	- For Red Hat, CentOS, Oracle Linux: `.rpm`

Alternatively, copy the link and use `wget` to download it.

Here are the download page links for each supported platform.

- [Debian 9 ("Stretch")](https://www.percona.com/downloads/pmm2/{{version}}/binary/debian/stretch/)
- [Debian 10 ("Buster")](https://www.percona.com/downloads/pmm2/{{version}}/binary/debian/buster/)
- [Red Hat/CentOS/Oracle 7](https://www.percona.com/downloads/pmm2/{{version}}/binary/redhat/7/)
- [Red Hat/CentOS/Oracle 8](https://www.percona.com/downloads/pmm2/{{version}}/binary/redhat/8/)
- [Ubuntu 16.04 ("Xenial Xerus")](https://www.percona.com/downloads/pmm2/{{version}}/binary/debian/xenial/)
- [Ubuntu 18.04 ("Bionic Beaver")](https://www.percona.com/downloads/pmm2/{{version}}/binary/debian/bionic/)
- [Ubuntu 20.04 ("Focal Fossa")](https://www.percona.com/downloads/pmm2/{{version}}/binary/debian/focal/)

#### Debian-based distributions




#### Red Hat-based distributions




## Register node with PMM Server

Register your node (`X.X.X.X` is the IP address of your PMM Server).

```sh
pmm-admin config --server-insecure-tls --server-url=https://admin:admin@X.X.X.X:443
```




!!! alert alert-info "Notes"
    - The `--server-url` argument should include `https://` prefix and PMM Server credentials, which are `admin`/`admin` by default, if not changed at first PMM Server GUI access.
	- If you change the default port 443 when running PMM Server, specify the new port number after the IP address of PMM Server.
    - By default `pmm-admin config` refuses to add client if it already exists in the PMM Server inventory database. If you need to re-add an already existing client (e.g. after full reinstall, hostname changes, etc.), you can run `pmm-admin config` with the additional `--force` option. This will remove an existing node with the same name, if any, and all its dependent services.












## Removing monitoring services with `pmm-admin remove`

Use the `pmm-admin remove` command to remove monitoring services.

**USAGE**

Run this command as root or by using the `sudo` command

```sh
pmm-admin remove [OPTIONS] [SERVICE-TYPE] [SERVICE-NAME]
```

When you remove a service, collected data remains in Metrics Monitor on PMM Server for the specified [retention period](../../faq.md#how-to-control-data-retention-for-pmm).

**SERVICES**

Service type can be `mysql`, `mongodb`, `postgresql` or `proxysql`, and service
name is a monitoring service alias. To see which services are enabled,
run `pmm-admin list`.

**EXAMPLES**

```sh
# Removing MySQL service named mysql-sl
pmm-admin remove mysql mysql-sl

# remove MongoDB service named mongo
pmm-admin remove mongodb mongo

# remove PostgreSQL service named postgres
pmm-admin remove postgresql postgres

# remove ProxySQL service named ubuntu-proxysql
pmm-admin remove proxysql ubuntu-proxysql
```

For more information, run `pmm-admin remove --help`.



[GETDOCKER]: https://docs.docker.com/get-docker/
[DOWNLOAD]: https://www.percona.com/downloads/pmm2/

[PERCONA_RELEASE]: https://www.percona.com/doc/percona-repo-config/percona-release.html
[PERCONA_TOOLS]: https://www.percona.com/services/policies/percona-software-support-lifecycle#pt
