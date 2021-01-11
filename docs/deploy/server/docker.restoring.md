# Restoring the Backed Up Information to the PMM Data Container

If you have a backup copy of your `pmm-data` container, you can restore it into a Docker container. Start with renaming the existing PMM containers to prevent data loss, create a new `pmm-data` container, and finally copy the backed up information into the `pmm-data` container.

Run the following commands as root or by using the **sudo** command

1. Stop the running `pmm-server` container.

    ```
    $ docker stop pmm-server
    ```

2. Rename the `pmm-server` container to `pmm-server-backup`.

    ```
    $ docker rename pmm-server pmm-server-backup
    ```

3. Rename the `pmm-data` to `pmm-data-backup`

    ```
    $ docker rename pmm-data pmm-data-backup
    ```

4. Create a new `pmm-data` container

    ```
    $ docker create \
       -v /opt/prometheus/data \
       -v /opt/consul-data \
       -v /var/lib/mysql \
       -v /var/lib/grafana \
       --name pmm-data \
       percona/pmm-server:1 /bin/true
    ```

!!! alert alert-warning "Important"
    The last step creates a new `pmm-data` container based on the `percona/pmm-server:1` image. If you do not intend to use the `latest` tag, specify the exact version instead, such as **1.5.0**. You can find all available versions of `pmm-server` images at [percona/pmm-server](https://hub.docker.com/r/percona/pmm-server/tags/).

Assuming that you have a backup copy of your `pmm-data`, created according to the procedure described in [Backing Up PMM Data from the Docker Container ](docker.backing-up.md), restore your data as follows:

1. Change the working directory to the directory that contains your `pmm-data` backup files.

    ```
    $ cd ~/pmm-data-backup
    ```

    !!! alert alert-info "Note"
        This example assumes that the backup directory is found in your home directory.

2. Copy data from your backup directory to the `pmm-data` container.

    ```
    $ docker cp opt/prometheus/data pmm-data:/opt/prometheus/
    $ docker cp opt/consul-data pmm-data:/opt/
    $ docker cp var/lib/mysql pmm-data:/var/lib/
    $ docker cp var/lib/grafana pmm-data:/var/lib/
    ```

3. Apply correct ownership to `pmm-data` files:

    ```
    $ docker run --rm --volumes-from pmm-data -it percona/pmm-server:1 chown -R pmm:pmm /opt/prometheus/data /opt/consul-data
    $ docker run --rm --volumes-from pmm-data -it percona/pmm-server:1 chown -R grafana:grafana /var/lib/grafana
    $ docker run --rm --volumes-from pmm-data -it percona/pmm-server:1 chown -R mysql:mysql /var/lib/mysql
    ```

4. Run (create and launch) a new `pmm-server` container:

    ```
    $ docker run -d \
       -p 80:80 \
       --volumes-from pmm-data \
       --name pmm-server \
       --restart always \
       percona/pmm-server:1
    ```

To make sure that the new server is available run the **pmm-admin check-network** command from the computer where PMM Client is installed. Run this command as root or by using the **sudo** command.

```
$ pmm-admin check-network
```
