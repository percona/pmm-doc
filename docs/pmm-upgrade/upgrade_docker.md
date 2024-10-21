# Upgrade PMM Server using Docker

## Before you begin
{.power-number}

1. Create a backup before upgrading, as downgrades are not possible. Therefore, reverting to a previous version requires an backup made prior to the upgrade.

2. Verify your current PMM version: Check your current PMM version by navigating to **PMM Configuration > Updates** or by running the following command. If accessing remotely, replace `localhost` with the appropriate IP address or server name:

    ```sh
   docker exec -it pmm-server curl -ku admin:admin https://localhost/v1/version
    ```

## Upgrade steps
{.power-number}

1. Stop the current container:

   ```sh
   docker stop pmm-server
   ```

2. [Back up your data](../install-pmm/install-pmm-server/baremetal/docker/backup_container.md).

3. Pull the latest image:

   ```sh
   docker pull percona/pmm-server:3
   ```

4. Rename the original container:

   ```sh
   docker rename pmm-server pmm-server-old
   ```

5. Run the new container:

   ```sh
   docker run \
   --detach \
   --restart always \
   --publish 443:443 \
   --volumes-from pmm-data \
   --name pmm-server \
   percona/pmm-server:2
   ```

6. After upgrading, verify that PMM Server is running correctly and all your data is accessible.
