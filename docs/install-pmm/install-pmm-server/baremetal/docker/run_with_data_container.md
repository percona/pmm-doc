
# Run Docker with data container

To run Docker with data container:
{.power-number}

1. Create a persistent data container.

    ```sh
    docker create --volume /srv \
    --name pmm-data \
    percona/pmm-server:2 /bin/true
    ```

    !!! caution alert alert-warning "Important"
        PMM Server expects the data volume to be `/srv`. Using any other value will result in **data loss** when upgrading.

        To check server and data container mount points:

        ```sh
        docker inspect pmm-data | grep Destination && \
        docker inspect pmm-server | grep Destination
        ```

2. Run the image.

    ```sh
    docker run --detach --restart always \
    --publish 443:443 \
    --volumes-from pmm-data \
    --name pmm-server \
    percona/pmm-server:2
    ```

3. Change the password for the default `admin` user.

    * For PMM versions 2.27.0 and later:

    ```sh
    docker exec -t pmm-server change-admin-password <new_password>
    ```

    * For PMM versions prior to 2.27.0:

        ```sh
        docker exec -t pmm-server bash -c 'grafana-cli --homepath /usr/share/grafana --configOverrides cfg:default.paths.data=/srv/grafana admin reset-admin-password newpass'
        ```
        
4. Visit `https://localhost:443` to see the PMM user interface in a web browser. (If you are accessing the docker host remotely, replace `localhost` with the IP or server name of the host.)
