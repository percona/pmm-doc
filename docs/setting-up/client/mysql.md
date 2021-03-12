# MySQL and variants

PMM Client collects metrics from MySQL, Percona Server for MySQL, Percona XtraDB Cluster, and MariaDB. (Amazon RDS is also supported and explained in a [separate section](aws.md).)

This page shows you how to set up PMM to monitor a MySQL or MySQL-based database instance. (You should read it completely before starting work.)

Here is an overview of the steps involved.

```plantuml source="_resources/diagrams/Setting-Up_Client_MySQL.puml"
```

## Create a database account for PMM

It is good practice to use a non-superuser account to connect PMM Client to the monitored database instance. This example creates a database user with name `pmm`, password `pass`, and the necessary permissions.

```sql
CREATE USER 'pmm'@'localhost' IDENTIFIED BY 'pass' WITH MAX_USER_CONNECTIONS 10;
GRANT SELECT, PROCESS, SUPER, REPLICATION CLIENT, RELOAD ON *.* TO 'pmm'@'localhost';
```

## Choose and configure a source

Decide which source of metrics to use, and configure your database server for it. The choices are [Slow query log](#slow-query-log) and [Performance Schema](#performance-schema).

While you can use both at the same time we recommend using only one--there is some overlap in the data reported, and each incurs a small performance penalty. The choice depends on the version and variant of your MySQL instance, and how much detail you want to see.

Here are the benefits and drawbacks of *Slow query log* and *Performance Schema* metrics sources.

|                        | {{icon.thumbsup}} **Benefits**                                                   | {{icon.thumbsdown}} **Drawbacks**
|------------------------|----------------------------------------------------------------------------------|------------------------------------------
| **Slow query log**     | More detail.                                                                     | PMM Client must be on the same host as the database server or have access to the slow query log.
|                        | Lower resource impact (with query sampling feature in Percona Server for MySQL). | Log files grow and must be actively managed.
| **Performance Schema** | Faster parsing.                                                                  | Less detail.
|                        | Enabled by default on newer versions of MySQL.                                   |

**Data source recommendations**

| Database server          | Versions       | Recommended source | Default?
|--------------------------|----------------|--------------------|------------
| MySQL                    | 5.1-5.5        | Slow query log     | No
| MySQL                    | 5.6+           | Performance Schema | Yes, from 5.6.6
| MariaDB                  | 10.0+          | Performance Schema | No
| Percona Server for MySQL | 5.7, 8.0       | Slow log           | TODO
| Percona XtraDB Cluster   | 5.6, 5.7, 8.0  | Slow query log     | No

### Slow query log

This section covers how to configure a MySQL-based database server to use the *slow query log* as a source of metrics.

**Applicable versions**

| Server                   | Versions         |
|--------------------------|------------------|
| MySQL                    | 5.1-5.5          |
| MariaDB                  | 10.1.2+          |
| Percona Server for MySQL | 5.7.10+, 8.0.12+ |
| Percona XtraDB Cluster   | 5.6, 5.7, 8.0    |

The *slow query log* records the details of queries that take more than a certain amount of time to complete. With the database server configured to write this information to a file rather than a table, PMM Client parses the file and sends aggregated data to PMM Server via the Query Analytics part of PMM Agent.

**Settings**

| Variable                                                        | Value  |Description
|-----------------------------------------------------------------|--------|----------------------------------------------------------
| [`slow_query_log`][sysvar_slow_query_log] {{pad.55}}            | ON     | Enables the slow query log.
| [`log_output`][sysvar_log_output]                               |`'FILE'`| Ensures the log is sent to a file. (This is the default on MariaDB.)
| [`long_query_time`][sysvar_long_query_time]                     | 0      | The slow query threshold in seconds. In heavily-loaded applications, many quick queries can affect performance more than a few slow ones. Setting this value to `0` ensures all queries are captured.
| [`log_slow_admin_statements`][sysvar_log_slow_admin_statements] | ON     | Includes the logging of slow administrative statements.
| [`log_slow_slave_statements`][sysvar_log_slow_slave_statements] | ON     | Enables logging for queries that have taken more than `long_query_time` seconds to execute on the replica.

**Examples**

*Configuration file*

```ini
slow_query_log=ON
log_output=FILE
long_query_time=0
log_slow_admin_statements=ON
log_slow_slave_statements=ON
```

*Session*

```sql
SET GLOBAL slow_query_log = 1;
SET GLOBAL log_output = 'FILE';
SET GLOBAL long_query_time = 0;
SET GLOBAL log_slow_admin_statements = 1;
SET GLOBAL log_slow_slave_statements = 1;
```

#### Slow query log -- extended

Some MySQL-based database servers support extended slow query log variables.

**Applicable versions**

| Server                   | Versions
|--------------------------|-----------------
| Percona Server for MySQL | 5.7.10+, 8.0.12+
| Percona XtraDB Cluster   | 5.6, 5.7, 8.0
| MariaDB                  | 10.0

**Settings**

| Variable                                                                 | Value | Description
|--------------------------------------------------------------------------|-------|-----------------------------------------------------------------------------------
| [`log_slow_rate_limit`][log_slow_rate_limit]  {{pad.70}}                 | 100   | Defines the rate of queries captured by the *slow query log*. A good rule of thumb is 100 queries logged per second. For example, if your Percona Server instance processes 10,000 queries per second, you should set `log_slow_rate_limit` to `100` and capture every 100th query for the *slow query log*. Depending on the amount of traffic, logging could become aggressive and resource consuming. This variable throttles the level of intensity of the data capture without compromising information.
| [`log_slow_rate_type`][log_slow_rate_type]                               |'query'| Set so that it applies to queries, rather than sessions.
| [`slow_query_log_always_write_time`][slow_query_log_always_write_time]   | 1     | Specifies which queries should ignore sampling. With query sampling this ensures that queries with longer execution time will always be captured by the slow query log, avoiding the possibility that infrequent slow queries might not get captured at all.
| [`log_slow_verbosity`][log_slow_verbosity]                               |'full' | Ensures that all information about each captured query is stored in the slow query log.
| [`slow_query_log_use_global_control`][slow_query_log_use_global_control] |'all'  | Configure the slow query log during runtime and apply these settings to existing connections. (By default, slow query log settings apply only to new sessions.)

**Examples**

*Configuration file (Percona Server for MySQL, Percona XtraDB Cluster)*

```ini
log_slow_rate_limit=100
log_slow_rate_type='query'
slow_query_log_always_write_time=1
log_slow_verbosity='full'
slow_query_log_use_global_control='all'
```

*Configuration file (MariaDB)*

```ini
log_slow_rate_limit=100
```

*Session (Percona Server for MySQL, Percona XtraDB Cluster)*

```sql
SET GLOBAL log_slow_rate_limit = 100;
SET GLOBAL log_slow_rate_type = 'query';
SET GLOBAL slow_query_log_always_write_time = 1;
SET GLOBAL log_slow_verbosity = 'full';
SET GLOBAL slow_query_log_use_global_control = 'all';
```

#### Slow query log rotation

Slow query log files can grow quickly and must be managed.

When adding a service with the command line use the  `pmm-admin` option `--size-slow-logs` to set at what size (in bytes) the slow query log file is rotated. When the limit is reached, PMM Client will:

- remove the previous `.old` slow log file,
- rename the current file by adding the suffix `.old`,
- execute the MySQL command `FLUSH LOGS`.

Only one `.old` file is kept. Older ones are deleted.

You can manage log rotation yourself, for example, with [`logrotate`][LOGROTATE]. If you do, you can disable PMM Client's log rotation with the `--slow-log-rotation=false` option when adding a service with `pmm-admin add`.

### Performance Schema

This section covers how to configure a MySQL-based database server to use *Performance Schema* as a source of metrics.

**Applicable versions**

| Server                   | Versions
|--------------------------|-----------------------------------------
| Percona Server for MySQL | 5.6, 5.7, 8.0
| Percona XtraDB Cluster   | 5.6, 5.7, 8.0
| MariaDB                  | [10.3+][mariadb_perfschema_instr_table]

PMM's [*MySQL Performance Schema Details* dashboard](../../details/dashboards/dashboard-mysql-performance-schema-details.md) charts the various [performance_schema][performance-schema-startup-configuration] metrics.

To use *Performance Schema*, set these variables.

| Variable                                                                                   | Value              | Description
|--------------------------------------------------------------------------------------------|--------------------|---------------------------------------------------------------------------------
| [`performance_schema`][sysvar_performance_schema]                                          | `ON`               | Enables *Performance Schema* metrics. This is the default in MySQL 5.6.6 and higher.
| [`performance-schema-instrument`][perfschema-instrument]                                   | `'statement/%=ON'` | Configures Performance Schema instruments.
| [`performance-schema-consumer-statements-digest`][perfschema-consumer-statements-digest]   | `ON`               | Configures the `statements-digest` consumer.
| [`innodb_monitor_enable`][sysvar_innodb_monitor_enable]                                    | all                | Enables InnoDB metrics counters.

**Examples**

*Configuration file*

```ini
performance_schema=ON
performance-schema-instrument='statement/%=ON'
performance-schema-consumer-statements-digest=ON
innodb_monitor_enable=all
```

*Session*

(`performance_schema` cannot be set in a session and must be set at server start-up.)

```sql
UPDATE performance_schema.setup_consumers
SET ENABLED = 'YES' WHERE NAME LIKE '%statements%';
SET GLOBAL innodb_monitor_enable = all;
```

**MariaDB 10.5.7 or lower**

There is no *Explain* or *Example* data shown by default in Query Analytics when monitoring MariaDB instances version 10.5.7 or lower. A workaround is to set this variable.

| Variable                                                                  | Value           | Description
|---------------------------------------------------------------------------|-----------------|-----------------------------
| [`performance_schema.setup_instruments`][mariadb_perfschema_instr_table]  | `'statement/%'` | List of instrumented object classes.

**Session**

```sql
UPDATE performance_schema.setup_instruments SET ENABLED = 'YES', TIMED = 'YES' WHERE NAME LIKE 'statement/%';
UPDATE performance_schema.setup_consumers SET ENABLED = 'YES' WHERE NAME LIKE '%statements%';
```

## Query response time

*Query time distribution* is a chart in the [*Details* tab of Query Analytics](../../using/query-analytics.md#details-tab) showing the proportion of query time spent on various activities. It is enabled with the `query_response_time_stats` variable and associated plugins.

**Applicable versions**

| Server                   | Versions
|--------------------------|------------
| Percona Server for MySQL | 5.7 (**not** [Percona Server for MySQL 8.0][PS_FEATURES_REMOVED].)
| MariaDB                  | 10.0.4

Set this variable to see query time distribution charts.

| Variable                                                               | Value | Description
|------------------------------------------------------------------------|-------|-----------------------------------------------------------------------------------
| [`query_response_time_stats`][ps_query_response_time_stats] {{pad.35}} | ON    | Report *query response time distributions*. (Requires plugin installation. See below.)

*Configuration file*

```ini
query_response_time_stats=ON
```

You must also install the plugins.

*Session*

1. Check that `/usr/lib/mysql/plugin/query_response_time.so` exists.

2. Install the plugins and activate.

	For [MariaDB 10.3][mariadb_query_response_time]:

	```sql
	INSTALL PLUGIN QUERY_RESPONSE_TIME_AUDIT SONAME 'query_response_time.so';
	INSTALL PLUGIN QUERY_RESPONSE_TIME SONAME 'query_response_time.so';
	SET GLOBAL query_response_time_stats = ON;
	```

	For [Percona Server for MySQL 5.7][ps_query_response_time_stats]:

	```sql
	INSTALL PLUGIN QUERY_RESPONSE_TIME_AUDIT SONAME 'query_response_time.so';
	INSTALL PLUGIN QUERY_RESPONSE_TIME SONAME 'query_response_time.so';
	INSTALL PLUGIN QUERY_RESPONSE_TIME_READ SONAME 'query_response_time.so';
	INSTALL PLUGIN QUERY_RESPONSE_TIME_WRITE SONAME 'query_response_time.so';
	SET GLOBAL query_response_time_stats = ON;
	```

## Tablestats

Some table metrics are automatically disabled when the number of tables exceeds a default limit of 1000 tables. This prevents PMM Client from affecting the performance of your database server.

The limit can be changed [when adding a service on the command line ](#2-2-command-line) with the two `pmm-admin` options:

| `pmm-admin` option                | Description
|-----------------------------------|--------------------------------------------------------------------------
| `--disable-tablestats` {{pad.65}} | Disables tablestats collection when the default limit is reached.
| `--disable-tablestats-limit=N`    | Sets the number of tables (`N`) for which tablestats collection is disabled. 0 means no limit. A negative number means tablestats is completely disabled (for any number of tables).

## User statistics

**Applicable versions**

User activity, individual table and index access details are shown on the [MySQL User Details][DASH_MYSQLUSERDETAILS] dashboard when the `userstat` variable is set.

| Server                    | Versions
|---------------------------|---------------
| Percona Server for MySQL  | 5.6, 5.7, 8.0
| Percona XtraDB Cluster    | 5.6, 5.7, 8.0
| MariaDB                   | 5.2.0+

**Examples**

*Configuration file*

```ini
userstat=ON
```

*Session*

```sql
SET GLOBAL userstat = ON;
```

## Add a service

When you have configured your database server, you can add a MySQL service with the user interface or on the command line.

When adding a service with the command line, you must use the `pmm-admin --query-source=SOURCE` option to match the source you've chosen and configured the database server for.

With the PMM user interface, you select *Use performance schema*, or deselect it to use *slow query log*.

### With the user interface

1. Select *PMM --> PMM Add Instance*.

2. Select *MySQL -- Add a remote instance*.

3. Enter values for these fields.

	| Section                  | Field                                          | Required | Description                             | Default  | `pmm-admin` parameter
	| ------------------------ | ---------------------------------------------- | -------- | --------------------------------------- | -------- | --------------------------
	| *Main details*           |                                                |          |                                         |          |
	|                          | *Hostname*                                     | ☑️        | Hostname or IP address of the service   |          | `--address`
	|                          | *Service name*                                 |          | Service name                            |          | `--name`
	|                          | *Port*                                         |          | Port for accessing the service          | 3306     | `port` in `--address=address[:port]`
	|                          | *Username*                                     |          | MySQL user name                         |          | `--username`
	|                          | *Password*                                     |          | MySQL user password                     |          | `--password`
	| *Labels*                 |                                                |          |                                         |          |
	|                          | *Environment*                                  |          |                                         |          | `--environment`
	|                          | *Region*                                       |          |                                         |          |
	|                          | *Availability zone*                            |          |                                         |          |
	|                          | *Replication set*                              |          |                                         |          | `--replication-set`
	|                          | *Cluster*                                      |          |                                         |          | `--cluster`
	|                          | *Custom labels*                                |          |                                         |          | `--custom-labels`
	| *Additional options*     |                                                |          |                                         |          |
    |                          | *Skip connection check*                        |          |                                         |          | `--skip-connection-check`
	|                          | *Use TLS for database connections*             |          |                                         |          | `--tls`
	|                          | *Skip TLS certificate and hostname validation* |          |                                         |          | `--tls-skip-verify`
	|                          | *Table statistics limit*                       |          |                                         |          |
	|                      	   | --> *Disabled*                                 |          |                                         |          | `--disable-tablestats`
	|                      	   | --> *Default*                                  |          |                                         |          | `--disable-tablestats-limit`
	|                      	   | --> *Custom*                                   |          |                                         |          | `--disable-tablestats-limit`
	|                          | *Use performance schema*                       |          |                                         |          | `--perfschema` if selected, `--slowlog` if not.

4. Click *Add service*.

### On the command line

1. Configure PMM Client (connect to example PMM Server at address `192.168.1.123`).

	```sh
	pmm-admin config --server-insecure-tls --server-url=https://192.168.1.123:443
	```

2. Add the database server as a service using one of these example commands. If successful, PMM Client will print `MySQL Service added` with the service's ID and name. Use the `--environment` and `-custom-labels` options to set tags for the service that help you distinguish them.

**Examples -- Slow query log**

Default query source (`slowlog`), service name (`{node name}-mysql`), and service address/port (`127.0.0.1:3306`), with database server account `pmm` and password `pass`.

```sh
sudo pmm-admin add mysql --username=pmm --password=pass
```

Slow query log source and log size limit (`1048576` bytes), service name (`MYSQL_NODE`) and service address/port (`191.168.1.123:3306`).

```sh
sudo pmm-admin add mysql --query-source=slowlog --size-slow-logs=1048576 --username=pmm --password=pass MYSQL_NODE 192.168.1.123:3306
```

Slow query log source, disabled log management (use [`logrotate`][LOGROTATE] or some other log management tool), service name (`MYSQL_NODE`) and service address/port (`191.168.1.123:3306`).

```sh
sudo pmm-admin add mysql --query-source=slowlog --size-slow-logs=false --username=pmm --password=pass MYSQL_NODE 192.168.1.123:3306
```

Default query source (`slowlog`), service name (`{node}-mysql`), connect via socket.

```sh
sudo pmm-admin add mysql --username=pmm --password=pass --socket=/var/run/mysqld/mysqld.sock
```

**Examples -- Performance Schema**

Performance schema query source, service name (`MYSQL_NODE`) and default service address/port (`127.0.0.1:3306`)

```sh
sudo pmm-admin add mysql --query-source=perfschema --username=pmm --password=pass MYSQL_NODE
```

Performance schema query source, service name (`MYSQL_NODE`) and default service address/port (`127.0.0.1:3306`) specified with flags.

```sh
sudo pmm-admin add mysql --query-source=perfschema --username=pmm --password=pass --service-name=MYSQL_NODE --host=127.0.0.1 --port=3306
```

**Examples -- Identifying services**

Default query source (`slowlog`), environment labelled `test`, custom labels setting `source` to `slowlog`. (This example uses positional parameters for service name and service address.)

```sh
pmm-admin add mysql --environment=test --custom-labels='source=slowlog'  --username=root --password=password --query-source=slowlog MySQLSlowLog localhost:3306
```

## Check the service

**Check service - PMM user interface**

1. Go to *PMM --> PMM Inventory*.
2. Look in the *Services* tab for a matching *Service Type* (MySQL), *Service name*, *Addresses*, and any other details entered in the form.
3. Look in the *Agents* tab to check the desired data source is being used.

**Check service - Command line**

Look for your service in the output of this command.

```sh
pmm-admin inventory list services
```

**Check data**

1. Open the *MySQL Instance Summary* dashboard.
2. Set the *Service Name* to the newly-added service.

**Percona Server for MySQL, MariaDB**

If query response time plugin was installed, check for data in the *MySQL Query Response Time Details* dashboard or select a query in *PMM Query Analytics* to see the *Query time distribution* bar.

**Percona XtraDB Cluster**

Open the [*PXC/Galera Cluster Summary* dashboard][DASH_PXCGALERACLUSTER].


!!! seealso "See also"
	- [Percona Server for MySQL -- Slow Query Log Extended][ps_slow_query_ext]
	- [Percona Server for MySQL -- User Statistics][ps_userstats]
	- [MariaDB -- Slow Query Log Overview][mariadb_slow_query_log]
	- [MariaDB -- Slow Query Log Extended Statistics][mariadb_slow_query_ext]
	- [MariaDB -- User Statistics][mariadb_userstats]
	- [Percona Blog -- PERFORMANCE_SCHEMA vs Slow Query Log][BLOG_PS_VS_SLOW]
	- [Percona Blog -- MySQL's INNODB_METRICS table][BLOG_INNODB_METRICS]
	- [Percona Blog -- Rotating MySQL Slow Logs Safely][BLOG_LOG_ROTATION]
	- [Percona Blog -- Impact of logging on MySQL's performance][BLOG_LOGGING]


[DASH_MYSQLUSERDETAILS]: ../../details/dashboards/dashboard-mysql-user-details.md
[DASH_PXCGALERACLUSTER]: ../../details/dashboards/dashboard-pxc-galera-cluster-summary.md
[LOGROTATE]: https://linux.die.net/man/8/logrotate
<!-- Blog -->
[BLOG_INNODB_METRICS]: https://www.percona.com/blog/2014/11/18/mysqls-innodb_metrics-table-how-much-is-the-overhead/
[BLOG_LOGGING]: https://www.percona.com/blog/2009/02/10/impact-of-logging-on-mysql%E2%80%99s-performance/
[BLOG_LOG_ROTATION]: https://www.percona.com/blog/2013/04/18/rotating-mysql-slow-logs-safely/
[BLOG_PS_VS_SLOW]: https://www.percona.com/blog/2014/02/11/performance_schema-vs-slow-query-log/
<!-- Percona Server for MySQL -->
[PS_FEATURES_REMOVED]: https://www.percona.com/doc/percona-server/LATEST/changed_in_version.html
[ps_slow_query_ext]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html
[ps_query_response_time_stats]: https://www.percona.com/doc/percona-server/5.7/diagnostics/response_time_distribution.html#usage
[ps_userstats]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/user_stats.html
<!-- MariaDB -->
[mariadb_slow_query_log]: https://mariadb.com/kb/en/slow-query-log-overview/
[mariadb_slow_query_ext]: https://mariadb.com/kb/en/slow-query-log-extended-statistics/
[mariadb_query_response_time]: https://mariadb.com/kb/en/query-response-time-plugin/
[mariadb_perfschema_instr_table]: https://mariadb.com/kb/en/performance-schema-setup_instruments-table/
[mariadb_userstats]: https://mariadb.com/kb/en/user-statistics/
<!-- MySQL -->
[log_slow_rate_limit]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html#log_slow_rate_limit
[log_slow_rate_type]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html#log_slow_rate_type
[log_slow_verbosity]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html#log_slow_verbosity
[slow_query_log_always_write_time]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html#slow_query_log_always_write_time
[slow_query_log_use_global_control]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html#slow_query_log_use_global_control
[sysvar_innodb_monitor_enable]: https://dev.mysql.com/doc/refman/5.7/en/innodb-parameters.html#sysvar_innodb_monitor_enable
[sysvar_log_output]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_log_output
[sysvar_log_slow_admin_statements]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_log_slow_admin_statements
[sysvar_log_slow_slave_statements]: https://dev.mysql.com/doc/refman/8.0/en/replication-options-replica.html#sysvar_log_slow_slave_statements
[sysvar_long_query_time]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_long_query_time
[sysvar_slow_query_log]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_slow_query_log
[sysvar_performance_schema]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-system-variables.html#sysvar_performance_schema
[performance-schema-statement-tables]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-statement-tables.html
[performance-schema-startup-configuration]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-startup-configuration.html
[perfschema-instrument]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-options.html#option_mysqld_performance-schema-instrument
[perfschema-consumer-statements-digest]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-options.html#option_mysqld_performance-schema-consumer-statements-digest
