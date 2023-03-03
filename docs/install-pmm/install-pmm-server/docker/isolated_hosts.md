
# Isolated hosts

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
