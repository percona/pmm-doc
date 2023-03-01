# Add services for PMM monitoring

You must configure and add services according to the service type.

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

## Remove services for PMM monitoring

To remove (uninstall) PMM Client, do the following steps in Docker:

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
