# Setting up PMM Client

PMM Client is a suite of agents and exporters that run on the host being monitored.

This section shows how to install PMM Client on a Linux node and register it with PMM Server.

You can:

On Debian, Ubuntu, Red Hat, CentOS, Oracle Linux:

- [Use `percona-release` to install with a package manager](#install-pmm-client-with-a-package-manager) on Debian- or Red Hat-based distributions

- [Download and install `.deb` or `.rpm` packages manually](#download-and-install-pmm-client-packages-manually)

On other Linux:

- Download and install generic Linux binaries

With Docker:

- [Run PMM Client as a Docker container](#run-pmm-client-as-a-docker-container),


<!--
- Download the PMM Client source code, compile and install it (not covered here)
-->


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

## Install PMM Client with a package manager

If you have previously enabled the experimental or testing Percona repository, disable and reenable the release component of the original repository before you start.

```sh
sudo percona-release disable all
sudo percona-release enable original release
```

Visit the the [Percona release][PERCONA_RELEASE] page for more information on setting up Percona repositories.

### Debian-based distributions

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

### Red Hat-based distributions

1. Configure repositories.

    ```sh
    sudo yum install -y https://repo.percona.com/yum/percona-release-latest.noarch.rpm
    ```

2. Install the PMM Client package.

    ```sh
    sudo yum install -y pmm2-client
    ```


## Download and install PMM Client packages manually

1. Visit the [Percona Monitoring and Management 2 download][DOWNLOAD] page.
2. Under *Version:*, select the one you want (usually the latest).
3. Under *Software:*, select the item matching your software platform.
4. Click to download the package file:

	- For Debian, Ubuntu: `.deb`
	- For Red Hat, CentOS, Oracle Linux: `.rpm`

Alternatively, copy the link and use `wget` to download it.

Here are the download page links for each supported platform.

- [Debian 9 ("Stretch")][DOWNLOAD_DEB_9]
- [Debian 10 ("Buster")][DOWNLOAD_DEB_10]
- [Red Hat/CentOS/Oracle 7][DOWNLOAD_RHEL_7]
- [Red Hat/CentOS/Oracle 8][DOWNLOAD_RHEL_8]
- [Ubuntu 16.04 ("Xenial Xerus")][DOWNLOAD_UBUNTU_16]
- [Ubuntu 18.04 ("Bionic Beaver")][DOWNLOAD_UBUNTU_18]
- [Ubuntu 20.04 ("Focal Fossa")][DOWNLOAD_UBUNTU_20]

### Debian-based distributions

```sh
dpkg -i *.deb
```

### Red Hat-based distributions

```sh
dnf localinstall *.rpm
```



## Download and unpack a generic Linux binary package

1. Download the PMM Client package:

	```sh
	wget https://downloads.percona.com/downloads/pmm2/{{release}}/binary/tarball/pmm2-client-{{release}}.tar.gz
	```

2. Download the PMM Client package checksum file:

	```sh
	wget https://downloads.percona.com/downloads/pmm2/{{release}}/binary/tarball/pmm2-client-{{release}}.tar.gz.sha256sum
	```

3. Verify the download.

	```sh
	sha256sum -c pmm2-client-{{release}}.tar.gz.sha256sum
	```

4. Unpack the package and move into the directory.

	```sh
	tar xfz pmm2-client-{{release}}.tar.gz && cd pmm2-client-{{release}}
	```

5. Run the installer.

	```sh
	./install_tarball
	```

6. Change the path.

	```sh
	PATH=$PATH:/usr/local/percona/pmm2/bin
	```

7. Set up the agent

	```sh
	pmm-agent setup --config-file=/usr/local/percona/pmm2/config/pmm-agent.yaml --server-address=192.168.1.123 --server-insecure-tls --server-username=admin --server-password=admin
	```

8. Open a new terminal and run the agent.

	```sh
	PATH=$PATH:/usr/local/percona/pmm2/bin pmm-agent --config-file=/usr/local/percona/pmm2/config/pmm-agent.yaml
	```

9. In the first terminal, check.

	```sh
	pmm-admin status
	```

You can now [register the node with PMM Server](#register-node-with-pmm-server).

## Run PMM Client as a Docker container

The [PMM Client Docker image](https://hub.docker.com/r/percona/pmm-client/tags/) is a convenient way to run PMM Client as a preconfigured [Docker](https://docs.docker.com/get-docker/) container.

```plantuml source="_resources/diagrams/Setting-Up_Client_Docker.puml"
```

1. Pull the PMM Client docker image.

	```sh
    docker pull \
	percona/pmm-client:2
	```

2. Use the image as a template to create a persistent data store that preserves local data when the image is updated.

	```sh
    docker create \
	--volume /srv \
	--name pmm-client-data \
	percona/pmm-client:2 /bin/true
	```

3. Run the container to start [PMM Agent](../../details/commands/pmm-agent.md) in setup mode. Set `X.X.X.X` to the IP address of your PMM Server. (Do not use the `docker --detach` option as PMM agent only logs to the console.)

	```sh
	PMM_SERVER=X.X.X.X:443
    docker run \
	--rm \
	--name pmm-client \
    -e PMM_AGENT_SERVER_ADDRESS=${PMM_SERVER} \
    -e PMM_AGENT_SERVER_USERNAME=admin \
    -e PMM_AGENT_SERVER_PASSWORD=admin \
    -e PMM_AGENT_SERVER_INSECURE_TLS=1 \
    -e PMM_AGENT_SETUP=1 \
    -e PMM_AGENT_CONFIG_FILE=pmm-agent.yml \
    --volumes-from pmm-client-data \
	percona/pmm-client:2
	```

4. Check status.

	```sh
	docker exec	pmm-client \
	pmm-admin status
	```

	In the PMM user interface you will also see an increase in the number of monitored nodes.

You can now add services with [`pmm-admin`](../../details/commands/pmm-admin.md) by prefixing commands with `docker exec pmm-client`.

!!! alert alert-success "Tips"
    - Adjust host firewall and routing rules to allow Docker communications. ([Read more in the FAQ.](../../faq.md#how-do-i-troubleshoot-communication-issues-between-pmm-client-and-pmm-server))
	- For help:
		```sh
		docker run --rm percona/pmm-client:2 --help
		```






## Register node with PMM Server

Register your node (`X.X.X.X` is the IP address of your PMM Server).

```sh
pmm-admin config --server-insecure-tls --server-url=https://admin:admin@X.X.X.X:443
```

You should continue by adding services with `pmm-admin add` according to the service type.






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
[DOWNLOAD_DEB_9]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/stretch/
[DOWNLOAD_DEB_10]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/buster/
[DOWNLOAD_RHEL_7]: https://www.percona.com/downloads/pmm2/{{release}}/binary/redhat/7/
[DOWNLOAD_RHEL_8]: https://www.percona.com/downloads/pmm2/{{release}}/binary/redhat/8/
[DOWNLOAD_UBUNTU_16]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/xenial/
[DOWNLOAD_UBUNTU_18]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/bionic/
[DOWNLOAD_UBUNTU_20]: https://www.percona.com/downloads/pmm2/{{release}}/binary/debian/focal/
[DOWNLOAD_LINUX_GENERIC]: https://downloads.percona.com/downloads/pmm2/{{release}}/binary/tarball/pmm2-client-{{release}}.tar.gz
[PERCONA_RELEASE]: https://www.percona.com/doc/percona-repo-config/percona-release.html
[PERCONA_TOOLS]: https://www.percona.com/services/policies/percona-software-support-lifecycle#pt
