# Restore container

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

