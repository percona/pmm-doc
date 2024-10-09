Certainly. Here's the improved version in Markdown format:





# Upgrade PMM Server using Docker

## Before you begin

1. Consider creating a backup before upgrading as downgrades are not possible. To revert to a previous version, you must have created a backup before upgrading.

2. Check your current PMM version via **PMM Configuration > Updates** or run the following command. Replace `localhost` with the IP or server name if accessing remotely:

    ```sh
   docker exec -it pmm-server curl -ku admin:admin https://localhost/v1/version
    ```

## Upgrade steps

1. Stop the current container
   ```sh
   docker stop pmm-server
   ```

2. Backup your dat
   See the [backup section](#backup) for detailed instructions.

3. **Pull the latest image**
   ```sh
   docker pull percona/pmm-server:2
   ```

4. **Rename the original container**
   ```sh
   docker rename pmm-server pmm-server-old
   ```

5. **Run the new container**
   ```sh
   docker run \
   --detach \
   --restart always \
   --publish 443:443 \
   --volumes-from pmm-data \
   --name pmm-server \
   percona/pmm-server:2
   ```

## Post-Upgrade

After upgrading, verify that PMM Server is running correctly and all your data is accessible.

> **Note**: If you encounter any issues during the upgrade process, consult the [troubleshooting guide](#troubleshooting) or contact Percona support.


