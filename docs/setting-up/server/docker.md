# Docker

We maintain a [Docker image for PMM Server][DOCKERHUB]. This section shows how to run PMM Server as a Docker container, directly and with Docker compose. (The tags used here are for the latest version of PMM 2 ({{release}}). [Other tags are available][TAGS].)

## System requirements

**Software**

- [Docker](https://docs.docker.com/get-docker/) 1.12.6 or higher.

## Running PMM Server as a Docker container

1. Pull the image.

    ```sh
    docker pull percona/pmm-server:2
    ```

1. Create a persistent data container.

    ```sh
    docker create --volume /srv \
    --name pmm-data percona/pmm-server:2 /bin/true
    ```

    PMM Server expects the data volume (specified with `--volume`) to be `/srv`.  **Using any other value will result in data loss when upgrading.**

1. Run the image to start PMM Server.

    ```sh
    docker run --detach --restart always \
    --publish 80:80 --publish 443:443 \
    --volumes-from pmm-data --name pmm-server \
    percona/pmm-server:2
    ```

    You can disable manual updates via the Home Dashboard *PMM Upgrade* panel by adding `-e DISABLE_UPDATES=true` to the `docker run` command.

1. In a web browser, visit *server hostname*:80 or *server hostname*:443 to see the PMM user interface.

## Backup and upgrade

You can test a new release of the PMM Server Docker image by making backups of your current `pmm-server` and `pmm-data` containers which you can restore if you need to.

1. Find out which release you have now.

    ```sh
    docker exec -it pmm-server curl -u admin:admin http://localhost/v1/version
    ```

	> **Tip:** Use `jq` to extract the quoted string value.
	> ```sh
	> sudo apt install jq # Example for Debian, Ubuntu
	> docker exec -it pmm-server curl -u admin:admin http://localhost/v1/version | jq .version
	> ```

2. Check the container mount points are the same (`/srv`).

    ```sh
    docker inspect pmm-data | grep Destination
    docker inspect pmm-server | grep Destination
    ```

    With `jq`:

    ```sh
    docker inspect pmm-data | jq '.[].Mounts[].Destination'
    docker inspect pmm-server | jq '.[].Mounts[].Destination'
    ```

3. Stop the container and create backups.

    ```sh
    docker stop pmm-server
    docker rename pmm-server pmm-server-backup
    mkdir pmm-data-backup && cd $_
    docker cp pmm-data:/srv .
    ```

4. Pull and run the latest image.

    ```sh
    docker pull percona/pmm-server:2
    docker run \
    --detach \
    --restart always \
    --publish 80:80 --publish 443:443 \
    --volumes-from pmm-data \
    --name pmm-server \
    percona/pmm-server:2
    ```

5. (Optional) Repeat step 1 to confirm the version, or check the *PMM Upgrade* panel on the *Home Dashboard*.

## Restore

1. Stop and remove the running version.

    ```sh
    docker stop pmm-server
    docker rm pmm-server
    ```

2. Restore backups.

    ```sh
    docker rename pmm-server-backup pmm-server
    # cd to wherever you saved the backup
    docker cp srv pmm-data:/
    ```

3. Restore permissions.

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

4. Start (don’t run) the image.

    ```sh
    docker start pmm-server
    ```


## Running PMM Server with Docker compose

<!-- Credit: https://gist.github.com/paskal -->

1. Copy and paste this text into a file called `docker-compose.yml`.

    ```
    version: '2'
    services:
        pmm-data:
            image: percona/pmm-server:2
            container_name: pmm-data
            hostname: pmm-data
            volumes:
                - /srv
            entrypoint: /bin/true
        pmm-server:
            image: percona/pmm-server:2
            hostname: pmm-server
            container_name: pmm-server
            restart: always
            logging:
                driver: json-file
                options:
                    max-size: "10m"
                    max-file: "5"
            ports:
                - "443:443"
            # uncomment to proxy requests through another container instead of
            # accessing the container directly
            # expose:
            #     - "443"
            volumes_from:
                - pmm-data
    ```

2. Run:

    ```sh
    docker-compose up -d pmm-server
    ```

3. Access PMM Server on <https://localhost:443>

To connect PMM Client running with Docker on a different host, set up a [Docker swarm with an overlay network][DOCKER_SWARM].


<!--

On PMM Server:

```sh
docker swarm init
```

Take a copy of the output of this command.

Create a network

```sh
docker network create --driver=overlay --attachable pmm-net
```

Edit `docker-compose.yml`.

To the `pmm-server` service, add

```yaml
services:
    ...
    pmm-server:
        ...
        networks:
            - default
            - pmm-net
```

At the bottom. add:

```yaml
networks:
    default:
        driver: bridge
    pmm-net:
        external: true
```

Run `docker-compose up` and check PMM Server by logging into the web UI.

On PMM Client:

Copy and paste the `docker swarm join ...` command (output from the `docker swarm init` command run on the PMM Server host) into a terminal on the host where PMM Client will run.

Test connectivity

````
docker run -it --rm --name test --network pmm-net alpine ash
ping -c 3 pmm-server
```


Edit `docker-compose.yml`.

To the `pmm-client` service, add

```yaml
networks:
    - pmm-net
```

At the bottom. add:

```yaml
networks:
  pmm-net:
    external: true
```



-->





[TAGS]: https://hub.docker.com/r/percona/pmm-server/tags
[DOCKERHUB]: https://hub.docker.com/r/percona/pmm-server
[DOCKER_COMPOSE]: https://docs.docker.com/compose/
[DOCKER_SWARM]: https://docs.docker.com/network/network-tutorial-overlay/#use-an-overlay-network-for-standalone-containers
