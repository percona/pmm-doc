# Install PMM Server with Podman on Docker image

This section provides instructions for running PMM Server with Podman based on our [Docker image](https://hub.docker.com/r/percona/pmm-server).

!!! seealso alert alert-info "See also"
    - [Docker](../docker/index.md) 
    - Other [tags](https://hub.docker.com/r/percona/pmm-server/tags) are available.

Podman is an open-source project available on most Linux platforms and resides on [GitHub](https://github.com/containers/podman). Podman is a daemonless container engine for developing, managing, and running Open Container Initiative (OCI) containers and container images on your Linux System. 

Non-privileged users could run containers under the control of Podman.

It could be just aliased (`alias docker=podman`) with docker and work with the same way. All instructions from [Docker](../docker/index.md) section also apply here.

Percona recommends running PMM as a non-privileged user and running it as part of the SystemD service provided. SystemD service ensures that the service is running and maintains logs and other management features (start, stop, etc.).

## Before you start

- Install [Podman](https://podman.io/getting-started/installation).
- Configure [rootless](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md) Podman.
- Install Watchtower to automatically update your containers with the following considerations:

      - Ensure Watchtower is only accessible from within the Docker network or local host to prevent unauthorized access and enhance container security.
      - Configure network settings to expose only the PMM Server container to the external network, keeping Watchtower isolated within the Docker network.
      - Grant Watchtower access to the Docker socket to monitor and manage containers effectively, ensuring proper security measures are in place to protect the Docker socket.
      - Verify that both Watchtower and PMM Server are on the same network, or ensure PMM Server can connect to Watchtower for communication. This network setup is essential for PMM Server to initiate updates through Watchtower.

## Run as non-privileged user to start PMM

This requires setting up PMM Server and Watchtower services:
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
    EnvironmentFile=~/.config/systemd/user/pmm-server.env
    Restart=on-failure
    RestartSec=20
    ExecStart=/usr/bin/podman run \
        --volume ~/.config/systemd/user/:/home/pmm/update/ \
        --rm --replace=true --name %N \
        --env-file=~/.config/systemd/user/pmm-server.env \
        --net pmm_default \
        --cap-add=net_admin,net_raw \
        --userns=keep-id:uid=1000,gid=1000 \
        -p 443:8443/tcp --ulimit=host ${PMM_IMAGE}
    ExecStop=/usr/bin/podman stop -t 10 %N
    [Install]
    WantedBy=default.target
    ```

2. Create the environment file at `~/.config/systemd/user/pmm-server.env`:

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

5. Visit `https://localhost:8443` to see the PMM user interface in a web browser. If you are accessing host remotely, replace localhost with the IP or server name of the host.