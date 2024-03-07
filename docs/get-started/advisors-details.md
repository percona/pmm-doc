
## List of Advisors

The [**Advisors**](https://portal.percona.com/advisors) page in the Percona Portal lists the Percona Advisors you can run from PMM. That Page will show the Advisors available for your tier.

For simplicity, we also listening all Advisors and checks on this page:


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

Every Advisor consists of the advisor checks inside. 
We have listed the checks and their details here for more detailed information.

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
| Advisor name| check name | description | summary | interval | family |
|Connection Configuration| mongodb\_connection\_sudden_spike | This check returns a warning if there is an increase in the number of connections that is higher than 50% of the most recent or normal number of connections. | MongoDB - sudden increase in connection count | STANDARD | MongoDB |
|Connection Configuration| mongodb_connections | This check returns the current number of connections as an informational notice when connection counts are above 5000. | MongoDB High connections | STANDARD | MongoDB |
|Connection Configuration| mysql\_configuration\_max\_connections\_usage | Checks for MySQL max_connections configuration option for maximum utilization | Check max connections usage | STANDARD | MySQL |
|Connection Configuration| postgresql\_max\_connections_1 | This check returns a notice if the max_connections configuration option is set to a high value (above 300). PostgreSQL doesn't cope well with having many connections even if they are idle. Recommended value is below 300. | PostgreSQL max_connections is too high. | STANDARD | PostgreSQL |
| Generic Configuration | mongo\_cache\_size | Mongo wiredtiger cache size is greater then default 50% | Mongo Storage Cache | STANDARD | MongoDB |
| Generic Configuration | mongodb\_active\_vs\_available\_connections | This check returns warnings if the ratio between active and available connections is higher than 75% | MongoDB Active vs Available Connections | STANDARD | MongoDB |
| Generic Configuration | mongodb_journal | This check returns warnings if journal is disabled. | MongoDB Journal | STANDARD | MongoDB |
| Generic Configuration | mongodb_loglevel | This check returns warnings if MongoDB is not using the default log level. | MongoDB Non-Default Log Level | STANDARD | MongoDB |
| Generic Configuration | mongodb\_read\_tickets | This check returns warnings if MongoDB is using more than 128 read tickets. | MongoDB Read Tickets | STANDARD | MongoDB |
| Generic Configuration | mongodb\_write\_tickets | This check returns warnings if MongoDB is using more than 128 write tickets. | MongoDB write Tickets | STANDARD | MongoDB |
| Generic Configuration | mongodb\_write\_tickets_runtime | This check returns warnings if MongoDB is using more than 128 write tickets during runtime. | MongoDB Configuration Write ticket Check | STANDARD | MongoDB |
| Generic Configuration | mysql\_automatic\_sp\_privileges\_enabled | This check reviews the automatic\_sp\_privileges configuration is ON. | Checks if automatic\_sp\_privileges configuration is ON. | STANDARD | MySQL |
| Generic Configuration | mysql\_config\_binlog\_retention\_period | Binlogs should not be rotated too often, except very specific cases. | Binlogs retention check | STANDARD | MySQL |
| Generic Configuration | mysql\_config\_binlog\_row\_image | Please consider setting binlog\_row\_image=FULL. | Binlogs raw image is not set to FULL | STANDARD | MySQL |
| Generic Configuration | mysql\_config\_binlogs_checksummed | Please consider setting binlog_checksum=CRC32 to improve consistency and reliability. | Server is not configured to enforce data integrity | STANDARD | MySQL |
| Generic Configuration | mysql\_config\_general_log | Check if the general log is enabled. | General Log is enabled | STANDARD | MySQL |
| Generic Configuration | mysql\_config\_log_bin | Check if the binlog is enabled or disabled. | Binary Log is disabled | STANDARD | MySQL |
| Generic Configuration | mysql\_config\_sql_mode | In order for maximum data integrity to be set, the server should have specific values configured in sql_mode. | Server is not configured to enforce data integrity | STANDARD | MySQL |
| Generic Configuration | mysql\_config\_tmp\_table\_size_limit | Check if the Temporary table size exceeds the heap table size. | Temp table size is larger than Heap Table size | STANDARD | MySQL |
| Generic Configuration | mysql\_configuration\_log_verbosity | Checks that warnings are being printed on the log | Check log verbosity | STANDARD | MySQL |
| Generic Configuration | mysql\_test\_database | This check returns a notice if there is database with name 'test' or 'test_%'. | MySQL test Database | STANDARD | MySQL |
| Generic Configuration | mysql_timezone | Checks if time zone is correctly loaded. | MySQL configuration check | STANDARD | MySQL |
| Generic Configuration | postgresql\_archiver\_failing_1 | This check verify if the archiver has failed. | PostgreSQL Archiver is failing | STANDARD | PostgreSQL |
| Generic Configuration | postgresql\_fsync\_1 | This check returns a error if the fsync configuration option is set to off which can lead to database corruptions. | PostgreSQL fsync is set to off | STANDARD | PostgreSQL |
| Generic Configuration | postgresql\_log\_checkpoints_1 | This check returns a notice if the log_checkpoints configuration option is not enabled. It is recommended to enable the logging of checkpoint information, as that provides a lot of useful information with almost no drawbacks. | PostgreSQL Checkpoints Logging is Disabled. | STANDARD | PostgreSQL |
| Generic Configuration | postgresql\_logging\_recommendation_checks | Checks to see if recommended minimum logging features are enabled." | Check for minimal logging | STANDARD | PostgreSQL |
| Generic Configuration | postgresql\_wal\_retention_check | Checks to see if there are too many WAL files retained in the WAL directory | Check for WAL file accumulation | STANDARD | PostgreSQL |
| InnoDB Configuration| innodb\_redo\_logs\_not\_sized_correctly | This check reviews InnoDB redo log size and suggests if it is configured too low. | Checks if InnoDB redo log size is not configured correctly. | STANDARD | MySQL |
| InnoDB Configuration| mysql\_ahi\_efficiency\_performance\_basic_check | Check the efficiency and effectiveness of InnoDB's Adaptive Hash Index (AHI). | InnoDB Adaptive Hash Index (AHI) efficiency checker | STANDARD | MySQL |
| InnoDB Configuration| mysql\_config\_innodb\_redolog\_disabled | The MySQL InnoDB Redo log, is one of the core components to fulfil the ACID paradigm in MySQL. This element is currently OFF, the setting is highly insecure. | Redo log is disabled in this instance | STANDARD | MySQL |
| InnoDB Configuration| mysql\_configuration\_innodb\_file\_format | Check if InnoDB is configured with recommended file format | MySQL InnoDB file format | STANDARD | MySQL |
| InnoDB Configuration| mysql\_configuration\_innodb\_file\_maxlimit | Check if InnoDB is configured with recommended auto-extend | InnoDB Tablespace size has a maximum limit. | STANDARD | MySQL |
| InnoDB Configuration| mysql\_configuration\_innodb\_file\_per\_table\_not_enabled | innodb\_file\_per_table not enabled | innodb\_file\_per_table not enabled | STANDARD | MySQL |
| InnoDB Configuration| mysql\_configuration\_innodb\_flush\_method | Check if InnoDB is configured with recommended flush method | MySQL InnoDB flush method | STANDARD | MySQL |
| InnoDB Configuration| mysql\_configuration\_innodb\_strict\_mode | This check warns about password lifetime. | InnoDB strict mode | STANDARD | MySQL |
| Replication Configuration| mongodb\_psa\_architecture_check | This check returns an error if the replicaSet is using a PSA architecture. | MongoDB PSA Architecture | STANDARD | MongoDB |
| Replication Configuration| mongodb\_replicaset\_topology | This check returns warnings if the Replica Set has less than 3 data bearing nodes | MongoDB Replica Set Topology | STANDARD | MongoDB |
| Replication Configuration| mysql\_config\_relay\_log\_purge | Identify if a replica node has relay-logs purge set. | Automatic relay log purging is off | STANDARD | MySQL |
| Replication Configuration| mysql\_config\_replication_bp1 | Identify if a replica node is in read-only mode and if checksum. | Checks for basic best practices when setting a replica node. | STANDARD | MySQL |
| Replication Configuration| mysql\_config\_slave\_parallel\_workers | Identify if a replication is single threaded. | Replication is single threaded | STANDARD | MySQL |
| Replication Configuration| mysql\_config\_sync_binlog | Check if the binlog synchronized before transaction is committed. | Sync binlog is disabled | STANDARD | MySQL |
| Replication Configuration| mysql\_log\_replica_updates | Checks if a replica is safely logging replicated transactions. | MySQL configuration check | STANDARD | MySQL |
| Replication Configuration| replica\_running\_skipping\_errors\_or\_idempotent\_mode | This check reviews replication status to review if it is configured to skip errors or if the slave\_exec\_mode is configured to be idempotent. | Checks if replica configured is skipping errors or slave\_exec\_mode is idempotent. | STANDARD | MySQL |
| Resources Configuration| mongodb\_collection\_fragmented | This check returns a warning if the Storage size is greater than the Data size of a collection. That condition indicates that the collection is fragmented and needs a Compaction or Initial sync to reclaim disk space. | MongoDB Collections Fragmented | RARE | MongoDB |
| Resources Configuration| mongodb_cpucores | This check returns warnings if the number of CPU cores does not meet the minimum recommended requirements according to best practices. | MongoDB CPU cores | STANDARD | MongoDB |
| Resources Configuration| mongodb\_dbpath\_mount | This check returns a warning if dbpath does not have a dedicated mount point. | MongoDB - separate mount point other than "/" partition for dbpath. | RARE | MongoDB |
| Resources Configuration| mongodb\_fcv\_check | This check returns a warning if there is a mismatch between the MongoDB version and the internal FCV parameter setting. | MongoDB - FCV mismatch | STANDARD | MongoDB |
| Resources Configuration| mongodb_maxsessions | This check returns warnings if MongoDB is using more maxSessions value other than the default one 1000000 2 | MongoDB maxSessions | STANDARD | MongoDB |
| Resources Configuration| mongodb\_swap\_allocation | This check returns a warning if there is no swap memory allocated to your instance. | MongoDB - allocate swap memory | STANDARD | MongoDB |
| Resources Configuration| mongodb_taskexecutor | MongoDB TaskExecutorPoolSize count is higher than available CPU cores | MongoDB TaskExecutorPoolSize High | STANDARD | MongoDB |
| Resources Configuration| mongodb\_xfs\_ftype | This check returns a warning if dbpath is not using xfs filesystem type. | MongoDB - xfs | STANDARD | MongoDB |
| Resources Configuration| mysql\_32binary\_on_64system | This check returns a notice if version\_compile\_machine equals i686. | Check if binaries are 32 bits | STANDARD | MySQL |
| Vacuum Configuration| postgresql\_log\_autovacuum\_min\_duration_1 | This check returns a notice if the log\_autovacuum\_min_duration configuration option is set to -1 (disabled). It is recommended to enable the logging of autovacuum run information, as that provides a lot of useful information with almost no drawbacks. | PostgreSQL Autovacuum Logging Is Disabled | STANDARD | PostgreSQL |
| Vacuum Configuration| postgresql\_table\_autovac_settings | This check returns those tables where autovacuum paramters are specified along with autovacuum settings specified | Check whether there is any table level autovacuum settings | STANDARD | PostgreSQL |
| Vacuum Configuration| postgresql\_txid\_wraparound_approaching | This check verifies databases age and alert if the transaction ID wraparound issue is near | PostgreSQL Transaction ID Wraparound approaching | STANDARD | PostgreSQL |
| Vacuum Configuration| postgresql\_vacuum\_sanity_check | This performs a quick check of some vacuum parameters | PostgreSQL vacuum setting quick check | STANDARD | PostgreSQL |
| Version Configuration| mongodb_EOL | This check returns errors or warnings if your current PSMDB or MongoDB version has reached or is about to reach End-of-Life. | MongoDB version EOL | STANDARD | MongoDB |
| Version Configuration| mongodb\_unsupported\_version | This check returns errors if your current PSMDB or MongoDB version is not supported. | MongoDB Unspported version check | STANDARD | MongoDB |
| Version Configuration| mongodb_version | This check returns information on current MongoDB or Percona Server for MongoDB versions used in your environment. It also provides information on other available minor or major versions to consider for upgrades. | MongoDB version check | STANDARD | MongoDB |
| Version Configuration| mysql\_unsupported\_version_check | This check warns against an unsupported mysql version | Checks mysql version for support | STANDARD | MySQL |
| Version Configuration| mysql_version | This check returns warnings if MySQL, Percona Server for MySQL, or MariaDB version is not the latest one. | MySQL Version | STANDARD | MySQL |
| Version Configuration| mysql\_version\_eol_57 | Check if server version is EOL | End Of Life server version (5.7). | STANDARD | MySQL |
| Version Configuration| postgresql\_eol\_check | Checks to see if the currently installed PostgreSQL version is end of life and no longer supported | Check if PostgreSQL version is EOL | STANDARD | PostgreSQL |
| Version Configuration| postgresql\_extension\_check | This check will list outdated extensions with newer versions available | Check for outdated extensions | STANDARD | PostgreSQL |
| Version Configuration| postgresql\_unsupported\_check | Checks to see if the currently installed version is supported by percona | Check for unsupported PostgreSQL | STANDARD | PostgreSQL |
| Version Configuration| postgresql\_version\_check | Checks to see if the currently installed version is outdated for it's release level | Check for newer version of PostgreSQL | STANDARD | PostgreSQL |
| Generic Performance| mongodb\_multiple\_services | This check returns a notice if multiple mongod services are running in a single node. | MongoDB - Multiple mongod services | STANDARD | MongoDB |
| Generic Performance| postgresql\_cache\_hit\_ratio\_1 | This check the hitratio of one or more databases and complains when they are too low. | PostgreSQL cache hit ratio | STANDARD | PostgreSQL |
| Generic Performance| postgresql\_config\_changes\_need\_restart_1 | This check returns a warning if there is any setting/configuration that was changed and needs a server restart/reload. | Configuration change requires restart/reload. | STANDARD | PostgreSQL |
| Generic Performance| postgresql\_tmpfiles\_check | This check reports the number of temporary files and number of bytes written to disk since last stats reset. | PostgreSQL temporary file statistics | STANDARD | PostgreSQL |
| Replication Performance| name | description | summary | interval | family |
| Replication Performance| mongodb\_chunk\_imbalance | This check warns if the chunks are imbalanced across shards. | MongoDB Sharding - Chunk Imbalance Across Shards. | STANDARD | MongoDB |
| Replication Performance| mongodb\_oplog\_size_recommendation | This check returns a warning if the oplog window is below a 24 hour period and offers a recommended oplog size based on your instance. | MongoDB - Oplog Recovery Window is low. Please consider resizing your oplog according to the provided recommendation. | STANDARD | MongoDB |
| Replication Performance| mongodb\_replication\_lag | This check returns warnings if the Replica Set member is more than 10 sec behind the primary | MongoDB Replication Lag | STANDARD | MongoDB |
| Replication Performance| postgresql\_stale\_replication\_slot\_1 | This check returns a warning if there is a stale replication slot. Stale replication slots will lead to WAL file accumulation and can result in a DB server outage. | PostgreSQL Stale Replication Slot | STANDARD | PostgreSQL |
| Vacuum Performance| postgresql\_table\_bloat_bytes | Checks check verifies the size of the table bloat in bytes accross all databases and alert accordingly | Check amount of bloat in tables if greater tahn 250MB | STANDARD | PostgreSQL |
| Vacuum Performance| postgresql\_table\_bloat\_in\_percentage | This check verifies the size of the table bloat in percentage of the total table size and alert accordingly | PostgreSQL Table Bloat in percentage of the table size | STANDARD | PostgreSQL |
| Index Query| mongodb\_shard\_collection\_inconsistent\_indexes | This check warns if there are inconsistent indexes across shards for sharded collections. Missing or inconsistent indexes across the shards can have a negative impact on performance. | MongoDB Sharding - Inconsistent Indexes Across Shards. | STANDARD | MongoDB |
| Index Query| mongodb\_unused\_index | This check returns a warning if there are unused indexes on any database collection in your instance (Need to enable "indexStats" collector). | MongoDB - Unused Indexes | STANDARD | MongoDB |
| Index Query| mysql\_performance\_temp\_ondisk\_table_high | This check warns against too many ondisk temporary tables created due to unoptimized query execution. | Too many on disk temporary tables | STANDARD | MySQL |
| Index Query| mysql\_tables\_without_pk | Checks tables without primary keys. | MySQL check for table without Primary Key | STANDARD | MySQL |
| Index Query| postgresql\_number\_of\_index\_check | This check will list relations with more than 10 indexes | Check for relations have high number of indexes | STANDARD | PostgreSQL |
| Index Query| postgresql\_sequential\_scan_check | This check for tables with excessive sequential scans | PostgreSQL sequential scan check | STANDARD | PostgreSQL |
| Index Query| postgresql\_unused\_index_check | This check will list relations with indexes that have not been used since statisttics where last reset | Check for relations thathave unused indexes | STANDARD | PostgreSQL |
| Schema Design Query | mysql\_indexes\_larger | Check all the tables to see if any have indexes larger than data. This indicates sub-optimial schema and should be reviewed. | Are there tables with index sizes larger than data? | STANDARD | MySQL |
| Authentication Security| mongodb_auth | Warns if MongoDB authentication is disabled. | MongoDB authentication | STANDARD | MongoDB |
| Authentication Security| mongodb\_localhost\_auth_bypass | This check returns warnings if MongoDB localhost bypass is enabled. | MongoDB localhost authentication bypass enabled | STANDARD | MongoDB |
| Authentication Security| mysql\_automatic\_expired_password | This check warns if MySQL parameter automatic password expiry is not active. | MySQL Automatic User Expired Password | STANDARD | MySQL |
| Authentication Security| mysql\_security\_anonymous_user | Anonymous user should never be present, that is a security safe best practices. | Anonymous user (you must remove any anonymous user) | STANDARD | MySQL |
| Authentication Security| mysql\_security\_open\_to\_world_host | Host definition should never be '%' given it is too open . | User(s) has/have host definition '%' which is too open | STANDARD | MySQL |
| Authentication Security| mysql\_security\_root\_not\_local | Root user has host definition that is not 127.0.0.1 or localhost. | Root user can connect from non local location | STANDARD | MySQL |
| Authentication Security| mysql\_security\_user_ssl | User(s) not using secure SSL protocol to connect. | User(s) not using secure SSL protocol to connect | STANDARD | MySQL |
| Authentication Security| mysql\_security\_user\_super\_not_local | User has Super privileges but is not connecting from local or the host is not fully restricted (ie 192.168.%). | User(s) has/have Super privileges with remote and too open access | STANDARD | MySQL |
| Authentication Security| mysql\_security\_user\_without\_password | There is/are user(s) without password . | User(s) without password | STANDARD | MySQL |
| Authentication Security| postgresql\_super\_role | This check returns a notice if there are users with superuser role. | PostgreSQL Super Role | STANDARD | PostgreSQL |
| Configuration Security| mongodb\_authmech\_scramsha256 | This check returns warnings if MongoDB is not using the default SHA-256 hashing function as its SCRAM authentication method. | MongoDB Security AuthMech Check | STANDARD | MongoDB |
| Configuration Security| mysql\_config\_local_infile | Identify if a load data in file is active. | Load data in file active | STANDARD | MySQL |
| Configuration Security| mysql\_configuration\_secure\_file\_priv_empty | The secure\_file\_priv when empty allows users with FILE privilege to create files at any location where MySQL server has write permission. | secure\_file\_priv is empty | STANDARD | MySQL |
| Configuration Security| mysql\_password\_expiry | Checks for MySQL user password expired or expiring within 30 days | Check MySQL user password expiry | STANDARD | MySQL |
| Configuration Security| mysql\_require\_secure_transport | Checks mysql\_secure\_transport_only . | MySQL configuration check | STANDARD | MySQL |
| Configuration Security| mysql\_security\_password_lifetime | This check warns about password lifetime. | InnoDB password lifetime | STANDARD | MySQL |
| Configuration Security| mysql\_security\_password_policy | This check for password policy. | MySQL security check for password | STANDARD | MySQL |
| Configuration Security| postgresql\_expiring\_passwd_check | Check for passwords which are expiring and displays the time left beofre it expires | Check for password expiration | STANDARD | PostgreSQL |
| Connection Security| mongodb_bindip | This check returns warnings if the MongoDB network binding is not set as recommended. | MonogDB IP bindings | STANDARD | MongoDB |
| Connection Security| mysql\_private\_networks_only | This check returns a notice about MySQL accouns allowed to be connected from public networks. | MySQL Users With Granted Public Networks Access | STANDARD | MySQL |
| CVE Security| mongodb\_cve\_version | This check returns errors if MongoDB or Percona Server for MongoDB version is less than the latest one with CVE fixes. | MongoDB CVE Version | STANDARD | MongoDB |
| CVE Security| postgresql\_cve\_check | Checks to see if the currently installed version has reported security vulnerabilities | Check for security vulnerabilities | STANDARD | PostgreSQL |
| Replication Security| mysql\_replication\_grants | This check if node has replication configured without a user grants | MySQL security check for replication user | STANDARD | MySQL |
| Replication Security| mysql\_security\_replication\_grants\_mixed | Check if replication privileges is mixed with more elevated privileges | Replication privileges | STANDARD | MySQL |
