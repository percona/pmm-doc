# Get started with PMM

To get up and running with Percona Monitoring and Management (PMM) in no time, install PMM on Bare Metal/Virtual using the Easy-install script for Docker.

This is a simple and efficient way to install PMM.

??? info "Alternative installation options"
     For alternative setups, explore the additional installation options detailed in the **Setting up** chapter:

    - [Deploy on Podman](../setting-up/server/podman.md)
    - [Deploy based on a Docker image](../setting-up/server/docker.md)
    - [Deploy on Virtual Appliance](../setting-up/server/virtual-appliance.md)
    - [Deploy on Kubernetes via Helm](../setting-up/server/helm.md)
    - [Run a PMM instance hosted at AWS Marketplace](../setting-up/server/aws.md)

#### Prerequisites

Before you start installing PMM, verify that your system meets the compatibility requirements.

??? info "Verify system compatibility"
    - **Disk**: Approximately 1 GB of storage per monitored database node with data retention set to one week. By default, retention is 30 days.
    - **Memory**: A minimum of 2 GB per monitored database node. The increase in memory usage is not proportional to the number of nodes. For example, the data from 20 nodes should be easily handled with 16 GB.
    - **Ports**: Your system’s firewall should allow TCP traffic on port 443.

## Install PMM

The Easy-install script only runs on Linux-compatible systems. To use it, run the command with `sudo` privileges or as `root`:
{ .power-number }

1. Download and install PMM using `cURL` or `wget`:

    === "cURL"

        ```sh
        curl -fsSL https://www.percona.com/get/pmm | /bin/bash
        ```

    === "wget"

        ```sh
        wget -qO - https://www.percona.com/get/pmm | /bin/bash    
        ```

2. After the installation is complete, log into PMM with the default `admin:admin` credentials.

??? info "What's happening under the hood?"
     This script does the following:

     * Installs Docker if it is not installed on your system.
     * Stops and renames any currently running PMM Docker container from `pmm-server` to `pmm-server-{timestamp}`. This old `pmm-server container is not a recoverable backup.
     * Pulls and runs the latest PMM Docker image.

### Connect database

Once PMM is set up, choose the database that you want it to monitor:

=== "MySQL"

    To connect a Self-hosted MySQL database:
    { .power-number}

    1. Create database account for PMM using the following command example. This creates a database user with name `pmm``, password `pass``, and the necessary permissions:

        ```sql
        CREATE USER 'pmm'@'127.0.0.1' IDENTIFIED BY 'pass' WITH MAX_USER_CONNECTIONS 10;
        GRANT SELECT, PROCESS, REPLICATION CLIENT, RELOAD, BACKUP_ADMIN ON *.* TO 'pmm'@'127.0.0.1';
        ```

    2. To optimize server-side resources, install PMM Client via Package Manager on the database node:
         
        1. Install Percona Release Tool:

            ```sh
            wget https://repo.percona.com/apt/percona-release_latest.generic_all.deb
            dpkg -i percona-release_latest.generic_all.deb
            ```
        2. Install the PMM Client package:
            
            ```sh
            apt update
            apt install -y pmm2-client
            ```

        3. [Register database node with PMM](../setting-up/client/index.html#register):
                
            ```sh
            pmm-admin config --server-insecure-tls --server-url=https://admin:admin@X.X.X.X:443
            ```

        4. Add the MySQL database using Performance schema:  

            ```sh 
            pmm-admin add mysql --query-source=perfschema --username=pmm --password=pass MYSQL_NODE
            ```
    ??? info "Alternative database connection workflows"
        While the default instructions above focus on connecting a Self-hosted MySQL database, PMM offers the flexibility to connect to various MySQL databases, including [AWS RDS](../setting-up/client/aws.md), [Azure MySQL](../setting-up/client/azure.md) or [Google Cloud MySQL ](../setting-up/client/google.md). 

        The PMM Client installation also comes with options: in addition to the installation via Package Manager described above, you can also install it as a Docker container or as a binary package. Explore [alternative PMM Client installation options](../setting-up/client/index.html#binary-package) for more information.

        Additionally, if direct access to the database node isn't available, opt for the [PMM Client installation via User Interface](../setting-up/client/mysql.html#with-the-user-interface) instead. 

=== "PostgreSQL"

    To connect a PostgreSQL database using the Postgres CLI: 
    { .power-number}

    1. Create a PMM-specific user for monitoring:
        
        ```
        CREATE USER pmm WITH SUPERUSER ENCRYPTED PASSWORD '<password>';
        ```
    2. Register the server for monitoring:
       
        ```
        sudo pmm-admin add postgresql --username='pmm' --password=<password>
        ```

    For detailed information, see [Adding a PostgreSQL database](../setting-up/client/postgresql.md).

=== "MongoDB"

    To connect a MongoDB database from the MongoDB CLI:
    { .power-number}
    
    1. Create a PMM-specific user for monitoring from the MongoDB Console. 
    
        Use `mongo` and `admin`:
        
        ```
            db.createRole({
        "role":"explainRole",
        "privileges":[
            {
                "resource":{
                    "db":"",
                    "collection":""
                },
                "actions":[
                    "collStats",
                    "dbHash",
                    "dbStats",
                    "find",
                    "listIndexes",
                    "listCollections"
                ]
            }
        ],
        "roles":[]
        })
        ```

        ```
            db.getSiblingDB("admin").createUser({
        "user":"pmm",
        "pwd":"<password>",
        "roles":[
            {
                "role":"explainRole",
                "db":"admin"
            },
            {
                "role":"clusterMonitor",
                "db":"admin"
            },
            {
                "role":"read",
                "db":"local"
            }
        ]
        })
        exit
        ```

    2. Register the server for monitoring:

        ```
        sudo pmm-admin add mongodb --username=pmm --password=<password>
        ```

    For detailed information on adding a MongoDB database, see [Adding a MySQL database for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html).

=== "ProxySQL"
    To connect a ProxySQL database, see [Enable ProxySQL performance metrics monitoring](../setting-up/client/proxysql.md).

=== "HAProxy"
    To add HAProxy services, see [HAProxy](../setting-up/client/haproxy.md).

### Check your database

After installing PMM And connecting the database, go to the database's [Instance Summary dashboard](../details/dashboards/dashboard-mysql-instance-summary.md). This shows essential information about your database performance and an overview of your environment. For more information, see [PMM Dashboards](../details//dashboards/index.md).

## Next steps

- [Configure PMM via the interface](../how-to/configure.md)
- [Manage users in PMM](../how-to/manage-users.md)
- [Set up roles and permissions](../get-started/roles-and-permissions/index.md)
- [Back up and restore data in PMM](../get-started/backup/index.md)