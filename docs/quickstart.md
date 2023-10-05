# Quickstart Guide


This guide helps you quickly get started with PMM using Docker installation.


## Prerequisites

[Docker](https://docs.docker.com/engine/install/)

## System requirements

**Disk**

- Approximately 1 GB of storage per monitored database node 
- Approximately 1 GB of storage per monitored database node for data retention set to one week 

**Memory**

Each database node should have at least 2 GB of memory for effective monitoring. The increase in memory usage is not proportional to the number of nodes. For example, data from 20 nodes should be easily handled with 16 GB.

**Ports**

- By default, port 443 should be opened on the PMM Server.
- The database port should be open for the PMM Server.

## Install PMM

!!! caution alert alert-warning "Important"
    - You can use the [easy installation](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/easy-install.html) script that will verify and install any missing software and dependencies. To use it, run the command with sudo privileges or as root.
    - You can download the script from [github](https://github.com/percona/pmm/blob/main/get-pmm.sh).

To install the PMM server, follow the steps below:

1. Set up Docker on [Mac](https://docs.docker.com/docker-for-mac/install) or [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu).

2. Install the PMM server using `cURL` or `wget` as follows:


    === "cURL"

        ```sh
        curl -fsSL https://www.percona.com/get/pmm | /bin/bash
        ```

    === "wget"

        ```sh
        wget -qO - https://www.percona.com/get/pmm | /bin/bash    
        ```

3. Log in to PMM with the default login credentials that are provided after the installation is completed.

    !!! note alert alert-primary "Note"
        Default credentials are admin:admin


For detailed instructions on installing the PMM server with the other methods, see [Setting up PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/index.html).

## Add a database instance

!!! caution alert alert-warning "Important"
    Text


=== "MySQL 5.7 or 8.0"

        Before you add a MySQL database for monitoring you should have a [database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html#create-a-database-account-for-pmm).

    To add a MySQL database instance for monitoring:

    1. From the PMM UI, go to **Configuration** → **PMM Inventory** → **Add Instance**.

    2. Select **MySQL**. The **Add Service** page opens.

    3. Enter your database credentials on the resulting page without changing any values.

    4. (Optional) Enter the information on the **Labels** and **Additional Options** section. 

    5. Click **Add Service** at the bottom.

    For detailed information, see [Adding a MySQL database for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html).

=== "MongoDB"

    Before you add a MongoDB database for monitoring, you should have a [database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html#create-pmm-account-and-set-permissions).

    To add a MongoDB database instance for monitoring:

    1. From the PMM UI, go to **Configuration** → **PMM Inventory** → **Add Instance**.

    2. Select **MongoDB**. The *Add Service* page opens.

    3. Enter your database credentials on the resulting page.

    4. (Optional) Enter the information in the **Labels** and **Additional Options** section. 

    5. Click **Add Service** at the bottom.

    For detailed information on adding a MongoDB database, see [Adding a MySQL database for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html).

=== "PostgreSQL"

    Before you add a PostgreSQL database for monitoring, you should have a [database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html#create-a-database-account-for-pmm).
    
    To add a PostgreSQL database instance for monitoring:

    1. From the PMM UI, go to *Configuration* → *PMM Inventory* → *Add Instance*.

    2. Select **PostgreSQL**. The **Add Service** page opens.

    3. Enter your database credentials on the resulting page.

    4. (Optional) Enter the information on the *Labels* or *Additional Options* section. 

    5. Click **Add Service** at the bottom.

    For detailed information, see [Adding a PostgreSQL database](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html).

=== "Amazon RDS"

    You can use PMM for monitoring [Amazon RDS](https://aws.amazon.com/rds/). By using the PMM web interface, you connect to the Amazon RDS DB instance. 

    You only need to provide the [IAM user access key](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html#creating-an-access-key-for-an-iam-user) or assign an [IAM role](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html#creating-an-iam-role) and PMM discovers the Amazon RDS DB instances available for monitoring.

    Before you add Amazon instance for monitoring you should have the following:

    - AWS RDS Access Key and RDS Secret Access Key. This key should have permission to monitor RDS.
    - Recommended: Enable **Enhanced Monitoring** option in the settings of your Amazon RDS DB instance.
    - Database username and password with access to login to the RDS instance.
    - Access to the RDS instance via a TCP port.

    To add an Amazon RDS database instance for monitoring:

    1. From the PMM UI, go to **Configuration > PMM Inventory > Add Instance**.

    2. Select **Amazon RDS – Add a remote instance**.

    3. Enter the **access key ID** and the **secret access key** of your IAM user, or leave these fields empty if an IAM role was created.

    4. Click **Discover** for PMM to retrieve the available Amazon RDS instances.

    5. For the instance that you would like to monitor, select **Start monitoring**.

    6. Enter your database credentials on the resulting page.

    7. (Optional) Enter the information on the **Labels** or **Additional Options** section. 

    8. Click **Add Service** at the bottom.

    For detailed information, see [Adding an Amazon RDS instance for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html).


## Next steps

Explore the following topics to gain a deeper understanding of PMM:

- [Configure](how-to/configure.md) - Learn how to configure PMM via the interface.
- [Manage users](how-to/manage-users.md) - Learn how to manage users in PMM.
- [Roles and permissions](get-started/roles-and-permissions/index.md) - Learn more about roles and permissions in PMM.
- [Backup and restore](get-started/backup/index.md) — Learn how to backup and to restore data in PMM.




