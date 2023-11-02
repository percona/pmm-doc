# Set up PMM in HA mode

Set up PMM using Docker containers in a high-availability (HA) configuration following these instructions. 

PMM Server is deployed in a high-availability setup where two PMM Server instances are configured, one being the leader and the other follower. These servers provide services including:

- ClickHouse: A fast, open-source analytical database.
- VictoriaMetrics: A scalable, long-term storage solution for time series data.
- PostgreSQL: A powerful open-source relational database management system, used in this setup to store PMM data like inventory, settings, and other feature-related data.

## Importance of HA

Having high availability increases the reliability of the PMM service, as the leader server handles all client requests, and subsequent servers take over if the leader fails.

- Gossip Protocol: This protocol facilitates PMM servers to discover and share information about their states with each other. It is used for managing the PMM server list and failure detection.
- Raft Protocol: This is a consensus algorithm that allows PMM servers to agree on a leader and ensures that logs are replicated among all machines.

## Prerequisites

You will need the following before you can begin the deployment:

- Docker installed and configured on your system. If you haven't installed Docker, you can follow **[this guide](https://docs.docker.com/get-docker/)**.Docker installed and configured on your system. If you haven't installed Docker yet, you can follow **[this guide](https://docs.docker.com/get-docker/)**.
- Access credentials for ClickHouse, PostgreSQL, and VictoriaMetrics. 
- The specific PMM Server Docker image: `perconalab/pmm-server-fb:PR-3251-a24d4f4`.

## Procedure to set up PMM in HA mode

The steps to set up PMM in HA mode are:

### Step 1: Define environment variables

Before you start with the setup, define the necessary environment variables on each instance where the services will be running. These variables will be used in subsequent commands. 

For all IP addresses, use the format `17.10.1.x`, and for all usernames and passwords, use a string format like `example`. Replace each `<Your_Variable_Value>` with the desired values.


| **Variable**                                                  | **Description**
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------
| `CH_HOST_IP`                                                   | The IP address of the instance where the ClickHouse service is running or the desired IP address for the ClickHouse container within the Docker network, depending on your setup.</br></br>Example: `17.10.1.2`
| `VM_HOST_IP`                                                   | The IP address of the instance where the VictoriaMetrics service is running or the desired IP address for the VictoriaMetrics container within the Docker network, depending on your setup.</br></br>Example: `17.10.1.3`
| `PG_HOST_IP`                                     | The IP address of the instance where the PostgreSQL service is running or the desired IP address for the PostgreSQL container within the Docker network, depending on your setup.</br></br> Example: `17.10.1.4`
| `PG_USERNAME`                                    | The username for your PostgreSQL server.</br></br> Example: `pmmuser`
| `PG_PASSWORD`                                   | The password for your PostgreSQL server. </br></br>Example: `pgpassword`
| `GF_USERNAME`                                   | The username for your Grafana database user.</br></br>Example: `gfuser`
| `GF_PASSWORD`                                   | The password for your Grafana database user.</br></br>Example: `gfpassword`
| `PMM_ACTIVE_IP`                                 | The IP address of the instance where the active PMM server is running or the desired IP address for your active PMM server container within the Docker network, depending on your setup.</br></br>Example: `17.10.1.5`
| `PMM_ACTIVE_NODE_ID`                            | The unique ID for your active PMM server node.</br></br>Example: `pmm-server-active`
| `PMM_PASSIVE_IP`                                | The IP address of the instance where the first passive PMM server is running or the desired IP address for your first passive PMM server container within the Docker network, depending on your setup. </br></br>Example: `17.10.1.6`
| `PMM_PASSIVE_NODE_ID`                            | The unique ID for your first passive PMM server node.</br></br>Example: `pmm-server-passive`
| `PMM_PASSIVE2_IP`                            | The IP address of the instance where the second passive PMM server is running or the desired IP address for your second passive PMM server container within the Docker network, depending on your setup.</br></br>Example: `17.10.1.7`
| `PMM_PASSIVE2_NODE_ID`                            | The unique ID for your second passive PMM server node.</br></br>Example: `pmm-server-passive2`
| `PMM_DOCKER_IMAGE`                            | The specific PMM Server Docker image for this guide.</br></br>Example: `perconalab/pmm-server-fb:PR-3251-a24d4f4`

**Example**

```sh
export CH_HOST_IP=17.10.1.2
export VM_HOST_IP=17.10.1.3
export PG_HOST_IP=17.10.1.4
export PG_USERNAME=pmmuser
export PG_PASSWORD=pgpassword
export GF_USERNAME=gfuser
export GF_PASSWORD=gfpassword
export PMM_ACTIVE_IP=17.10.1.5
export PMM_ACTIVE_NODE_ID=pmm-server-active
export PMM_PASSIVE_IP=17.10.1.6
export PMM_PASSIVE_NODE_ID=pmm-server-passive
export PMM_PASSIVE2_IP=17.10.1.7
export PMM_PASSIVE2_NODE_ID=pmm-server-passive2
export PMM_DOCKER_IMAGE=perconalab/pmm-server-fb:PR-3251-a24d4f4
```

!!! note alert alert-primary "Note"
    Ensure that you have all the environment variables from Step 1 set in each instance where you run these commands.

### Step 2: Create Docker network (Optional)

Set up a Docker network for PMM services if you plan to run all the services on the same instance. As a result of this Docker network, your containers will be able to communicate with each other, which is essential for the High Availability (HA) mode to function properly in PMM. This step may be optional if you run your services on separate instances.

Run the following command to create a Docker network:

```sh
docker network create pmm-network --subnet=17.10.1.0/16
```

### Step 3: Set up ClickHouse

ClickHouse is an open-source column-oriented database management system. In PMM, ClickHouse stores Query Analytics (QAN) metrics, which provide detailed information about your queries.

To set up ClickHouse:

1. Pull the ClickHouse Docker image.

    ```sh
    docker pull clickhouse/clickhouse-server:23.8.2.7-alpine
    ```

2. Create a Docker volume for ClickHouse data.

    ```sh
    docker volume create ch_data
    ```

3. Run the ClickHouse container.

    If you are running all services on the same instance, use the following command:

    ```sh
    docker run -d \
    --name ch \
    --network pmm-network \
    --ip ${CH_HOST_IP} \
    -p 9000:9000 \
	-v ch_data:/var/lib/clickhouse \
    clickhouse/clickhouse-server:23.8.2.7-alpine
    ```
    
    If you're running the service on a separate instance, use the following command:

    ```sh
    docker run -d \
    --name ch \
    -p 9000:9000 \
	-v ch_data:/var/lib/clickhouse \
    clickhouse/clickhouse-server:23.8.2.7-alpine
    ```

    !!! note alert alert-primary "Note"
        In the first case, the `--network` and `--ip` flags assign a specific IP address to the container within the Docker network created in the previous step. This IP address is referenced in subsequent steps as the ClickHouse service address. These flags are not necessary in the second case, where the services are running on separate instances since ClickHouse will bind to the default network interface.


