# Get started with PMM

To get up and running with Percona Monitoring and Management (PMM) in no time, install PMM on Docker using the Easy-install script. This is a simple and efficient way to install PMM.

For alternative setups, explore the additional installation options detailed in the [Setting up chapter](../setting-up/index.md). 

## Prerequisites

Before you start installing PMM on Docker via the Easy-install script, verify that your system meets the compatibility requirements. <details>
  <summary>Verify system compatibility</summary>
  
| Disk      |Memory  | Ports         |
|-----------|--------|---------------|
| * 1 GB of storage per monitored database node. <br/><br/>  * 1 GB of storage per monitored database node for data retention set to one week.| Each database node should have at least 2 GB of memory for effective monitoring. <br/><br/> **Note:** The increase in memory usage is not proportional to the number of nodes. </br> </br>  **Example**: Data from 20 nodes should be easily handled with 16 GB.| * By default, port 443 should be opened on the PMM Server. <br/><br/>  * The database port should be open for the PMM Agent.|

</details>

## Install PMM Server

``` mermaid
graph RL
subgraph s1[Now: Step 1]
    PS(PMM Server)
end
DB[(Database)] -- Data collection --> PC(PMM Client)
PC -- Transmission --> PS
```

Decide where you want to run PMM. You can choose from a wide array of hosts below:

