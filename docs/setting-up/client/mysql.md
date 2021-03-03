# MySQL and derivatives

PMM Client collects metrics from MySQL, Percona Server for MySQL, Percona XtraDB Cluster, and MariaDB. (Amazon RDS is also supported and explained in a [separate section](aws.md).)

To set up PMM Client for MySQL and derivatives, you must:

- [choose and configure a source](#1-choose-and-configure-a-source), (*slow query log* or *Performance Schema*);

- (Optional for Percona Server, MariaDB) [configure user statistics](#configure-user-statistics);

- [create a database user account for PMM;](#create-a-database-user-account-for-pmm)

- [add service:](#add-service)
	- Either [on the command line](#command-line),
	- or [with the user interface](#user-interface).


```plantuml source="_resources/diagrams/Setting-Up_Client_MySQL.puml"
```

## 1. Choose and configure a source

You must decide which source of metrics to use, and configure your database server for it.

The choices are:

- [Slow query log](#slow-query-log)
- [Performance Schema](#performance-schema)

Although you can use both we recommend choosing one; there is some overlap in the data reported, and each incurs a small performance overhead.

Your choice depends on the version and variant of your MySQL instance, and how much detail you want to see.

**Comparing *Slow query log* and *Performance Schema* metrics sources**

| Slow query log                                                                                | Performance Schema
|-----------------------------------------------------------------------------------------------|-----------------------------------------
| **{{icon.pluscircle}} Advantages**                                                            | **{{icon.pluscircle}} Advantages**
| More detail.                                                                                  | Faster parsing.
| Lower resource impact (with query sampling feature in Percona Server for MySQL).              | Enabled by default on later versions of MySQL.
| **{{icon.minuscircle}} Disadvantages**                                                        | **{{icon.minuscircle}} Disadvantages**
| PMM Client must be on the same host as the database server or have access the slow query log. | Less detail.
| Log files must be managed.                                                                    |

**Recommendations**

| Database server          | Versions       | Recommended source | Is default
| ------------------------ | -------------- | ------------------ | -----------
| MySQL                    | 5.1-5.5        | Slow query log     |
| MySQL                    | 5.6+           | Performance Schema | From 5.6.6
| MariaDB                  | 10.0+          | Performance Schema | No
| Percona Server for MySQL | 5.7, 8.0       | Performance Schema |
| Percona XtraDB Cluster   | 5.6, 5.7, 8.0  | Slow query log     |

### 1.1. Configure *slow query log*

The *slow query log* is a log file with the details of queries that take more than a certain amount of time to complete.

PMM Client parses this file and sends aggregated data to PMM Server via the Query Analytics part of PMM Agent.

**Applies to: MySQL 5.1 to 5.5, MariaDB 5.5, Percona Server for MySQL, Percona XtraDB Cluster**

You must set these values for your database server. If you set them in the server's configuration file (e.g., `/etc/mysql/conf.d/mysql.cnf` for MySQL) the settings are permanent but you must restart the server to activate them. If you set them in an SQL session, they are active until the server restarts.

<style>
table th:first-of-type {
    width: 40%;
}
table th:nth-of-type(2) {
    width: 10%;
}
table th:nth-of-type(3) {
    width: 50%;
}
</style>

| Variable                                                        | Value |Description
|-----------------------------------------------------------------|:-----:|----------------------------------------------------------
| [`slow_query_log`][sysvar_slow_query_log]                       | ON    | Enables the slow query log.
| [`long_query_time`][sysvar_long_query_time]                     | 0     | The slow query threshold in seconds (definition of *slow*). In heavily-loaded applications, frequent fast queries can have a greater performance impact than infrequent slow ones. Setting this value to `0` ensures all queries are captured.
| [`log_output`][sysvar_log_output]                               | file  | Ensures the log is sent to a file.
| [`log_slow_admin_statements`][sysvar_log_slow_admin_statements] | ON    | Includes the logging of slow administrative statements.
| [`log_slow_slave_statements`][sysvar_log_slow_slave_statements] | ON    | Enables logging for queries that have taken more than `long_query_time` seconds to execute on the replica.

**Examples**

*Configuration file*

```ini
[mysqld]
# ...
slow_query_log = ON
long_query_time = 0
log_output = file
log_slow_admin_statements = ON
log_slow_slave_statements = ON
```

*Session*

```sql
SET GLOBAL slow_query_log = 1;
SET GLOBAL long_query_time = 0;
SET GLOBAL log_output = file;
SET GLOBAL log_slow_admin_statements = 1;
SET GLOBAL log_slow_slave_statements = 1;
```

**Applies to: Percona Server for MySQL**

Not all dashboards are available by default for all MySQL variants and configurations. Some graphs require Percona Server for MySQL, and specialized plugins, or extra configuration.

| Variable                                                                 | Value | Description
|--------------------------------------------------------------------------|:-----:|-----------------------------------------------------------------------------------
| [`log_slow_rate_limit`][log_slow_rate_limit]                             | 100   | Defines the rate of queries captured by the *slow query log*. A good rule of thumb is 100 queries logged per second. For example, if your Percona Server instance processes 10,000 queries per second, you should set `log_slow_rate_limit` to `100` and capture every 100th query for the *slow query log*. Depending on the amount of traffic, logging could become aggressive and resource consuming. This variable throttles the level of intensity of the data capture without compromising information.
| [`log_slow_rate_type`][log_slow_rate_type]                               |'query'| Set so that it applies to queries, rather than sessions.
| [`slow_query_log_always_write_time`][slow_query_log_always_write_time]   | 1     | Specifies which queries should ignore sampling. With query sampling this ensures that queries with longer execution time will always be captured by the slow query log, avoiding the possibility that infrequent slow queries might not get captured at all.
| [`log_slow_verbosity`][log_slow_verbosity]                               |'full' | Ensures that all information about each captured query is stored in the slow query log.
| [`slow_query_log_use_global_control`][slow_query_log_use_global_control] |'all'  | Configure the slow query log during runtime and apply these settings to existing connections. (By default, slow query log settings apply only to new sessions.)

**Examples**

*Configuration file*

```ini
log_slow_rate_limit = 100
log_slow_rate_type = 'query'
slow_query_log_always_write_time = 1 // From v5.6.13
log_slow_verbosity = 'full'
slow_query_log_use_global_control = 'all'
```

*Session*

```sql
TODO
```


### Configure query response time

**Applies to: Percona Server for MySQL 5.7 (removed from [8.0][PS_REMOVED_FEATURES]), MySQL 5.7, MariaDB 10.0.4.**

| Variable                                                                 | Value | Description
|--------------------------------------------------------------------------|:-----:|-----------------------------------------------------------------------------------
| [`query_response_time_stats`][query_response_time_stats]                 | ON    | Report *query response time distributions*. (Requires plugin installation. See below.)

For query response time distributions:

*Configuration file*

```ini
query_response_time_stats = ON
```

*Session ([MariaDB 10.3][mariadb_query_response_time])*

1. Check that `/usr/lib/mysql/plugin/query_response_time.so` exists.

2. Install the plugins and activate.

	```sql
	INSTALL PLUGIN QUERY_RESPONSE_TIME_AUDIT SONAME 'query_response_time.so';
	INSTALL PLUGIN QUERY_RESPONSE_TIME SONAME 'query_response_time.so';
	SET GLOBAL query_response_time_stats = ON;
	```



<!--
Server option --query-response-time
-->







```
INSTALL PLUGIN QUERY_RESPONSE_TIME_READ SONAME 'query_response_time.so';
INSTALL PLUGIN QUERY_RESPONSE_TIME_WRITE SONAME 'query_response_time.so';
```

Some table metrics are automatically disabled when the number of tables exceeds a default limit of 1000 tables.

This prevents PMM Client from affecting the performance of your database server.

The limit can be changed on the command line with the two `pmm-admin` options:

<style>
table th:first-of-type {
    width: 40%;
}
table th:nth-of-type(2) {
    width: 60%;
}
</style>

| `pmm-admin` option             | Description
|--------------------------------|--------------------------------------------------------------------------
| `--disable-tablestats`         | Disables tablestats collection when the default limit is reached.
| `--disable-tablestats-limit=N` | Sets the number of tables (`N`) for which tablestats collection is disabled. 0 means no limit. A negative number means tablestats is completely disabled (for any number of tables).


### 1.2. Configure log rotation

Slow query log files can grow quickly and must be managed.

Use the `--size-slow-logs` option to `pmm-admin` to set at what size (in bytes) the slow query log file is closed, renamed, and a new one started.

When the limit is reached, PMM Client will:

- remove the previous `.old` slow log file,
- rename the current file by adding the suffix `.old`,
- execute the MySQL command `FLUSH LOGS`.

Only one `.old` file is kept. Older files are deleted.

### 1.3. Performance Schema

PMM's *MySQL Performance Schema Details* dashboard charts the various `performance_schema` metrics.

<style>
table th:first-of-type {
    width: 40%;
}
table th:nth-of-type(2) {
    width: 10%;
}
table th:nth-of-type(3) {
    width: 50%;
}
</style>

| Variable                                                | Value | Description
|---------------------------------------------------------|:-----:|---------------------------------------------------------------------------------
| [`performance_schema`][sysvar_performance_schema]       | ON    | Enables *Performance Schema* metrics. This is the default in MySQL 5.6.6 and higher.
| [`innodb_monitor_enable`][sysvar_innodb_monitor_enable] | all   | Enables InnoDB metrics counters.

**Examples**

*Configuration file*

```ini
[mysqld]
performance_schema = ON
innodb_monitor_enable = all
```

*Session*

```sql
SET GLOBAL performance_schema = 1;
SET GLOBAL innodb_monitor_enable = all;
```


<!-- ?? -->
If you are running a custom Performance Schema configuration, make sure that the `statements_digest` consumer is enabled.

Example

```sql
SELECT * FROM performance_schema.setup_consumers;
```

```
+----------------------------------+---------+
| NAME                             | ENABLED |
+----------------------------------+---------+
| events_stages_current            | NO      |
| events_stages_history            | NO      |
| events_stages_history_long       | NO      |
| events_statements_current        | YES     |
| events_statements_history        | YES     |
| events_statements_history_long   | NO      |
| events_transactions_current      | NO      |
| events_transactions_history      | NO      |
| events_transactions_history_long | NO      |
| events_waits_current             | NO      |
| events_waits_history             | NO      |
| events_waits_history_long        | NO      |
| global_instrumentation           | YES     |
| thread_instrumentation           | YES     |
| statements_digest                | YES     |
+----------------------------------+---------+
15 rows in set (0.00 sec)
```

!!! alert alert-info "Note"

    If certain instruments are not enabled, you will not see the corresponding graphs in the MySQL Performance Schema dashboard.  To enable full instrumentation, set the option `--performance_schema_instrument` to `'%=on'` when starting the MySQL server:

    ```sh
    mysqld --performance-schema-instrument='%=on'
    ```

If you are running any MariaDB version, there is no Explain or Example data shown by default in Query Analytics. A workaround is to run this SQL command:

```sql
UPDATE performance_schema.setup_instruments SET ENABLED = 'YES', TIMED = 'YES'
WHERE NAME LIKE 'statement/%';
UPDATE performance_schema.setup_consumers SET ENABLED = 'YES'
WHERE NAME LIKE '%statements%';
```

This option can cause additional overhead and should be used with care.



### 1.4. Configure Query Analytics

If the instance is already running, configure the Query Analytics agent to collect data from *Performance Schema*:

1. Open the *PMM Query Analytics* dashboard.
2. Click the *Settings* button.
3. Open the *Settings* section.
4. Select `Performance Schema` in the *Collect from* drop-down list.
5. Click *Apply* to save changes.

When adding a monitoring instance with `pmm-admin`, use the `--query-source='perfschema'` option. For example:

```sh
pmm-admin add mysql --username=pmm --password=pmmpassword --query-source='perfschema' ps-mysql 127.0.0.1:3306
```




### 1.5. Configure user statistics

**Applies to: Percona Server for MySQL, MariaDB 5.2.0+**

Enable user statistics to see user activity, individual table and index access details on the [MySQL User Details][MYSQLUSERDETAILS] dashboard.

**Examples**

*Configuration file*

```ini
[mysqld]
userstat = ON
```

*Session*

```sql
SET GLOBAL userstat = ON;
```

### 1.6. Create a database user account for PMM

(Recommended) *Connect PMM Client to the database instance with a non-superuser account.*

**Example**

Create a database user `pmm` with password `pass`.

```sql
CREATE USER 'pmm'@'localhost' IDENTIFIED BY 'pass' WITH MAX_USER_CONNECTIONS 10;
GRANT SELECT, PROCESS, SUPER, REPLICATION CLIENT, RELOAD ON *.* TO 'pmm'@'localhost';
```

Add an instance using this user.

```sh
pmm-admin add mysql --username pmm --password pass ...
```

## 2. Add service

You can add a MySQL service with the user interface or on the command line.

### 2.1. User interface

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

### 2.2. Command line

**Examples**

1. Default query source (`slowlog`), service name (`{node}-mysql`), and service address/port (`127.0.0.1:3306`).

	```sh
	sudo pmm-admin add mysql --username=pmm --password=pass
	```

2. Slow query log source and log size limit (`1048576` bytes), service name (`MYSQL_NODE`) and service address/port (`191.168.1.123:3306`).

	```sh
	sudo pmm-admin add mysql --query-source=slowlog --size-slow-logs=1048576 --username=pmm --password=pass MYSQL_NODE 192.168.1.123:3306
	```

3. Performance schema query source, service name (`MYSQL_NODE`) and default service address/port (`127.0.0.1:3306`)

	```sh
	sudo pmm-admin add mysql --query-source=perfschema --username=pmm --password=pass MYSQL_NODE
	```

4. Performance schema query source, service name (`MYSQL_NODE`) and default service address/port (`127.0.0.1:3306`) specified with flags.

	```sh
	sudo pmm-admin add mysql --query-source=perfschema --username=pmm --password=pass --service-name=MYSQL_NODE --host=127.0.0.1 --port=3306
	```

5. Default query source (`slowlog`), service name (`{node}-mysql`), connect via socket.

	```sh
	sudo pmm-admin add mysql --username=pmm --password=pass --socket=/var/run/mysqld/mysqld.sock
	```


## 3. Check

1. In the PMM web interface, navigate to *PMM --> PMM Inventory*.
2. Check the added node, agent or service is listed in the appropriate tab.

!!! seealso "See also"
	- [Percona Server for MySQL - Slow Query Log][SLOWQUERYLOG]
	- [Percona Server for MySQL - User Statistics][USERSTATS]
	- [MariaDB - User Statistics][MARIADBUSERSTATS]
	- [Percona Blog - PERFORMANCE_SCHEMA vs Slow Query Log][BLOG_PS_VS_SLOW]
	- [Percona Blog - MySQL's INNODB_METRICS table][BLOG_INNODB_METRICS]
	- [Percona Blog - Rotating MySQL Slow Logs Safely][BLOG_LOG_ROTATION]
	- [Percona Blog - Impact of logging on MySQL's performance][BLOG_LOGGING]

[USERSTATS]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/user_stats.html
[MARIADBUSERSTATS]: https://mariadb.com/kb/en/user-statistics/
[SLOWQUERYLOG]: https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html
[MYSQLUSERDETAILS]: ../../details/dashboards/dashboard-mysql-user-details.md
[BLOG_INNODB_METRICS]: https://www.percona.com/blog/2014/11/18/mysqls-innodb_metrics-table-how-much-is-the-overhead/
[BLOG_LOGGING]: https://www.percona.com/blog/2009/02/10/impact-of-logging-on-mysql%E2%80%99s-performance/
[BLOG_LOG_ROTATION]: https://www.percona.com/blog/2013/04/18/rotating-mysql-slow-logs-safely/
[BLOG_PS_VS_SLOW]: https://www.percona.com/blog/2014/02/11/performance_schema-vs-slow-query-log/

[PS_FEATURES_REMOVED]: https://www.percona.com/doc/percona-server/LATEST/changed_in_version.html

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
[sysvar_performance_schema]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-system-variables.html#sysvar_performance_schema
[sysvar_slow_query_log]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_slow_query_log

[query_response_time_stats]: https://www.percona.com/doc/percona-server/5.7/diagnostics/response_time_distribution.html#usage
[mariadb_query_response_time]: https://mariadb.com/kb/en/query-response-time-plugin/
