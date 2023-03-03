# Restore

!!! summary alert alert-info "Summary"
    - Stop and remove the container.
    - Restore (rename) the backup container.
    - Restore saved data to the data container.
    - Restore permissions to the data.

---

!!! caution alert alert-warning "Important"
    You must have a [backup](#backup) to restore from.

1. Stop the container.

    ```sh
    docker stop pmm-server
    ```

2. Remove it.

    ```sh
    docker rm pmm-server
    ```

3. Revert to the saved image.

    ```sh
    docker rename pmm-server-backup pmm-server
    ```

4. Change directory to the backup directory (e.g. `pmm-data-backup`).

5. Remove Victoria Metrics data folder.

    ```sh
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 rm -r /srv/victoriametrics/data
    ```

6. Copy the data.

    ```sh
    docker cp srv pmm-data:/
    ```

7. Restore permissions.

    ```sh
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R root:root /srv && \
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R pmm:pmm /srv/alertmanager && \
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R root:pmm /srv/clickhouse && \
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R grafana:grafana /srv/grafana && \
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R pmm:pmm /srv/logs && \
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R postgres:postgres /srv/postgres && \
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R pmm:pmm /srv/prometheus && \
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R pmm:pmm /srv/victoriametrics && \
    docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R postgres:postgres /srv/logs/postgresql.log
    ```

8. Start the image.

    ```sh
    docker start pmm-server
    ```

## Remove

!!! summary alert alert-info "Summary"
    - Stop the container.
    - Remove (delete) both the server and data containers.
    - Remove (delete) both images.

---

!!! caution alert alert-warning "Caution"
    These steps delete the PMM Server Docker image and any accumulated PMM metrics data.

1. Stop pmm-server container.

    ```sh
    docker stop pmm-server
    ```

2. Remove containers.

    ```sh
    docker rm pmm-server pmm-data
    ```

3. Remove the image.

    ```sh
    docker rmi $(docker images | grep "percona/pmm-server" | awk {'print $3'})
    ```


## Environment variables

Use the following Docker container environment variables (with `-e var=value`) to set PMM Server parameters.

| Variable  &nbsp; &nbsp; &nbsp; &nbsp;                              | Description
| --------------------------------------------------------------- | -----------------------------------------------------------------------
| `DISABLE_UPDATES`                                               | Disables a periodic check for new PMM versions as well as ability to apply upgrades using the UI
| `DISABLE_TELEMETRY`                                             | Disable built-in telemetry and disable STT if telemetry is disabled.
| `METRICS_RESOLUTION`                                            | High metrics resolution in seconds.
| `METRICS_RESOLUTION_HR`                                         | High metrics resolution (same as above).
| `METRICS_RESOLUTION_MR`                                         | Medium metrics resolution in seconds.
| `METRICS_RESOLUTION_LR`                                         | Low metrics resolution in seconds.
| `DATA_RETENTION`                                                | The number of days to keep time-series data. <br />**N.B.** This must be set in a format supported by `time.ParseDuration` <br /> and represent the complete number of days. <br /> The supported units are `ns`, `us` (or `µs`), `ms`, `s`, `m`, and `h`. <br /> The value must be a multiple of 24, e.g., for 90 days 2160h (90 * 24).
| `ENABLE_VM_CACHE`                                               | Enable cache in VM.
| `ENABLE_ALERTING`                                               | Enable integrated alerting.
| `ENABLE_AZUREDISCOVER`                                          | Enable support for discovery of Azure databases.
| `ENABLE_BACKUP_MANAGEMENT`                                      | Enable integrated backup tools.
| `ENABLE_DBAAS`                                                  | Enable DBaaS features.
| `PMM_DEBUG`                                                     | Enables a more verbose log level.
| `PMM_TRACE`                                                     | Enables a more verbose log level including trace-back information.
| `PMM_PUBLIC_ADDRESS`                                            | External IP address or the DNS name on which PMM server is running.


## Preview environment variables

!!! caution alert alert-warning "Warning"
     The `PERCONA_TEST_*` environment variables are experimental and subject to change. It is recommended that you use these variables for testing purposes only and not on production.

| Variable                                                                   | Description
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------
| `PERCONA_TEST_SAAS_HOST`                                                   | SaaS server hostname.
| `PERCONA_TEST_PMM_CLICKHOUSE_ADDR`                                         | Name of the host and port of the external ClickHouse database instance.
| `PERCONA_TEST_PMM_CLICKHOUSE_DATABASE`                                     | Database name of the external ClickHouse database instance.
| `​​PERCONA_TEST_PMM_CLICKHOUSE_POOL_SIZE`                                    | The maximum number of threads in the current connection thread pool. This value cannot be bigger than max_thread_pool_size.
| `PERCONA_TEST_PMM_CLICKHOUSE_BLOCK_SIZE`                                   | The number of rows to load from tables in one block for this connection.


### Ignored variables

These variables will be ignored by `pmm-managed` when starting the server. If any other variable is found, it will be considered invalid and the server won't start.

| Variable                                                        | Description
| --------------------------------------------------------------- | ------------------------------------------------------
| `_`, `HOME`, `HOSTNAME`, `LANG`, `PATH`, `PWD`, `SHLVL`, `TERM` | Default environment variables.
| `GF_*`                                                          | Grafana's environment variables.
| `SUPERVISOR_`                                                   | `supervisord` environment variables.
| `KUBERNETES_`                                                   | Kubernetes environment variables.
| `MONITORING_`                                                   | Kubernetes monitoring environment variables.
| `PERCONA_TEST_`                                                 | Unknown variable but won't prevent the server starting.
| `PERCONA_TEST_DBAAS`                                            | Deprecated. Use `ENABLE_DBAAS`.

## Tips

- To Disable the Home Dashboard *PMM Upgrade* panel you can either add `-e DISABLE_UPDATES=true` to the `docker run` command (for the life of the container) or navigate to _PMM --> PMM Settings --> Advanced Settings_ and disable "Check for Updates" (can be turned back on by any admin in the UI).

- Eliminate browser certificate warnings by configuring a [trusted certificate].

- You can optionally enable an (insecure) HTTP connection by adding `--publish 80:80` to the `docker run` command. However, running PMM insecure is not recommended. You should also note that PMM Client *requires* TLS to communicate with the server, only working on a secure port.

### Isolated hosts

If the host where you will run PMM Server has no internet connection, you can download the Docker image on a separate (internet-connected) host and securely copy it.

1. On an internet-connected host, download the Docker image and its checksum file.

    ```sh
    wget https://downloads.percona.com/downloads/pmm2/{{release}}/docker/pmm-server-{{release}}.docker
    wget https://downloads.percona.com/downloads/pmm2/{{release}}/docker/pmm-server-{{release}}.sha256sum
    ```

2. Copy both files to where you will run PMM Server.

3. Open a terminal on the PMM Server host.

4. (Optional) Check the Docker image file integrity.

    ```sh
    shasum -ca 256 pmm-server-{{release}}.sha256sum
    ```

5. Load the image.

    ```sh
    docker load -i pmm-server-{{release}}.docker
    ```

6. Create the `pmm-data` persistent data container.

    ```sh
    docker create --volume /srv \
    --name pmm-data percona/pmm-server:{{release}} /bin/true
    ```

7. Run the container.

    ```sh
    docker run \
    --detach \
    --restart always \
    --publish 443:443 \
    --volumes-from pmm-data \
    --name pmm-server \
    percona/pmm-server:{{release}}
    ```

[tags]: https://hub.docker.com/r/percona/pmm-server/tags
[Docker]: https://docs.docker.com/get-docker/
[Docker image]: https://hub.docker.com/r/percona/pmm-server
[Docker compose]: https://docs.docker.com/compose/
[PMMC_COMPOSE]: ../client/index.md#docker-compose
[trusted certificate]: ../../how-to/secure.md#ssl-encryption
[Easy-install script]: easy-install.md
