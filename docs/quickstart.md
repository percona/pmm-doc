# Quickstart Guide

This guide helps you quickly get started with PMM using Docker.

## Prerequisites

Install [Docker](https://docs.docker.com/engine/install/).

## System requirements

| Disk      |Memory  | Ports         |
|-----------|--------|---------------|
|* 1 GB of storage per monitored database node. <br/>* 1 GB of storage per monitored database node for data retention set to one week.| Each database node should have at least 2 GB of memory for effective monitoring. <br/> The increase in memory usage is not proportional to the number of nodes. </br>  **Example**: Data from 20 nodes should be easily handled with 16 GB.| ***** By default, port 443 should be opened on the PMM Server. <br/> * The database port should be open for the PMM Agent.|

## Install PMM

To install the PMM server, follow the steps below:
{.power-number}

1. Download and run the [PMM easy installation script](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/easy-install.html) from [github](https://github.com/percona/pmm/blob/main/get-pmm.sh) to verify and install any missing software and dependencies. 

    The install script only runs on Linux-compatible systems. To use it, run the command with sudo privileges or as root.
    
2. [Set up Docker on Mac](https://docs.docker.com/docker-for-mac/install) or [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu).

3. Install the PMM Server using `cURL` or `wget`:


    === "cURL"

        ```sh
        curl -fsSL https://www.percona.com/get/pmm | /bin/bash
        ```

    === "wget"

        ```sh
        wget -qO - https://www.percona.com/get/pmm | /bin/bash    
        ```

4. Log in to PMM with the default login credentials that are provided after the installation is completed.

    !!! note alert alert-primary "Note"
        Default credentials are **admin:admin**


For instructions on installing the PMM Server with other methods, see [Setting up PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/index.html).

## Add a database instance

!!! caution alert alert-warning "Important"
    If you have access to the database node, install a PMM agent on it to reduce server-side resource utilization.


=== "MySQL 5.7 or 8.0"

    **Prerequisites**

    Before you add a MySQL database for monitoring you should have a [database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html#create-a-database-account-for-pmm).

    **Add a MySQL database instance**
    {.power-number}

    1. From the PMM UI, go to **Configuration > PMM Inventory > Add Instance** and select **MySQL**.

    3. Enter your database credentials on the resulting page without changing any values.

    4. (Optional) Enter the information on the **Labels** and **Additional Options** section. 

    5. Click **Add Service** at the bottom.

    For detailed information, see [Adding a MySQL database for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html).

=== "MongoDB"

    **Prerequisites**

    Before adding a MongoDB database for monitoring,  [create a database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html#create-pmm-account-and-set-permissions).

    **Add a MongoDB database instance**
    {.power-number}

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

    1. From the PMM UI, go to **Configuration > PMM Inventory > Add Instance** and choose **PostgreSQL**.

    3. Enter your database credentials on the resulting page.

    4. (Optional) Enter the information on the *Labels* or *Additional Options* section. 

    5. Click **Add Service** at the bottom.

    For detailed information, see [Adding a PostgreSQL database](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html).

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

    For detailed information, see [Adding an Amazon RDS instance for monitoring](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html).


## Next steps

[Configure PMM via the interface :material-arrow-right:](how-to/configure.md){.md-button}

[Manage users in PMM :material-arrow-right:](how-to/manage-users.md){.md-button}

[Set up roles and permissions :material-arrow-right:](get-started/roles-and-permissions/index.md){.md-button}

[Back up and restore data in PMM :material-arrow-right:](get-started/backup/index.md){.md-button}


