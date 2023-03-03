# Install PMM server with Docker container

How to run PMM Server with Docker based on our [Docker image].

!!! note alert alert-primary ""
    The tags used here are for the current release. Other [tags] are available.

!!! seealso alert alert-info "See also"
    [Easy-install script]

**Prerequisites**

- Install [Docker] 1.12.6 or higher.

## Run docker container

!!! summary alert alert-info "Summary"
    - Pull the Docker image.
    - Copy it to create a persistent data container.
    - Run the image.
    - Open the PMM UI in a browser.

---

You can store data from your PMM in:

1. Docker volume (Preffered method)
2. Data container
3. Host directory

## Key points

- To Disable the Home Dashboard *PMM Upgrade* panel you can either add `-e DISABLE_UPDATES=true` to the `docker run` command (for the life of the container) or navigate to _PMM --> PMM Settings --> Advanced Settings_ and disable "Check for Updates" (can be turned back on by any admin in the UI).

- Eliminate browser certificate warnings by configuring a [trusted certificate].

- You can optionally enable an (insecure) HTTP connection by adding `--publish 80:80` to the `docker run` command. However, running PMM insecure is not recommended. You should also note that PMM Client *requires* TLS to communicate with the server, only working on a secure port.
