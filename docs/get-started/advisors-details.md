
## List of database Advisors
 
Percona Monitoring and Management (PMM) offers four categories of database Advisors to help you improve database performance: Configuration, Performance, Query and Security Advisors.

Each Advisor includes a set of automated checks, which investigate a specific range of possible issues and areas of improvement: security threats, non-compliance issues, performance degradation, query and index optimization strategies etc.

This page presents the complete list of database Advisors along with the corresponding subscription tier for which they are available.

You can also access this list through the [**Advisor checks for PMM**](https://portal.percona.com/advisors) section in the Percona Portal documentation, as the Advisors are hosted on the Percona Platform. PMM Server automatically downloads them from this source when the Advisors and Telemetry options are enabled in PMM under **Configuration > Settings > Advanced Settings**. Both options are enabled by default.

### Configuration Advisors

| Advisor Name | Description | Subscription | Database Technology|
| :--------- | :---------- | :--- |:--- |
| **Version Configuration** | Notifies of newly released database versions to streamline database maintenance and ensure the most up-to-date performance. |All Users | MySQL, MongoDB, PostgreSQL|
| **Generic Configuration** | Provides basic recommendations for improving your database configuration.   | All Users |MySQL, MongoDB, PostgreSQL| 
| **Resources Configuration** | Watches your database and gives you recommendations for efficient management of resources like binaries architecture, CPU number versus DB Configuration, etc. | All Users | MySQL, MongoDB|
| **Connection Configuration** |Provides recommendations on configuring database connection parameters for improving database performance.  | Customers only |MySQL, MongoDB, PostgreSQL|
| **Replication Configuration** | Provides recommendations for scalable replication in database clusters. | Customers only | MySQL, MongoDB|
| **InnoDB Configuration** | Advises on configuring InnoDB optimization for high performance. | Customers only | MySQL|
| **Vacuum Configuration** | Provides recommendations on optimizing Vacuum operations. | Customers only | PostgreSQL|

### Performance Advisors

| Advisor Name | Description | Subscription | Database Technology|
| :--------- | :---------- | :--- |:--- |
| **Generic Performance** | Provides basic database configuration recommendations for high-performance query execution. | All Users | MongoDB, PostgreSQL|
| **Vacuum Performance** | Helps improve the efficiency and execution speed of database Vacuum commands. |  Customers only | PostgreSQL|
| **Replication Performance** |Checks efficient replication usage of your database. | Customers only | MongoDB, PostgreSQL|


### Security Advisors
| Advisor Name | Description | Subscription | Database Technology|
| :--------- | :---------- | :--- |:--- |
| **CVE Security** | Informs you of any database versions affected by CVE. |All Users | MongoDB, PostgreSQL |
| **Configuration Security** | Checks your database configuration to ensure that security best practices are correctly implemented.  | All Users |MySQL, MongoDB, PostgreSQL|
| **Authentication Security** | Ensures that all database authentication parameters are configured securely. | Customers only |MySQL, MongoDB, PostgreSQL|
| **Replication Security** | Helps safeguard data replication by assessing security risks and providing recommendations for improving protection. | Customers only |MySQL|
| **Connection Security** | Helps identify security issues on network connections and provides recommendations for enhancing security. | Customers only |MySQL, MongoDB|

### Query Advisors
| Advisor Name | Description | Subscription | Database Technology|
| :--------- | :---------- | :--- |:--- |
| **Index Query** | Provides query and index optimization strategies for peak database performance. | Customers only | MySQL, MongoDB, PostgreSQL |
| **Schema Design Query** | Helps create efficient database schemas by analyzing queries and offering suggestions for optimization. | All Users |MySQL|

## List of checks
Every Advisor consists of one or more Advisor checks. 
We have listed the checks and their details here.

### MongoDB
| Advisor| Check Name | Description | Summary |
| :--------- | :---------- | :--- |:--- |
|Connection Configuration| mongodb\_connection\_sudden_spike | Warns about any significant increase in the number of connections exceeding 50% of the recent or typical connection count. | MongoDB Sudden Increase in Connection Count |
|Connection Configuration| mongodb_connections | Returns the current number of connections as an informational notice when connection counts exceed 5000. | MongoDB High Connections |
| Generic Configuration | mongo\_cache\_size | Warns when Mongo wiredtiger cache size is greater than the default 50%. | Mongo Storage Cache |
| Generic Configuration | mongodb\_active\_vs\_available\_connections | Warns if the ratio between active and available connections is higher than 75%. | MongoDB Active vs Available Connections |
| Generic Configuration | mongodb_journal | Warns if journal is disabled. | MongoDB Journal |
| Generic Configuration | mongodb_loglevel | Warns if MongoDB is not using the default Log level. | MongoDB Non-Default Log Level |
| Generic Configuration | mongodb\_read\_tickets | Warns if MongoDB is using more than 128 read tickets. | MongoDB Read Tickets |
| Generic Configuration | mongodb\_write\_tickets | Warns if MongoDB is using more than 128 write tickets. | MongoDB Write Tickets |
| Generic Configuration | mongodb\_write\_tickets_runtime | Warns if MongoDB is using more than 128 write tickets during runtime. | MongoDB - Configuration Write Ticket Check |
| Replication Configuration| mongodb\_psa\_architecture_check | Raises an error if the replicaSet is utilizing a PSA (Primary-Secondary-Arbiter) architecture.| MongoDB PSA Architecture |
| Replication Configuration| mongodb\_replicaset\_topology | Warns if the Replica Set has less than thee data-bearing nodes.| MongoDB Replica Set Topology |
| Resources Configuration| mongodb\_collection\_fragmented | Warns if the storage size exceeds the data size of a collection, indicating potential fragmentation. This suggests the need for compaction or an initial sync to reclaim disk space.| MongoDB Collections Fragmented |
| Resources Configuration| mongodb_cpucores | Warns if the number of CPU cores does not meet the minimum recommended requirements according to best practices. | MongoDB CPU Cores |
| Resources Configuration| mongodb\_dbpath\_mount | Warns if dbpath does not have a dedicated mount point. | MongoDB - Separate Mount Point Other Than "/" Partition for dbpath. |
| Resources Configuration| mongodb\_fcv\_check | Warns if there is a mismatch between the MongoDB version and the internal FCV (Feature Compatibility Version) parameter setting. | MongoDB - FCV Mismatch |
| Resources Configuration| mongodb_maxsessions | Warns if MongoDB is configured with a maxSessions value other than the default value of 1000000.| MongoDB maxSessions |
| Resources Configuration| mongodb\_swap\_allocation | Warns if there is no swap memory allocated to your instance. | MongoDB - Allocate Swap Memory |
| Resources Configuration| mongodb_taskexecutor | Warns if the count of MongoDB TaskExecutorPoolSize exceeds the number of available CPU cores. | MongoDB TaskExecutorPoolSize High |
| Resources Configuration| mongodb\_xfs\_ftype | Warns if dbpath is not using the XFS filesystem type.| MongoDB - XFS |
| Version Configuration| mongodb_EOL | Raises an error or a warning if your current PSMDB or MongoDB version has reached or is nearing its End-of-Life (EOL) status. | MongoDB Version EOL |
| Version Configuration| mongodb\_unsupported\_version | Raises an error if your current PSMDB or MongoDB version is not supported. | MongoDB Unspported Version |
| Version Configuration| mongodb_version | Provides information on current MongoDB or Percona Server for MongoDB versions used in your environment. It also offers details on other available minor or major versions that you may consider for upgrades. | MongoDB Version Check |
| Generic Performance| mongodb\_multiple\_services | Warns if multiple mongod services are are detected running on a single node. | MongoDB - Multiple mongod Services |
| Replication Performance| mongodb\_chunk\_imbalance | Warns if the distribution of chunks across shards is imbalanced.| MongoDB Sharding - Chunk Imbalance Across Shards |
| Replication Performance| mongodb\_oplog\_size_recommendation |Warns if the oplog window is below a 24-hour period and provides a recommended oplog size based on your instance. | MongoDB - Oplog Recovery Window is Low |
| Replication Performance| mongodb\_replication\_lag | Warns if the replica set member lags behind the primary by more than 10 seconds. | MongoDB Replication Lag |
| Index Query| mongodb\_shard\_collection\_inconsistent\_indexes | Warns if there are inconsistent indexes across shards for sharded collections. Missing or inconsistent indexes across shards can have a negative impact on performance. | MongoDB Sharding - Inconsistent Indexes Across Shards |
| Index Query| mongodb\_unused\_index | Warns if there are unused indexes on any database collection in your instance. This requires enabling the "indexStats" collector. | MongoDB - Unused Indexes |
| Authentication Security| mongodb_auth | Warns if MongoDB authentication is disabled. | MongoDB Authentication |
| Authentication Security| mongodb\_localhost\_auth_bypass | Warns if MongoDB localhost bypass is enabled. | MongoDB localhost authentication bypass enabled |
| Configuration Security| mongodb\_authmech\_scramsha256 | Warns if MongoDB is not using the default SHA-256 hashing function as its SCRAM authentication method. | MongoDB Security AuthMech Check |
| Connection Security| mongodb_bindip | Warns if the MongoDB network binding is not set as Recommended. | MonogDB IP Bindings |
| CVE Security| mongodb\_cve\_version | Shows an error if MongoDB or Percona Server for MongoDB version is older than the latest version containing CVE (Common Vulnerabilities and Exposures) fixes. | MongoDB CVE Version |


### MySQL
| Advisor| Check Name | Description | Summary |
| :--------- | :---------- | :--- |:--- |
|Connection Configuration| mysql\_configuration\_max\_connections\_usage |Checks the MySQL max_connections configuration option to ensure maximum utilization is achieved.| Check Max Connections Usage |
| Generic Configuration | mysql\_automatic\_sp\_privileges\_enabled | Checks if the automatic\_sp\_privileges configuration is ON. | Checks if automatic\_sp\_privileges configuration is ON. |
| Generic Configuration | mysql\_config\_binlog\_retention\_period | | Binlogs Retention Check |
| Generic Configuration | mysql\_config\_binlog\_row\_image | Advises when to set binlog\_row\_image=FULL. | Binlogs Raw Image is Not Set to FULL |
| Generic Configuration | mysql\_config\_binlogs_checksummed | Advises when to set binlog_checksum=CRC32 to improve consistency and reliability. | Server is Not Configured to Enforce Data Integrity |
| Generic Configuration | mysql\_config\_general_log | Checks whether the general log is enabled. | General Log is Enabled |
| Generic Configuration | mysql\_config\_log_bin | Checks whether the binlog is enabled or disabled. | Binary Log is disabled |
| Generic Configuration | mysql\_config\_sql_mode | Checks whether the server has specific values configured in sql_mode to ensure maximum data integrity. | Server is Not Configured to Enforce Data Integrity |
| Generic Configuration | mysql\_config\_tmp\_table\_size_limit | Checks whether the size of temporary tables exceeds the size of heap tables.| Temp Table Size is Larger Than Heap Table Size |
| Generic Configuration | mysql\_configuration\_log_verbosity | Checks whether warnings are being printed on the log. | Check Log Verbosity |
| Generic Configuration | mysql\_test\_database | Notifies if there are database nameed 'test' or 'test_%'. | MySQL Test Database |
| Generic Configuration | mysql_timezone | Verifies whether the time zone is correctly loaded.| MySQL configuration check |
| InnoDB Configuration| innodb\_redo\_logs\_not\_sized_correctly | Reviews the InnoDB redo log size and provides suggestions if it is configured too low. | InnoDB Redo Log Size is Not Configured Correctly. |
| InnoDB Configuration| mysql\_ahi\_efficiency\_performance\_basic_check | Checks the efficiency and effectiveness of InnoDB's Adaptive Hash Index (AHI). | InnoDB Adaptive Hash Index (AHI) Efficiency |
| InnoDB Configuration| mysql\_config\_innodb\_redolog\_disabled | Warns when the MySQL InnoDB Redo log is set to OFF, which poses a significant security risk and compromises data integrity. 
The MySQL InnoDB Redo log is a crucial component for maintaining the ACID (Atomicity, Consistency, Isolation, Durability) properties in MySQL databases. | Redo Log is Disabled in This Instance |
| InnoDB Configuration| mysql\_configuration\_innodb\_file\_format | Verifies whether InnoDB is configured with the recommended file format. | MySQL InnoDB File Format |
| InnoDB Configuration| mysql\_configuration\_innodb\_file\_maxlimit | Checks whether InnoDB is configured with the recommended auto-extend settings. | InnoDB Tablespace Size Has a Maximum Limit. |
| InnoDB Configuration| mysql\_configuration\_innodb\_file\_per\_table\_not_enabled | Warns when innodb\_file\_per_table is not enabled. | innodb\_file\_per_table Not Enabled |
| InnoDB Configuration| mysql\_configuration\_innodb\_flush\_method | Checks whether InnoDB is configured with the recommended flush method. | MySQL InnoDB Flush Method |
| InnoDB Configuration| mysql\_configuration\_innodb\_strict\_mode | Warns about password lifetime. | InnoDB strict mode |
| Replication Configuration| mysql\_config\_relay\_log\_purge | Identifies whether a replica node has relay-logs purge set.| Automatic Relay Log Purging is OFF |
| Replication Configuration| mysql\_config\_replication_bp1 | Identifies whether a replica node is in read-only mode and if checksum is enabled. | Checks Basic Best Practices When Setting Replica Node. |
| Replication Configuration| mysql\_config\_slave\_parallel\_workers | Identifies whether replication is single-threaded.| Replication is Single-Threaded |
| Replication Configuration| mysql\_config\_sync_binlog | Checks whether the binlog is synchronized before a transaction is committed. | Sync Binlog Disabled |
| Replication Configuration| mysql\_log\_replica_updates | Checks if a replica is safely logging replicated transactions. | MySQL Configuration Check |
| Replication Configuration| replica\_running\_skipping\_errors\_or\_idempotent\_mode | Reviews replication status to check if it is configured to skip errors or if the slave\_exec\_mode is set to be idempotent. | Replica is skipping errors or slave\_exec\_mode is Idempotent. |
| Resources Configuration| mysql\_32binary\_on_64system | Notifies if version\_compile\_machine equals i686. | Check if Binaries are 32 Bits |
| Version Configuration| mysql\_unsupported\_version_check | Warns against an unsupported Mysql version. | Checks Mysql Version |
| Version Configuration| mysql_version | Warns if MySQL, Percona Server for MySQL, or MariaDB version is not the latest available one. | MySQL Version |
| Version Configuration| mysql\_version\_eol_57 | Checks if server version is EOL. | End Of Life Server Version (5.7). |
| Index Query| mysql\_performance\_temp\_ondisk\_table_high | Warns if there are too many on-disk temporary tables being created due to unoptimized query execution. | Too Many on Disk Temporary Tables |
| Index Query| mysql\_tables\_without_pk | Checks tables without primary keys. | MySQL check for table without Primary Key |
| Schema Design Query | mysql\_indexes\_larger | Check all the tables to see if any have indexes larger than data. This indicates sub-optimial schema and should be reviewed. |Tables With Index Sizes Larger Than Data |
| Authentication Security| mysql\_automatic\_expired_password | Warns if MySQL parameter automatic password expiry is not active. | MySQL Automatic User Expired Password |
| Authentication Security| mysql\_security\_anonymous_user | Anonymous user should never be present, that is a security safe best practices. | Anonymous user (you must remove any anonymous user) |
| Authentication Security| mysql\_security\_open\_to\_world_host | Host definition should never be '%' given it is too open . | User(s) has/have host definition '%' which is too open |
| Authentication Security| mysql\_security\_root\_not\_local | Root user has host definition that is not 127.0.0.1 or localhost. | Root user can connect from non local location |
| Authentication Security| mysql\_security\_user_ssl | User(s) not using secure SSL protocol to connect. | User(s) not using secure SSL protocol to connect |
| Authentication Security| mysql\_security\_user\_super\_not_local | User has Super privileges but is not connecting from local or the host is not fully restricted (ie 192.168.%). | User(s) has/have Super privileges with remote and too open access |
| Authentication Security| mysql\_security\_user\_without\_password | There is/are user(s) without password . | User(s) without password |
| Configuration Security| mysql\_config\_local_infile | Identify if a load data in file is active. | Load data in file active |
| Configuration Security| mysql\_configuration\_secure\_file\_priv_empty | The secure\_file\_priv when empty allows users with FILE privilege to create files at any location where MySQL server has write permission. | secure\_file\_priv is empty |
| Configuration Security| mysql\_password\_expiry | Checks for MySQL user password expired or expiring within 30 days | Check MySQL user password expiry |
| Configuration Security| mysql\_require\_secure_transport | Checks mysql\_secure\_transport_only . | MySQL configuration check |
| Configuration Security| mysql\_security\_password_lifetime | This check warns about password lifetime. | InnoDB password lifetime |
| Configuration Security| mysql\_security\_password_policy | This check for password policy. | MySQL security check for password |
| Connection Security| mysql\_private\_networks_only | This check returns a notice about MySQL accouns allowed to be connected from public networks. | MySQL Users With Granted Public Networks Access |
| Replication Security| mysql\_replication\_grants | This check if node has replication configured without a user grants | MySQL security check for replication user |
| Replication Security| mysql\_security\_replication\_grants\_mixed | Check if replication privileges is mixed with more elevated privileges | Replication privileges |


### PostgreSQL
| Advisor| Check Name | Description | Summary |
| :--------- | :---------- | :--- |:--- |
|Connection Configuration| postgresql\_max\_connections_1 | This check returns a notice if the max_connections configuration option is set to a high value (above 300). PostgreSQL doesn't cope well with having many connections even if they are idle. Recommended value is below 300. |
| Generic Configuration | postgresql\_archiver\_failing_1 | This check verify if the archiver has failed. |
| Generic Configuration | postgresql\_fsync\_1 | This check returns a error if the fsync configuration option is set to off which can lead to database corruptions. |
| Generic Configuration | postgresql\_log\_checkpoints_1 | This check returns a notice if the log_checkpoints configuration option is not enabled. It is recommended to enable the logging of checkpoint information, as that provides a lot of useful information with almost no drawbacks. |
| Generic Configuration | postgresql\_logging\_recommendation_checks | Checks to see if recommended minimum logging features are enabled." |
| Generic Configuration | postgresql\_wal\_retention_check | Checks to see if there are too many WAL files retained in the WAL directory |
| Vacuum Configuration| postgresql\_log\_autovacuum\_min\_duration_1 | This check returns a notice if the log\_autovacuum\_min_duration configuration option is set to -1 (disabled). It is recommended to enable the logging of autovacuum run information, as that provides a lot of useful information with almost no drawbacks. |
| Vacuum Configuration| postgresql\_table\_autovac_settings | This check returns those tables where autovacuum paramters are specified along with autovacuum settings specified |
| Vacuum Configuration| postgresql\_txid\_wraparound_approaching | This check verifies databases age and alert if the transaction ID wraparound issue is near |
| Vacuum Configuration| postgresql\_vacuum\_sanity_check | This performs a quick check of some vacuum parameters |
| Version Configuration| postgresql\_eol\_check | Checks to see if the currently installed PostgreSQL version is end of life and no longer supported |
| Version Configuration| postgresql\_extension\_check | This check will list outdated extensions with newer versions available |
| Version Configuration| postgresql\_unsupported\_check | Checks to see if the currently installed version is supported by percona |
| Version Configuration| postgresql\_version\_check | Checks to see if the currently installed version is outdated for it's release level |
| Generic Performance| postgresql\_cache\_hit\_ratio\_1 | This check the hitratio of one or more databases and complains when they are too low. |
| Generic Performance| postgresql\_config\_changes\_need\_restart_1 | This check returns a warning if there is any setting/configuration that was changed and needs a server restart/reload. |
| Generic Performance| postgresql\_tmpfiles\_check | This check reports the number of temporary files and number of bytes written to disk since last stats reset. |
| Replication Performance| postgresql\_stale\_replication\_slot\_1 | This check returns a warning if there is a stale replication slot. Stale replication slots will lead to WAL file accumulation and can result in a DB server outage. |
| Vacuum Performance| postgresql\_table\_bloat_bytes | Checks check verifies the size of the table bloat in bytes accross all databases and alert accordingly |
| Vacuum Performance| postgresql\_table\_bloat\_in\_percentage | This check verifies the size of the table bloat in percentage of the total table size and alert accordingly |
| Index Query| postgresql\_number\_of\_index\_check | This check will list relations with more than 10 indexes |
| Index Query| postgresql\_sequential\_scan_check | This check for tables with excessive sequential scans |
| Index Query| postgresql\_unused\_index_check | This check will list relations with indexes that have not been used since statistics where last reset |
| Authentication Security| postgresql\_super\_role | This check returns a notice if there are users with superuser role. |
| Configuration Security| postgresql\_expiring\_passwd_check | Check for passwords which are expiring and displays the time left beofre it expires |
| CVE Security| postgresql\_cve\_check | Checks to see if the currently installed version has reported security vulnerabilities |
