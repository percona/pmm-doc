# Get started with PMM

To get up and running with Percona Monitoring and Management (PMM) in no time, install PMM on Bare Metal/Virtual using the Easy-install script for Docker. This is a simple and efficient way to install PMM.

For alternative setups, explore the additional installation options detailed in the [Setting up chapter](../setting-up/index.md).

## Prerequisites

Before you start installing PMM Bare Metal/Virtual via the Easy-install script for Docker, verify that your system meets the compatibility requirements. 

<details>
  <summary>Verify system compatibility</summary>
  
| Disk      |Memory  | Ports         |
|-----------|--------|---------------|
| * 1 GB of storage per monitored database node. <br/><br/>  * 1 GB of storage per monitored database node for data retention set to one week.| Each database node should have at least 2 GB of memory for effective monitoring. <br/><br/> **Note:** The increase in memory usage is not proportional to the number of nodes. </br> </br>  **Example**: Data from 20 nodes should be easily handled with 16 GB.| * By default, port 443 should be opened on the PMM Server. <br/><br/>  * The database port should be open for the PMM Agent.|

</details>

## Install PMM

We recommend deploying PMM on Bare Metal/Virtual using the Docker Easy-install script below, as this is a fast and efficient method for getting started with PMM.

However, PMM can run on a wide array of alternative hosts:

- [Deploy on Podman](../setting-up/server/podman.md)
- [Deploy based on a Docker image](../setting-up/server/docker.md) 
- [Deploy on Virtual Appliance](../setting-up/server/virtual-appliance.md).
- [Deploy on Kubernetes via Helm](../setting-up/server/helm.md)
- [Run a PMM instancehosted at AWS Marketplace](../setting-up/server/aws.md)

To install on Bare Metal/Virtual using the recommended Easy-install script procedure for Docker:
{ .power-number }

1. Download and run the PMM Easy-install script from [GitHub](https://github.com/percona/pmm/blob/main/get-pmm.sh).

The script only runs on Linux-compatible systems. To use it, run the command with `sudo` privileges or as **root**.

<details>
  <summary>"What's happening under the hood"</summary>
        This script does the following:

        - Installs Docker if it is not installed on your system.
        - Stops and renames any currently running PMM Docker container from `pmm-server` to `pmm-server-{timestamp}`. This old pmm-server container is not a recoverable backup.
        - Pulls and runs the latest PMM Docker image.

</details>

2. Install PMM using `cURL` or `wget`:

    === "cURL"

        ```sh
        curl -fsSL https://www.percona.com/get/pmm | /bin/bash
        ```

    === "wget"

        ```sh
        wget -qO - https://www.percona.com/get/pmm | /bin/bash    
        ```
        
    To run PMM in the **Interactive** mode and  change the default settings, use the following command:

        ```sh
        curl -fsSLO https://www.percona.com/get/pmm (or wget https://www.percona.com/get/pmm)
        chmod +x pmm
        ./pmm --interactive
        ```

3. Log into PMM with the default credentials provided after the installation is completed.

### Connect database

Once PMM is set up, choose the database that you want it to monitor:

=== "MySQL 8.0"

    Follow the instructions below to connect a Self-hosted MySQL database. Alternatively, you can connect a [AWS RDS](../setting-up/client/aws.md), [Azure MySQL](../setting-up/client/azure.md) or a [Google Cloud MySQL ](../setting-up/client/google.md) database.
    { .power-number }

    1. Create database account for PMM using the following command example. This creates a database user with name **pmm**, password **pass**, and the necessary permissions:

    ```sql
    CREATE USER 'pmm'@'127.0.0.1' IDENTIFIED BY 'pass' WITH MAX_USER_CONNECTIONS 10;
    GRANT SELECT, PROCESS, REPLICATION CLIENT, RELOAD, BACKUP_ADMIN ON *.* TO 'pmm'@'127.0.0.1';
    ```

    2. Install PMM Client on the database node to reduce resource utilization on the server side. 
    Follow the procedure below to install PMM Client using Package Manager (Default). 
        
    Alternatively, you can install PMM Client as a Docker container or as a binary package. See [alternative PMM Client installation options](../setting-up/client/index.html#binary-package).

    If you don't have access to the database node, [install PMM Client from the User interface](../setting-up/client/mysql.html#with-the-user-interface) instead. 

    To install PMM Client using Package Manager:
    { .power-number } 

    2.1. Install Percona Release Tool:

    ```sh
    wget https://repo.percona.com/apt/percona-release_latest.generic_all.deb
    dpkg -i percona-release_latest.generic_all.deb
    ```
    2.2. Install the PMM Client package:
    !!! hint "Root permissions"
    
    ```sh
    apt update
    apt install -y pmm2-client
    ```

    2.3. [Register Node with PMM](../setting-up/client/index.html#register):
          
    ```sh
    pmm-admin config --server-insecure-tls --server-url=https://admin:admin@X.X.X.X:443
    ```

    2.4 Add the MySQL database using Performance schema:  

    ```sh 
    pmm-admin add mysql --query-source=perfschema --username=pmm --password=pass MYSQL_NODE
    ```

    2.5. Optionally, [add the database using Slow log](../setting-up/client/mysql.md#data-source-recommendations).

=== "PostgreSQL"

    **Prerequisites**
     
    Before adding a PostgreSQL database for monitoring, [create a database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html#create-a-database-account-for-pmm)
    
    **Add a PostgreSQL database instance**
    {.power-number}

    To add a PostgreSQL database instance for monitoring, do the following:

    1. From the PMM UI, go to **Configuration > PMM Inventory > Add Instance** and choose **PostgreSQL**.

    2. Enter your database credentials on the resulting page.

    3. (Optional) Enter the information on the **Labels** or **Additional Options** section. 

    4. Click **Add Service** at the bottom.

    For detailed information, see [Adding a PostgreSQL database](../setting-up/client/postgresql.md).

=== "MongoDB"

    **Prerequisites**

    Before adding a MongoDB database for monitoring, [create a database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html#create-pmm-account-and-set-permissions).

    **Add a MongoDB database instance**
    {.power-number}

    To add a MongoDB database instance for monitoring, do the following:


    1. From the PMM UI, go to **Configuration >PMM Inventory > Add Instance** and select **MongoDB**.

    2. Enter your database credentials on the resulting page.

    3. (Optional) Enter the information in the **Labels** and **Additional Options** section. 

    4. Click **Add Service** at the bottom.

    For detailed information on adding a MongoDB database, see [Adding a MySQL database for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html).

=== "ProxySQL"
    When connecting a ProxySQL database, you can:
    - [Enable ProxySQL performance metrics monitoring](../setting-up/client/proxysql.md).
    - [Add HAproxy services](../setting-up/client/haproxy.md).

## Next steps

- [Configure PMM via the interface :material-arrow-right:](../how-to/configure.md)
- [Manage users in PMM :material-arrow-right:](../how-to/manage-users.md)
- [Set up roles and permissions :material-arrow-right:](../get-started/roles-and-permissions/index.md)
- [Back up and restore data in PMM :material-arrow-right:](../get-started/backup/index.md)