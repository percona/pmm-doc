# Podman

How to run PMM Server with Podman on our [Docker image].

!!! note alert alert-primary ""
    The tags used here are for the current release. Other [tags] are available.

!!! seealso alert alert-info "See also"
    [Docker]


Podman is an open-source project that is available on most Linux platforms and resides on [GitHub](https://github.com/containers/podman). Podman is a daemonless container engine for developing, managing, and running Open Container Initiative (OCI) containers and container images on your Linux System. 

Containers under the control of Podman can either be run by root or by a non-privileged user.

It could be just aliased (`alias docker=podman`) with docker and work with the same way. All instructions from [Docker] section also apply here.

Percona recommends to run PMM as non-privilidged user and run it as part of SystemD service that is provided. SystemD service ensures that service is running, maintains logs and other management features (start, stop and etc).

## Before you start

- Install [Podman](https://podman.io/getting-started/installation).
- Configure [rootless](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md).

## Run as root to start PMM for the host system

!!! summary alert alert-info "Summary"
    - Install.
    - Start.
    - Open the PMM UI in a browser.

---

1. Install.

Install Percona repositories if you are going to enable PMM server for the host system: [Set_up_PMM_Client Package_manager]

    ```sh
    #install package
    sudo yum install pmm-server-systemd
    ```

    This creates and enables user and service that runs PMM.

2. Start.

    ```sh
    sudo systemctl start pmm-server
    ```

3. Visit `https://localhost:8443` to see the PMM user interface in a web browser. (If you are accessing host remotely, replace `localhost` with the IP or server name of the host.)

## Run as user to start PMM for the current user

!!! summary alert alert-info "Summary"
    - Install.
    - Start.
    - Open the PMM UI in a browser.

---

1. Install.

    ```sh

    # download systemd user service
    curl --create-dirs -s -o ~/.config/systemd/user/pmm-server.service https://raw.githubusercontent.com/percona/pmm-server/PMM-7925-podman-support/pmm-server-user.service

    # download config file with environment for PMM
    curl --create-dirs -s -o ~/.config/pmm-server/pmm-server.env https://raw.githubusercontent.com/percona/pmm-server/PMM-7925-podman-support/pmm-server.env

    # enable systemd service to start with user
    systemctl --user enable pmm-server
    ```

2. Start.

    ```sh
    systemctl --user start pmm-server
    ```

3. Visit `https://localhost:8443` to see the PMM user interface in a web browser. (If you are accessing host remotely, replace `localhost` with the IP or server name of the host.)

## Configuration

### PMM Server

SystemD service passes environment parameters to PMM from `pmm-server.env` file that is located in `/etc/pmm-server/pmm-server.env` or `~/.config/pmm-server/pmm-server.env`. File location depends on mode SystemD service was deployed (system or user).
For more information about container environment variables please look [Docker Environment_variables]

### Customize SystemD service

SystemD service uses some environment variables that could be customized if needed:

```
Environment=PMM_PUBLIC_PORT=8443
Environment=PMM_VOLUME_NAME=%N
Environment=PMM_TAG=2.27.0
Environment=PMM_IMAGE=docker.io/percona/pmm-server
```

Those environment variables could be overridden by defining them in file  `/etc/pmm-server/env` (system) or `~/.config/pmm-server/env` (user service), for example to override path to custom registry `~/.config/pmm-server/env`:

```
PMM_IMAGE=my.own/registry/pmm-server
PMM_PUBLIC_PORT=4443
```

!!! caution alert alert-warning "Important"
    It is NOT recommended to modify `PMM_TAG` for system settings (`/etc/pmm-server/env` file) as tag would be updated with newer packages during package update procedure.
    
    Do modify `PMM_TAG` in `~/.config/pmm-server/env` and update it regularly, as for users there is is no way to update it from Percona side and it needs to be done by user.

## Backup

!!! summary alert alert-info "Summary"
    - Stop PMM server.
    - Backup the container image.
    - Backup the data.

---

!!! caution alert alert-warning "Important"
    Grafana plugins have been moved to the data volume `/srv` since the 2.23.0 version. So if you are upgrading PMM from any version before 2.23.0 and have installed additional plugins then plugins should be installed again after the upgrade.
    
    To check used grafana plugins:

    ```sh
    podman exec -it pmm-server ls /var/lib/grafana/plugins
    ```

1. Stop PMM server.

    ```sh
    sudo systemctl stop pmm-server
    ```

    or

    ```sh
    systemctl --user stop pmm-server
    ```

2. Backup the container image.

    ```sh
    podman rename pmm-server pmm-server-backup
    podman tag pmm-server-backup pmm-server-backup:X.Y.Z
    ```

    !!! caution alert alert-warning "Important"
        Change X.Y.Z to PMM version you are running, or version of your choice that you could later restore from


3. Backup the data.

    ```sh
    podman volume export pmm-server --output pmm-server-backup.tar
    ```
    !!! caution alert alert-warning "Important"
        If you changed default name by `PMM_VOLUME_NAME` environment variable, use that name after `export` instead of `pmm-server` (which is default volume name).

## Upgrade

!!! summary alert alert-info "Summary"
    - Stop PMM server.
    - Backup (rename) the container and volume.
    - Update package or tag.
    - Run it.

---

!!! caution alert alert-warning "Important"
    Downgrades are not possible. To go back to using a previous version you must have created a backup of it before upgrading.

!!! hint alert alert-success "Tip"
    To see what release you are running, use the *PMM Upgrade* panel on the *Home Dashboard*, or run:

    ```sh
    podman exec -it pmm-server \
    curl -ku admin:admin https://localhost/v1/version
    ```

    (If you are accessing the podman host remotely, replace `localhost` with the IP or server name of the host.)


1. Stop PMM server.

    ```sh
    sudo systemctl stop pmm-server
    ```

    or

    ```sh
    systemctl --user stop pmm-server
    ```

2. Perform a [backup](#backup).


3. Update package or tag.

    For system installation:

    ```sh
    sudo yum update
    ```

    For user installation:

    or edit `~/.config/pmm-server/env` and create/update with a new tag from [latest release](https://per.co.na/pmm/latest):
    ```sh
    PMM_TAG=2.27.0
    ```

4. Run it.

    ```sh
    sudo systemctl start pmm-server
    ```

    or

    ```sh
    systemctl --user start pmm-server
    ```

5. Perform a [restore](#restore).

## Restore

!!! summary alert alert-info "Summary"
    - Stop PMM server.
    - Run on the saved image.
    - Restore the volume.
    - Start PMM Server.

---

!!! caution alert alert-warning "Important"
    You must have a [backup](#backup) to restore from.
    You need to perform restore only if you have issues with upgrade or with the data.

1. Stop PMM server.

    ```sh
    sudo systemctl stop pmm-server
    ```

    or

    ```sh
    systemctl --user stop pmm-server
    ```

2. Run on the saved image.

    Edit `/etc/pmm-server/env`  or `~/.config/pmm-server/env` file:

    ```sh
    PMM_IMAGE=pmm-server-backup
    PMM_TAG=X.Y.Z
    ```

    !!! caution alert alert-warning "Important"
        X.Y.Z is the version you created during the Backup

3. Restore the volume.

    ```sh
    podman volume import pmm-server pmm-server-backup.tar
    ```

4. Start PMM Server.

    ```sh
    sudo systemctl start pmm-server
    ```

    or

    ```sh
    systemctl --user start pmm-server
    ```

## Remove

!!! summary alert alert-info "Summary"
    - Stop PMM server.
    - Remove (delete) both the server and volume.
    - Remove (delete) images.

---

!!! caution alert alert-warning "Caution"
    These steps delete the PMM Server Docker image and any accumulated PMM metrics data.

1. Stop PMM server.

    ```sh
    sudo systemctl stop pmm-server
    ```

    or

    ```sh
    systemctl --user stop pmm-server
    ```

2. Remove container and volume.

    ```sh
    podman rm pmm-server
    podman volume rm pmm-server
    ```

3. Remove the image.

    ```sh
    podman rmi $(podman images | grep "percona/pmm-server" | awk {'print $3'})
    ```

[tags]: https://hub.docker.com/r/percona/pmm-server/tags
[Podman]: https://podman.io/getting-started/installation
[Docker image]: https://hub.docker.com/r/percona/pmm-server
[trusted certificate]: ../../how-to/secure.md#ssl-encryption
