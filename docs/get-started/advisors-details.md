Percona Monitoring and Management (PMM) offers four categories of database Advisors to help you improve database performance: Configuration, Performance, Query and Security Advisors.

Each Advisor includes a set of automated checks, which investigate a specific range of possible issues and areas of improvement: security threats, non-compliance issues, performance degradation, query and index optimization strategies etc.

All Advisors and their checks are hosted on Percona Platform. 
PMM Server automatically downloads them from here when the **Advisors** and **Telemetry** options are enabled in PMM under **Configuration > Settings > Advanced Settings**. Both options are enabled by default.

## Highest security for your databases
Percona Platform communicates with PMM via secure channels, using the highest standards for privacy and security. 

Before downloading and running Advisor checks on your database, PMM verifies the content and integrity of all Advisor checks to confirm that every component originated from Percona Platform and that no one has altered them since the checks were digitally signed.

## Advisor plans

### Default Advisors
PMM instances can use the default Advisor checks, even without a Percona Account. 

If your PMM instance has access to Internet, and you have enabled **Telemetry** and the **Advisors** option in the PMM Settings, your instance will have automatic access to the following checks included in the Configuration and the Security Advisors: **Configuration Versions** and **CVE Security**. 

### How to get more Advisors
As soon as you [connect your PMM instance to Percona Platform](../docs/connect-pmm.md), PMM has access to extra Advisors, available for the Basic subscription plan.

If you are a Percona customer with a Percona Account, you get additional access to Standard/Premium checks, which offer even more advanced database health information.

Depending on the entitlements available for your Percona Account, the set of Advisor checks that PMM can download from Percona Platform differ in terms of complexity and functionality. 

## List of Advisors

The **Advisors** page in Percona Platform lists the database checks that you can run from PMM. 
On this page you can read about the different database insights that each check provides, and upgrade to a paid plan if the checks you need are not available for your Percona Account yet.  

You can also check out the complete list of checks and their availability for **Basic**, **Standard**, and **Premium** plans on the [Subscriptions page](https://www.percona.com/software/percona-platform/subscription) and in the tables below:


### Configuration Advisors

| Check Name | Description | Subscription | Database Technology|
| :--------- | :---------- | :--- |:--- |
| **Version Configuration** | Notifies of newly released database versions to streamline database maintenance and ensure the most up-to-date performance. |Basic, Standard/Premium | MySQL, MongoDB, PostgreSQL|
| **Generic Configuration** | Provides basic recommendations for improving your database configuration.   | Basic, Standard/Premium |MySQL, MongoDB, PostgreSQL| 
| **Resources Configuration** | Watches your database and gives you recommendations for efficient management of resources like binaries architecture, CPU number versus DB Configuration, etc. | Basic, Standard/Premium | MongoDB, PostgreSQL|
| **Connection Configuration** |Provides recommendations on configuring database connection parameters for improving database performance.  | Standard/Premium |PostgreSQL|
| **Replication Configuration** | Provides recommendations for scalable replication in database clusters. | Standard/Premium | MySQL, MongoDB|
| **InnoDB Configuration** | Advises on configuring InnoDB optimization for high performance. | Standard/Premium | MySQL, MongoDB, PostgreSQL|
| **Vacuum Configuration** | Provides recommendations on optimizing Vacuum operations. | Standard/Premium | MySQL, MongoDB, PostgreSQL|

### Performance Advisors

| Check Name | Description | Subscription | Database Technology|
| :--------- | :---------- | :--- |:--- |
| **Generic Performance** | Provides basic database configuration recommendations for high-performance query execution. | Basic, Standard/Premium | PostgreSQL|
| **Vacuum Performance** | Helps improve the efficiency and execution speed of database Vacuum commands. |  Standard/Premium | MySQL, MongoDB, PostgreSQL|
| **Replication Performance** |Checks efficient replication usage of your database. | Standard/Premium |PostgreSQL|


### Security Advisors
| Check Name | Description | Subscription | Database Technology|
| :--------- | :---------- | :--- |:--- |
| **CVE Security** | Informs you of any database versions affected by CVE. |Basic, Standard/Premium | MongoDB |
| **Configuration Security** | Checks your database configuration to ensure that security best practices are correctly implemented.  | Basic, Standard/Premium |MySQL, MongoDB|
| **Authentication Security** | Ensures that all database authentication parameters are configured securely. | Standard/Premium |MySQL, MongoDB, PostgreSQL|
| **Replication Security** | Helps safeguard data replication by assessing security risks and providing recommendations for improving protection. | Standard/Premium |MySQL|
| **Connection Security** | Helps identify security issues on network connections and provides recommendations for enhancing security. | Standard/Premium |MySQL, MongoDB|

### Query Advisors
| Check Name | Description | Subscription | Database Technology|
| :--------- | :---------- | :--- |:--- |
| **Index Query** | Provides query and index optimization strategies for peak database performance. | Standard/Premium | MySQL |
| **Schema Design Query** | Helps create efficient database schemas by analyzing queries and offering suggestions for optimization. | Basic, Standard/Premium |MySQL|
