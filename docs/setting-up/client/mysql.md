# MySQL and derivatives

PMM Client collects metrics from MySQL and MySQL derivatives such as Percona Server for MySQL, Percona XtraDB Cluster, and MariaDB. (Amazon RDS is also supported and explained in a [separate section](aws.md).)

To set up PMM Client for MySQL and derivatives, you must:

- [choose and configure a source](#choose-and-configure-a-source), (*slow query log* or *Performance Schema*);

- (Optional for Percona Server, MariaDB) [configure user statistics](#configure-user-statistics);

- create a database user account for PMM;

- add a service with pmm-admin;

```plantuml source="_resources/diagrams/Setting-Up_Client_MySQL.puml"
```

## Choose and configure a source

Metrics come from two sources:

- [Slow query log](#slow-query-log)
- [Performance Schema](#performance-schema)

Although you can use both we recommend choosing one; there is some overlap in the data reported, and each incurs a small performance overhead.

Your choice depends on the version and variant of your MySQL instance, and how much detail you want to see.

### Comparing Slow query log and Performance Schema

| Slow query log                                                                                                                | Performance Schema
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------
| **{{icon.pluscircle}} Advantages**                                                                                            | **{{icon.pluscircle}} Advantages**
| Highly detailed information.                                                                                                  | Faster parsing.
| Low resource impact. (Percona Server for MySQL has a query sampling feature that can lower the performance impact.)           | Enabled by default on later versions of MySQL.
| **{{icon.minuscircle}} Disadvantages**                                                                                        | **{{icon.minuscircle}} Disadvantages**
| Can only be used where PMM Client is running on the same host as the database server or can access the slow query log file.   | Less details.
| Large log files must be carefully managed.                                                                                    |

### Recommendations

| Database server          | Versions       | Recommended source | Is default
| ------------------------ | -------------- | ------------------ | -----------
| MariaDB                  | 10.0+          | Performance Schema | No
| Percona XtraDB Cluster   | 5.6, 5.7, 8.0  | Slow query log     |
| Percona Server for MySQL | 5.7, 8.0       | Performance Schema |
| MySQL                    | 5.1-5.5        | Slow query log     |
| MySQL                    | 5.6+           | Performance Schema | From 5.6.6







<!--
MySQL with too many tables can lead to PMM Server overload due to the streaming of too much time series data. It can also lead to too many queries from `mysqld_exporter` causing extra load on MySQL. Therefore PMM Server disables most consuming `mysqld_exporter` collectors automatically if there are more than 1000 tables.
-->

### Slow query log

The *slow query log* feature records queries to a log file that take longer than a certain time to run.

PMM Client parses this file and sends aggregated data to PMM Server via the Query Analytics part of PMM Agent.


<!-- - Can affect the quality of monitoring data gathered by Query Analytics -->

#### Configuration

**Applies to: MySQL 5.1 to 5.5, MariaDB 5.5, Percona Server for MySQL, Percona XtraDB Cluster**

You must set these values for your database server, either in the server's configuration file (e.g., `/etc/mysql/conf.d/mysql.cnf` for MySQL) and restarting to make them permanent, or set them in an SQL session.

- [`slow_query_log`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_slow_query_log) enables the slow query log.

- [`log_output`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_log_output) ensures the log is sent to a file.

- [`long_query_time`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_long_query_time) is the slow query threshold in seconds (the definition of *slow*). In heavily-loaded applications, frequent fast queries can have a bigger impact on performance than rare slow queries. Setting this value to `0` means all queries are captured.

- [`log_slow_admin_statements`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_log_slow_admin_statements) includes the logging of administrative statements.

- [`log_slow_slave_statements`]()

**Examples**

*Configuration file*

```ini
[mysqld]
# ...
slow_query_log=ON
long_query_time=0
log_output=file
log_slow_admin_statements=ON
log_slow_slave_statements=ON
```

*Session*

```sql
SET GLOBAL slow_query_log=1;
SET GLOBAL long_query_time=0;
SET GLOBAL log_output=file;
SET GLOBAL log_slow_admin_statements=1;
SET GLOBAL log_slow_slave_statements=1;
```

**Applies to: Percona Server for MySQL**

Not all dashboards are available by default for all MySQL variants and configurations. Some graphs require Percona Server for MySQL, and specialized plugins, or extra configuration.

- [`log_slow_rate_limit`](https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html#log_slow_rate_limit): defines the fraction of queries captured by the *slow query log*.  A good rule of thumb is 100 queries logged per second.  For example, if your Percona Server instance processes 10,000 queries per second, you should set `log_slow_rate_limit` to `100` and capture every 100th query for the *slow query log*. Depending on the amount of traffic, logging could become aggressive and resource consuming. This variable throttles the level of intensity of the data capture without compromising information.

- [`log_slow_rate_type`]() Set so that it applies to queries, rather than sessions.

- [`slow_query_log_always_write_time`]() specifies which queries should ignore sampling. With query sampling this ensures that queries with longer execution time will always be captured by the slow query log, avoiding the possibility that rare slow queries might not get captured at all.

- `log_slow_verbosity` to ensure that all information about each captured query is stored in the slow query log.

- `slow_query_log_use_global_control` to configure the slow query log during runtime and apply these settings to existing connections. (By default, slow query log settings apply only to new sessions.)




```ini
log_slow_rate_limit=100
log_slow_rate_type='query'
slow_query_log_always_write_time=1 // v5.6.13
log_slow_verbosity='full'
slow_query_log_use_global_control='all'
```








- `query_response_time_stats=ON`: Percona Server for MySQL can report *query response time distributions*. To enable:

	```sql
	INSTALL PLUGIN QUERY_RESPONSE_TIME_AUDIT SONAME 'query_response_time.so';
	INSTALL PLUGIN QUERY_RESPONSE_TIME SONAME 'query_response_time.so';
	INSTALL PLUGIN QUERY_RESPONSE_TIME_READ SONAME 'query_response_time.so';
	INSTALL PLUGIN QUERY_RESPONSE_TIME_WRITE SONAME 'query_response_time.so';
	SET GLOBAL query_response_time_stats=ON;
	```






 ```ini
 innodb_monitor_enable=all
 ```





#### Slow log file rotation

Set the `--size-slow-logs` variable with [pmm-admin](../../details/commands/pmm-admin.md)
to automatically manage
log file rotation and removal.

When the limit is reached, PMM will remove the previous old slow log file, rename the current file with the suffix `.old`, and execute the MySQL command `FLUSH LOGS`.
It will only keep one old file.
Older files will be deleted on the next iteration.




















### Performance Schema

PMM's *MySQL Performance Schema Details* dashboard charts the various `performance_schema` metrics.




#### Configuration

- [`performance_schema=ON`](https://dev.mysql.com/doc/refman/5.7/en/performance-schema-system-variables.html#sysvar_performance_schema) enables *Performance Schema* metrics. This is the default in MySQL 5.6.6 and higher.

- [`innodb_monitor_enable=all`](https://dev.mysql.com/doc/refman/5.7/en/innodb-parameters.html#sysvar_innodb_monitor_enable) enables InnoDB metrics counters.

Example (configuration file)

```ini
[mysqld]
performance_schema=ON
innodb_monitor_enable=all
```

Example (session)

```sql
SET GLOBAL performance_schema=1;
SET GLOBAL innodb_monitor_enable=all;
```



If you are running a custom Performance Schema configuration, make sure that the
`statements_digest` consumer is enabled.

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



### Query Analytics

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




## Configure user statistics

**Applies to: Percona Server for MySQL, MariaDB 5.2.0+**

Enable user statistics to see user activity, individual table and index access details on the [MySQL User Details][MYSQLUSERDETAILS] dashboard.


<!-- what cases?  Warning useless without qualification
!!! alert alert-warning "Caution"
	In some cases, collecting user statistics can load system resources.
-->

Example (MySQL configuration file)

```ini
[mysqld]
userstat = ON
```

Example (session)

```sql
SET GLOBAL userstat=ON;
```


## (Recommended) Create a database user account for PMM

Connect PMM Client to the database instance with a non-superuser account.


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






## Add service



**Examples**

1. Default query source (`slowlog`), service name (`{node}-mysql`), and service address/port (`127.0.0.1:3306`).

	```sh
	pmm-admin add mysql --username=pmm --password=pass
	```

2. Slow query log source and log size limit (`1048576` bytes), service name (`MYSQL_NODE`) and service address/port (`191.168.1.123:3306`).

	```sh
	pmm-admin add mysql --query-source=slowlog --size-slow-logs=1048576 --username=pmm --password=pass MYSQL_NODE 192.168.1.123:3306
	```

3. Performance schema query source, service name (`MYSQL_NODE`) and default service address/port (`127.0.0.1:3306`)

	```sh
	pmm-admin add mysql --query-source=perfschema --username=pmm --password=pass MYSQL_NODE
	```

4. Performance schema query source, service name (`MYSQL_NODE`) and default service address/port (`127.0.0.1:3306`) specified with flags.

	```sh
	pmm-admin add mysql --query-source=perfschema --username=pmm --password=pass --service-name=MYSQL_NODE --host=127.0.0.1 --port=3306
	```

5. Default query source (`slowlog`), service name (`{node}-mysql`), connect via socket.

	```sh
	pmm-admin add mysql --username=pmm --password=pass --socket=/var/run/mysqld/mysqld.sock
	```

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
