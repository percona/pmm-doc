# Setting up PMM Client

PMM Client is a collection of agents and exporters that run on the host being monitored.

These sections cover the different ways to install PMM Client on a Linux node and register it with PMM Server.

For Debian- or Red Hat-based distributions, you can:

- Method 1: Install [`percona-release`][PERCONA_RELEASE] and [use a Linux package manager](#method-1) (`apt`/`dnf`) to install PMM Client.

- Method 2: [Download `.deb`/`.rpm` PMM Client packages and install them](#method-2-download-and-install-pmm-client-packages-manually).

For other Linux distributions, you can:

- Method 3: [Download and unpack generic PMM Client Linux binaries](#method-3-download-and-unpack-generic-linux-binary-package).

If you use [Docker][GETDOCKER], you can:

- Method 4: [run PMM Client as a Docker container](#method-4-run-pmm-client-as-a-docker-container).

<!-- TODO
- Download the PMM Client source code, compile and install it (not covered here)
-->

When you have installed PMM Client with one of these methods, you must:

- [register the node with PMM Server](#register-node-with-pmm-server),
- Configure and add services according to type.

## Before you start

- PMM Server is installed and running with a known IP address accessible from the client node.
- You have superuser (root) access on the client host.
- You have superuser access to any database servers that you want to monitor.
- These Linux packages are installed: `curl`, `gnupg`, `sudo`, `wget`.


<!--

!!! alert alert-info "Note"

    Credentials used in communication between the exporters and the PMM Server are the following ones:

    * login is `pmm`
    * password is equal to Agent ID, which can be seen e.g. on the Inventory Dashboard.
-->

## Method 1: Install PMM Client with a package manager {: package-manager }

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

!!! alert alert-success "Tip"
	If you have used `percona-release` before, disable and reenable the repository like this:

	```sh
	sudo percona-release disable all
	sudo percona-release enable original release
	```

## Method 2: Download and install PMM Client packages manually {: #manual-package }

1. Visit the [Percona Monitoring and Management 2 download][DOWNLOAD] page.
2. Under *Version:*, select the one you want (usually the latest).
3. Under *Software:*, select the item matching your software platform.
4. Click to download the package file:

	- For Debian, Ubuntu: `.deb`
	- For Red Hat, CentOS, Oracle Linux: `.rpm`

(Alternatively, copy the link and use `wget` to download it.)

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

## Method 3: Download and unpack generic Linux binary package {: #binary-package }

1. Download the PMM Client package:

	```sh
	sudo wget https://downloads.percona.com/downloads/pmm2/{{release}}/binary/tarball/pmm2-client-{{release}}.tar.gz
	```

2. Download the PMM Client package checksum file:

	```sh
	sudo wget https://downloads.percona.com/downloads/pmm2/{{release}}/binary/tarball/pmm2-client-{{release}}.tar.gz.sha256sum
	```

3. Verify the download.

	```sh
	sha256sum -c pmm2-client-{{release}}.tar.gz.sha256sum
	```

4. Unpack the package and move into the directory.

	```sh
	sudo tar xfz pmm2-client-{{release}}.tar.gz && cd pmm2-client-{{release}}
	```

5. Run the installer.

	```sh
	sudo ./install_tarball
	```

6. Change the path.

	```sh
	PATH=$PATH:/usr/local/percona/pmm2/bin
	```

7. Set up the agent

	```sh
	sudo pmm-agent setup --config-file=/usr/local/percona/pmm2/config/pmm-agent.yaml --server-address=192.168.1.123 --server-insecure-tls --server-username=admin --server-password=admin
	```

8. Open a new terminal and run the agent.

	```sh
	PATH=$PATH:/usr/local/percona/pmm2/bin pmm-agent --config-file=/usr/local/percona/pmm2/config/pmm-agent.yaml
	```

9. In the first terminal, check.

	```sh
	pmm-admin status
	```

## Method 4: Run PMM Client as a Docker container {: #docker }

The [PMM Client Docker image](https://hub.docker.com/r/percona/pmm-client/tags/) is a convenient way to run PMM Client as a preconfigured [Docker](https://docs.docker.com/get-docker/) container.

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

## Register node with PMM Server {: #register }

Register your node (`X.X.X.X` is the IP address of your PMM Server).

```sh
pmm-admin config --server-insecure-tls --server-url=https://admin:admin@X.X.X.X:443
```

- `X.X.X.X` is the address of your PMM Server.
- `443` is the default port number.
- `admin`/`admin` is the default PMM username and password. This is the same account you use to log into the PMM user interface, which you had the option to change when first logging in.

You should continue by adding services with `pmm-admin add` according to the service type.

- [MySQL and variants (Percona Server for MySQL, Percona XtraDB Cluster, MariaDB)](mysql.md)
- [MongoDB](mongodb.md)
- [PostgreSQL](postgresql.md)
- [ProxySQL](proxysql.md)
- [Amazon RDS](aws.md)
- [Microsoft Azure](azure.md)
- [Linux](linux.md)
- [External services](external.md)
- [HAProxy](haproxy.md)



<!--
`pmm-admin` won't add a client if it already exists in the PMM Server inventory database.
If you need to re-add an already existing client (e.g. after full reinstall, hostname changes, etc.), you can
use the `--force` option.

This will remove an existing node with the same name, if any, and all its dependent services.
-->









!!! seealso "See also"
	- [Percona release][PERCONA_RELEASE]



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
