# Upgrade PMM Server using Podman

## Before you begin

Before starting the upgrade, complete these preparation steps to ensure you can recover your system if needed and confirm compatibility with the new version:
{.power-number}

1. Create a backup before upgrading, as downgrades are not possible. Recovery to a previous version requires a backup made prior to the upgrade.

2. Verify your current PMM version from  **PMM Configuration > Updates** or by running the following command. If accessing remotely, replace `localhost` with the appropriate IP address or server name:

    ```sh
    podman exec -it pmm-server \
    curl -ku admin:admin https://localhost/v1/version
    ```

You can upgrade PMM Server using Podman either through the UI or manually using Podman commands:

    === "UI-based upgrade (recommended)"

        This method requires setting up PMM Server and Watchtower services:
        {.power-number}

        1. Create or update the PMM Server service file at `~/.config/systemd/user/pmm-server.service`:

            ```sh
            [Unit]
            Description=pmm-server
            Wants=network-online.target
            After=network-online.target
            After=nss-user-lookup.target nss-lookup.target
            After=time-sync.target

            [Service]
            EnvironmentFile=/home/admin/.config/systemd/user/pmm-server.env
            Restart=on-failure
            RestartSec=20

            ExecStart=/usr/bin/podman run \
                --volume /home/admin/.config/systemd/user/:/home/pmm/update/ \
                --rm --replace=true --name %N \
                --env-file=/home/admin/.config/systemd/user/pmm-server.env \
                --net pmm_default \
                --cap-add=net_admin,net_raw \
                --userns=keep-id:uid=1000,gid=1000 \
                -p 443:8443/tcp --ulimit=host ${PMM_IMAGE}

            ExecStop=/usr/bin/podman stop -t 10 %N

            [Install]
            WantedBy=default.target
            ```

        2. Create the environment file at `/home/admin/.config/systemd/user/pmm-server.env`:

            ```sh
            PMM_WATCHTOWER_HOST=http://watchtower:8080
            PMM_WATCHTOWER_TOKEN=123
            PMM_IMAGE=docker.io/perconalab/pmm-server:3
            ```

        3. Create or update the Watchtower service file at `~/.config/systemd/user/watchtower.service`:

            ```sh
            [Unit]
            Description=watchtower
            Wants=network-online.target
            After=network-online.target
            After=nss-user-lookup.target nss-lookup.target
            After=time-sync.target

            [Service]
            Restart=on-failure
            RestartSec=20

            Environment=WATCHTOWER_HTTP_API_UPDATE=1
            Environment=WATCHTOWER_HTTP_API_TOKEN=123
            Environment=WATCHTOWER_NO_RESTART=1
            Environment=WATCHTOWER_DEBUG=1

            ExecStart=/usr/bin/podman run --rm --replace=true --name %N \
                -v ${XDG_RUNTIME_DIR}/podman/podman.sock:/var/run/docker.sock \
                -e WATCHTOWER_HTTP_API_UPDATE=${WATCHTOWER_HTTP_API_UPDATE} \
                -e WATCHTOWER_HTTP_API_TOKEN=${WATCHTOWER_HTTP_API_TOKEN} \
                -e WATCHTOWER_NO_RESTART=${WATCHTOWER_NO_RESTART} \
                -e WATCHTOWER_DEBUG=${WATCHTOWER_DEBUG} \
                --net pmm_default \
                --cap-add=net_admin,net_raw \
                docker.io/perconalab/watchtower:latest

            ExecStop=/usr/bin/podman stop -t 10 %N

            [Install]
            WantedBy=default.target
            ```

        4. Start services:

            ```sh
            systemctl --user enable --now pmm-server
            systemctl --user enable --now watchtower
            ```

        5. Go to **PMM Configuration > Updates** and click the **Upgrade** button.

    === "Manual upgrade"

        Follow these steps to upgrade your PMM Server while preserving your monitoring data and settings—you can restore from your backup if needed.
        {.power-number}

        1. [Back up your data](../install-pmm/install-pmm-server/baremetal/podman/backup_container_podman.md).

        2. Update PMM tag by editing `~/.config/pmm-server/env` file and running the following command to set the latest release version:
            ```sh
            sed -i "s/PMM_TAG=.*/PMM_TAG=3.0.0/g" ~/.config/pmm-server/env
            ```

        3. Pre-pull the new image to ensure a faster restart:

            ```sh
            source ~/.config/pmm-server/env
            podman pull ${PMM_IMAGE}:${PMM_TAG}
            ```

        4. Restart PMM Server:

            ```sh
            systemctl --user restart pmm-server
            ```

        5. After the upgrade, verify that PMM Server is running correctly:

            ```sh
            podman ps | grep pmm-server
            ```

        6. Check the logs for any errors:

            ```sh
            podman logs pmm-server
            ```