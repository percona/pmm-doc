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

### Define environment variables

Before you start with the setup, define the necessary environment variables on each instance where the services will be running. These variables will be used in subsequent commands. 

For all IP addresses, use the format `17.10.1.x`, and for all usernames and passwords, use a string format like `example`. Replace each `<Your_Variable_Value>` with the desired values.


| **Variable**                                                    | **Description**
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------
| `CH_HOST_IP`                                                   | The IP address of the instance where the ClickHouse service is running or the desired IP address for the ClickHouse container within the Docker network, depending on your setup.</br></br>Example: `17.10.1.2`
| `PERCONA_TEST_PMM_CLICKHOUSE_ADDR`                                         | Name of the host and port of the external ClickHouse database instance.
| `PERCONA_TEST_PMM_CLICKHOUSE_DATABASE`                                     | Database name of the external ClickHouse database instance.
| `​​PERCONA_TEST_PMM_CLICKHOUSE_POOL_SIZE`                                    | The maximum number of threads in the current connection thread pool. This value cannot be bigger than max_thread_pool_size.
| `PERCONA_TEST_PMM_CLICKHOUSE_BLOCK_SIZE`                                   | The number of rows to load from tables in one block for this connection.