=== "Bare Metal/Virtual (recommended)"

    You can [Deploy PMM on Docker manually], (../setting-up/index.md) via [Podman](../setting-up/server/podman.md), a [Docker image](../setting-up/server/docker.md) or [Virtual Appliance](../setting-up/server/virtual-appliance.md). 
    However, we recommend using the Easy-install script below, as this is a fast and efficient method for getting started with PMM: 
    { .power-number }

    1. Download and run the PMM Easy-install script from [GitHub](https://github.com/percona/pmm/blob/main/get-pmm.sh). 
    The script only runs on Linux-compatible systems. To use it, run the command with `sudo` privileges or as **root**.

    ??? note "What's happening under the hood"
        This script does the following:
        - Installs Docker if it is not installed on your system.
        - Stops and renames any currently running PMM Server Docker container from `pmm-server` to `pmm-server-{timestamp}`. This old pmm-server container is not a recoverable backup.
        - Pulls and runs the latest PMM Server Docker image.


    2. Install PMM Server using `cURL` or `wget`:

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

=== ":simple-kubernetes: Kubernetes"

    Learn how to [install PMM in a Kubernetes cluster using Helm](../setting-up/server/helm.md).

=== ":simple-amazonaws: Amazon"

    Learn how to [run an instance of PMM Server hosted at AWS Marketplace](../setting-up/server/aws.md).

=== ":simple-microsoftazure: Azure"

    Azure links here...

=== ":simple-googlecloud: Google Cloud"

    Google Cloud links here...

### Install PMM Client

Once PMM Server is set up, you can install a PMM Client on the database node to reduce resource utilization on the server side. 

Select the database technology you're using to find the right setup for PMM Client and start collecting data signals back to PMM Server.

``` mermaid
graph RL
PS(PMM Server)
subgraph s2[Now: Step 2]
    DB[(Database)] -- Data collection --> PC(PMM Client)
end
PC -- Transmission --> PS
```

=== ":material-dolphin: MySQL"

    To connect a MySQL database, check the type of host that you have and follow the instructions required to set up PMM Client.

    | <small>*Host*</small> | <small>*Recommended set up*</small> | <small>*Other advanced options*</small> |
    | --------------------- | ----------------------------------- | ------------------------------ |
    | **Self-hosted / AWS EC2** | [**Add database using Percona Repositories** :material-arrow-right:](../setting-up/client/index.md) | [Using a PMM Docker image](../add-DB.md/pmm-image.md)<br><br>[Download and install PMM files](../add-DB.md/) |
    | **AWS RDS / AWS Aurora** | [**Configure AWS settings** :material-arrow-right:](../add-DB.md/configure-aws.md) |
    | **Azure Database for MySQL** | [**Configure Azure settings** :material-arrow-right:](../add-DB.md/configure-azure.md) |
    | **Google Cloud SQL for MySQL** | [**Configure Google Cloud Settings** :material-arrow-right:](../add-DB.md/configure-gc.md) |
    | **Other hosts/No access to the node** | [**Remote monitoring** :material-arrow-right:](../add-DB.md/remote-monitoring.md) |

=== ":material-elephant: PostgreSQL"

    Learn how to [set up PMM to monitor a PostgreSQL or Percona Distribution for PostgreSQL database](../setting-up/client/postgresql.md) instance.

=== ":material-leaf: MongoDB"

    Learn to [set up PMM to monitor a MongoDB or Percona Server for MongoDB database](../setting-up/client/mongodb.md) instance.

=== ":material-database: ProxySQL"

    Learn to [set up PMM to monitor a ProxySQL database](../setting-up/client/proxysql.md.md) instance.

=== ":material-database: HAproxy"

    Learn to [collect metrics from HAProxy on a database node](../setting-up/client/haproxy.md).

=== ":simple-linux: Linux"

    Learn to [collect metrics from Linux on a database node](../setting-up/client/linux.md).

=== "Other technologies"

    Others' links here...

### Connect database

Once the PMM Server and Client are set up, choose the database that you want to monitor with PMM.

=== "MySQL 8.0"

    **Prerequisites**

    Before you add a MySQL database for monitoring you should have a [database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html#create-a-database-account-for-pmm).

    **Add a MySQL database instance**
    {.power-number}

    To add a MySQL database instance for monitoring, do the following:

    1. From the PMM UI, go to **Configuration > PMM Inventory > Add Instance** and select **MySQL**.

    2. Enter your database credentials on the resulting page without changing any values.

    3. (Optional) Enter the information on the **Labels** and **Additional Options** section. 

    4. Click **Add Service** at the bottom.

    For detailed information, see [Adding a MySQL database for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html).

=== "MongoDB"

    **Prerequisites**

    Before adding a MongoDB database for monitoring, [create a database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html#create-pmm-account-and-set-permissions).

    **Add a MongoDB database instance**
    {.power-number}

    To add a MongoDB database instance for monitoring, do the following:


    1. From the PMM UI, go to **Configuration >PMM Inventory > Add Instance** and select **MongoDB**.

    3. Enter your database credentials on the resulting page.

    4. (Optional) Enter the information in the **Labels** and **Additional Options** section. 

    5. Click **Add Service** at the bottom.

    For detailed information on adding a MongoDB database, see [Adding a MySQL database for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html).

=== "PostgreSQL"

    **Prerequisites**
     
    Before adding a PostgreSQL database for monitoring, [create a database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html#create-a-database-account-for-pmm)
    
    **Add a PostgreSQL database instance**
    {.power-number}

    To add a PostgreSQL database instance for monitoring, do the following:

    1. From the PMM UI, go to **Configuration > PMM Inventory > Add Instance** and choose **PostgreSQL**.

    3. Enter your database credentials on the resulting page.

    4. (Optional) Enter the information on the **Labels** or **Additional Options** section. 

    5. Click **Add Service** at the bottom.

    For detailed information, see [Adding a PostgreSQL database](../setting-up/client/postgresql.md).

=== "Amazon RDS"

    You can use PMM for monitoring [Amazon RDS](https://aws.amazon.com/rds/). By using the PMM web interface, you connect to the Amazon RDS DB instance. 

    You only need to provide the [IAM user access key](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html#creating-an-access-key-for-an-iam-user) or assign an [IAM role](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html#creating-an-iam-role) and PMM discovers the Amazon RDS DB instances available for monitoring.

    Before you add Amazon instance for monitoring, do the following:

    - Get your AWS RDS Access Key and RDS Secret Access Key. This key should have permission to monitor RDS.
    - Recommended: Enable **Enhanced Monitoring** option in the settings of your Amazon RDS DB instance.
    - Database username and password with access to login to the RDS instance.
    - Access the RDS instance via a TCP port.

    To add an Amazon RDS database instance for monitoring:
    {.power-number}

    1. From the PMM UI, go to **Configuration > PMM Inventory > Add Instance**.

    2. Select **Amazon RDS – Add a remote instance**.

    3. Enter the **access key ID** and the **secret access key** of your IAM user, or leave these fields empty if an IAM role was created.

    4. Click **Discover** for PMM to retrieve the available Amazon RDS instances.

    5. For the instance that you would like to monitor, select **Start monitoring**.

    6. Enter your database credentials on the resulting page.

    7. (Optional) Enter the information on the **Labels** or **Additional Options** section. 

    8. Click **Add Service** at the bottom.

    For detailed information, see [Adding an Amazon RDS instance for monitoring](../setting-up/).

</details>


## Next steps

[Configure PMM via the interface :material-arrow-right:](../how-to/configure.md){.md-button}

[Manage users in PMM :material-arrow-right:](../how-to/manage-users.md){.md-button}

[Set up roles and permissions :material-arrow-right:](../get-started/roles-and-permissions/index.md){.md-button}

[Back up and restore data in PMM :material-arrow-right:](../get-started/backup/index.md){.md-button}
