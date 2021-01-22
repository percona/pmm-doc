---
written_by: Paul Jacobs
            Fábio Silva
reviewed_by: Paul Jacobs
             Someone else
reviewed_on: DATE
---

# Docker (Client)

If [Docker](https://docs.docker.com/get-docker/) is installed on a client, you can avoid installing the PMM Client package and run all of PMM's client tools and programs (exporters, agents, command-line tools) via our [PMM Client Docker image](https://hub.docker.com/r/percona/pmm-client/tags/).

---

[TOC]

---

!!! alert alert-success "Tips"
    - Adjust host firewall and routing rules to allow Docker communications. ([Read more in the FAQ.](../../faq.md#how-do-i-troubleshoot-communication-issues-between-pmm-client-and-pmm-server))
	- To get help: `docker run --rm percona/pmm-client:2 --help`

## Running PMM Client as a Docker container

1. Pull the image

        docker pull percona/pmm-client:2

2. Create a persistent data store based on the same image. This preserves local data when you pull an updated image.

        docker create -v /srv --name pmm-client-data percona/pmm-client:2 /bin/true

3. Run the container

        docker run --rm \
            -e PMM_AGENT_SERVER_ADDRESS=pmm-server-IP-address:443 \
            -e PMM_AGENT_SERVER_USERNAME=admin \
            -e PMM_AGENT_SERVER_PASSWORD=admin \
            -e PMM_AGENT_SERVER_INSECURE_TLS=1 \
            -e PMM_AGENT_SETUP=1 \
            -e PMM_AGENT_CONFIG_FILE=pmm-agent.yml \
            --volumes-from pmm-client-data percona/pmm-client:2

## Connecting to a Docker PMM Server by container name

To connect to a Dockerized PMM Server by name instead of IP:

1. Put both containers on a non-default network:

   - `docker network create <network-name>` to create a network,
   - `docker network connect <network-name> <container>` to connect a container to that network.

2. Change the value of the first option to `-e PMM_AGENT_SERVER_ADDRESS=<your-pmm-server-container-name>:443`.

!!! alert alert-success "Tip"


!!! seealso "See also"
    [pmm-agent options and environment](../../details/commands/pmm-agent.md#options-and-environment)
