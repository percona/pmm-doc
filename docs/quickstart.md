# Quickstart Guide


This guide covers how you can quickly get started using PMM. This is applicable to Docker compatible *nix based systems.


## Prerequisites

[Docker](https://docs.docker.com/engine/install/) 1.12.6 or higher.


## Install PMM

!!! caution alert alert-warning "Important"
    You can use the [easy installation](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/easy-install.html) script that will verify and install any missing software and dependencies. To use it, run the command with sudo privileges or as root.
    You can download the script from [github](https://github.com/percona/pmm/blob/main/get-pmm.sh).

To install the PMM server, do the following:

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

3. Log in to PMM with the default login credentials provided after the installation is completed.

For detailed instructions on installing the PMM server, see [Setting up PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/index.html).

## Add database for monitoring

=== "MySQL 5.7 or 8.0"

    Before you add a MySQL database for monitoring you should have a [database account for PMM](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html#create-a-database-account-for-pmm).

    To add MySQL database for monitoring, do the following:

    1. In the PMM web interface, go to  **Configuration** →  **PMM Inventory** →  **Add Instance**.

    2. Select **MySQL**. The **Add Service** page opens.

    3. On the resulting page, you do not have to change any values. Enter the credentials for your database instance.

    4. Optional: Enter the information on the **Labels** or **Additional Options** section. 

    5. Click **Add Service** at the bottom.


    For detailed information, see [Adding a MySQL database](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html).

=== "MongoDB"

    Before you add a MongoDB database for monitoring you should have a database account for PMM. To create an account using MongoDB CLI, see [Create PMM account and set permissions](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html#create-pmm-account-and-set-permissions).

    To add a MongoDB database for monitoring, do the following:

    1. In the PMM web interface, go to  **Configuration** →  **PMM Inventory** →  **Add Instance**.

    2. Select *MongoDB*. The *Add Service* page opens.

    3. On the resulting page you do not have to change any values, just enter the credentials for your database instance.

    4. Optional: Enter the information on the *Labels* or *Additional Options* section. 

    5. Click *Add Service* at the bottom.

    For detailed information on adding a MongoDB database, see [Adding a MySQL database](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html).

=== "PostgreSQL"

    Before you add a PostgreSQL database for monitoring you should have a [database account for PMM]((https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html#create-a-database-account-for-pmm).
    
    To add PostgreSQL database for monitoring, do the following:

    1. In the PMM web interface, go to  *Configuration* →  *PMM Inventory* →  *Add Instance*.

    2. Select **PostgreSQL**. The **Add Service** page opens.

    3. On the resulting page you do not have to change any values, just enter the credentials for your database instance.

    4. Optional: Enter the information on the *Labels* or *Additional Options* section. 

    5. Click **Add Service** at the bottom.

    For detailed information, see [Adding a PostgreSQL database](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html).

=== "Amazon RDS"

    You can use PMM for monitoring [Amazon RDS](https://aws.amazon.com/rds/). By using the PMM web interface, you connect to the Amazon RDS DB instance. 

    You only need to provide the [IAM user access key](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html#creating-an-access-key-for-an-iam-user) or assign an [IAM role](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html#creating-an-iam-role) and PMM discovers the Amazon RDS DB instances available for monitoring.

    Before you add Amazon instance for moniitoring you should have the following:

    - AWS RDS Access Key and RDS Secret Access Key. This key should have permission to monitor RDS.
    - Recommended: Enable *Enhanced Monitoring* option in the settings of your Amazon RDS DB instance.
    - Database username and password with access to login to the RDS instance.
    - Access to the RDS instance via a TCP port.

    To add an Amazon RDS database instance to PMM, do the following:

    1. In the PMM web interface, go to  **Configuration** →  **PMM Inventory** →  **Add Instance**.

    2. Select **Amazon RDS – Add a remote instance**.

    3. Enter the *access key ID* and the *secret access key* of your IAM user or leave these fields empty if an IAM role was created.

    4. Click **Discover** for PMM to retrieve the available Amazon RDS instances.

    5. For the instance that you would like to monitor, select **Start monitoring**.

    6. On the resulting page you do not have to change any values, just enter the credentials for your database instance.

    7. Optional: Enter the information on the **Labels** or **Additional Options** section. 

    8. Click **Add Service** at the bottom.

    For detailed information, see [Adding an Amazon RDS instance](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html).


## Next steps

Explore the following topics to gain a deeper understanding of PMM:

- [Configure](how-to/configure.md) - Learn how to configure PMM via the interface.
- [Manage users](how-to/manage-users.md) - Learn how to manage users in PMM.
- [Roles and permissions](get-started/roles-and-permissions/index.md) - Learn more about roles and permissions in PMM.
- [Backup and restore](get-started/backup/index.md) — Learn how to backup and to restore data in PMM.




