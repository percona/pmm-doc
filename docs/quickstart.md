# Quickstart Guide


This guide covers how you can quickly get started using PMM. This is applicable to Docker compatible *nix based systems.


## Prerequisites

Install [Docker](https://docs.docker.com/engine/install/) 1.12.6 or higher.


## Install PMM

!!! caution alert alert-warning "Important"
    You can use the [easy installation](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/easy-install.html) script that will verify and install any missing software and dependencies. To use it, run the command with sudo privileges or as root.
    You can download the script from [github](https://github.com/percona/pmm/blob/main/get-pmm.sh).

To install PMM server, do the following

1. Set up Docker on [Mac](https://docs.docker.com/docker-for-mac/install) or [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu).

2. Install PMM server using `cURL` or `wget` as follows:


    === "cURL"

        ```sh
        curl -fsSL https://www.percona.com/get/pmm | /bin/bash
        ```

    === "wget"

        ```sh
        wget -qO - https://www.percona.com/get/pmm | /bin/bash    
        ```

    After the installation is completed, you will receive instructions on how to access the interface, along with default login credentials.

    For detailed instructions on installing PMM server, see [here](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/index.html).

## Add database for monitoring

=== "MySQL 5.7 or 8.0"

    Before you add MySQL datbase for moniitoring you should have a database account for PMM. To create an account using MySQL CLI, see [here](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html#create-a-database-account-for-pmm).

    To add MySQL database for monitoring, do the following:

    1. In the PMM web interface, go to  *Configuration* →  *PMM Inventory* →  *Add Instance*.

    2. Select *MySQL*. The *Add Service* page opens.

    3. On the resulting page you do not have to change any values, just enter the credentials for your database instance.

    4. Optional: Enter the information on the *Labels* or *Additional Options* section. 

    5. Click *Add Service* at the bottom.


    For more information on adding MySQL database, see [here](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mysql.html#applicable-versions).

=== "MongoDB"

    Before you add MongoDB datbase for moniitoring you should have a database account for PMM. To create an account using MongoDB CLI, see [here](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html#create-pmm-account-and-set-permissions).

    To add MongoDB database for monitoring, do the following:

    1. In the PMM web interface, go to  *Configuration* →  *PMM Inventory* →  *Add Instance*.

    2. Select *MongoDB*. The *Add Service* page opens.

    3. On the resulting page you do not have to change any values, just enter the credentials for your database instance.

    4. Optional: Enter the information on the *Labels* or *Additional Options* section. 

    5. Click *Add Service* at the bottom.

    For more information on adding MongoDB database, see [here](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/mongodb.html).

=== "PostgreSQL"

    Before you add PostgreSQL database for moniitoring you should have a database account for PMM. To create an account using PostgreSQL CLI, see [here](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html#create-a-database-account-for-pmm).

    To add PostgreSWL database for monitoring, do the following:

    1. In the PMM web interface, go to  *Configuration* →  *PMM Inventory* →  *Add Instance*.

    2. Select *PostgreSQL*. The *Add Service* page opens.

    3. On the resulting page you do not have to change any values, just enter the credentials for your database instance.

    4. Optional: Enter the information on the *Labels* or *Additional Options* section. 

    5. Click *Add Service* at the bottom.

    For more information on adding PostgreSQL database, see [here](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/postgresql.html).

=== "Amazon RDS"

    You can use PMM for monitoring [Amazon RDS](https://aws.amazon.com/rds/). By using the PMM web interface, you connect to the Amazon RDS DB instance. 

    You only need to provide the [IAM user access key](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html#creating-an-access-key-for-an-iam-user) or assign an [IAM role](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html#creating-an-iam-role) and PMM discovers the Amazon RDS DB instances available for monitoring.

    Before you add Amazon instance for moniitoring you should have the following:

    - AWS RDS Access Key and RDS Secret Access Key. This key should have permission to monitor RDS.
    - Recommended: Enable *Enhanced Monitoring* option in the settings of your Amazon RDS DB instance.
    - Database username and password with access to login to the RDS instance.
    - Access to the RDS instance via a TCP port.

    To add an Amazon RDS database instance to PMM, do the following:

    1. In the PMM web interface, go to  *Configuration* →  *PMM Inventory* →  *Add Instance*.

    2. Select *Amazon RDS – Add a remote instance*.

    3. Enter the *access key ID* and the *secret access key* of your IAM user or leave these fields empty if an IAM role was created.

    4. Click *Discover* for PMM to retrieve the available Amazon RDS instances.

    5. For the instance that you would like to monitor, select *Start monitoring*.

    6. On the resulting page you do not have to change any values, just enter the credentials for your database instance.

    7. Optional: Enter the information on the *Labels* or *Additional Options* section. 

    8. Click *Add Service* at the bottom.

    For more information on adding Amazon RDS, see [here](https://docs.percona.com/percona-monitoring-and-management/setting-up/client/aws.html).




