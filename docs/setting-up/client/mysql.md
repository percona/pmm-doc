# MySQL, Percona Server

PMM Client collects metrics from MySQL and derivatives such as Percona Server for MySQL, MariaDB, and [Amazon RDS](aws.md) with one of two methods:

- *slow query log*:

Provides the most detail but can impact performance on heavily-loaded systems.
On Percona Server the query sampling feature may reduce the performance impact.
Recommended for use on older MySQL versions (prior to 5.6), which have neither sampling nor *Performance Schema*.

- *Performance Schema*: generally a better choice for recent versions of other MySQL variants.

Which one you use depends on the version and variant of your MySQL instance.







<!--


However, there are certain recommended settings that help maximize monitoring efficiency.

These recommendations depend on the variant and version of MySQL you are using, and mostly apply to very high loads.

MySQL with too many tables can lead to PMM Server overload due to the streaming of too much time series data. It can also lead to too many queries from `mysqld_exporter` causing extra load on MySQL. Therefore PMM Server disables most consuming `mysqld_exporter` collectors automatically if there are more than 1000 tables.

-->




<!----------------------------------------------------------------------------------------------------------------------------------->

## Slow query log

| Advantages           | Disadvantages
| -------------------- | --------------
| Detailed information | Can affect the quality of monitoring data gathered by Query Analytics
| Low resource usage   |

### Configuration

**Applies to: MySQL 5.1 to 5.5, MariaDB 5.5, Percona Server for MySQL, XtraDB Cluster**

You must set these values for your database server, either in the server's configuration file (e.g., `/etc/mysql/conf.d/mysql.cnf` for MySQL) and restarting to make them permanent, or set them in an SQL session.

- [`slow_query_log=ON`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_slow_query_log) enables the slow query log.
- [`log_output=file`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_log_output) ensures the log is sent to a file.
- [`long_query_time=0`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_long_query_time) is the slow query threshold in seconds (the definition of *slow*). In heavily-loaded applications, frequent fast queries can have a bigger impact on performance than rare slow queries. Setting this value to `0` means all queries are captured.
- [`log_slow_admin_statements=ON`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_log_slow_admin_statements) includes the logging of administrative statements.
- [`log_slow_slave_statements=ON`]()

Example (configuration file)

```ini
[mysql]
slow_query_log=ON
log_output=file
long_query_time=0
log_slow_admin_statements=ON
log_slow_slave_statements=ON
```

Example (session)

```sql
SET GLOBAL slow_query_log=1;
SET GLOBAL log_output=file
SET GLOBAL long_query_time=0;
SET GLOBAL log_slow_admin_statements=1;
SET GLOBAL log_slow_slave_statements=1;
```

**Applies to: Percona Server for MySQL**

Not all dashboards are available by default for all MySQL variants and configurations. Some graphs require Percona Server for MySQL, and specialized plugins, or extra configuration.

- [`log_slow_rate_limit=100`](https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html#log_slow_rate_limit). : cdefines the fraction of queries captured by the *slow query log*.  A good rule of thumb is 100 queries logged per second.  For example, if your Percona Server instance processes 10,000 queries per second, you should set `log_slow_rate_limit` to `100` and capture every 100th query for the *slow query log*. Depending on the amount of traffic, logging could become aggressive and resource consuming. This variable throttles the level of intensity of the data capture without compromising information.

- [`log_slow_rate_type=query`]() Set so that it applies to queries, rather than sessions.

- [`slow_query_log_always_write_time=1`]() specifies which queries should ignore sampling. With query sampling this ensures that queries with longer execution time will always be captured by the slow query log, avoiding the possibility that rare slow queries might not get captured at all.

- `log_slow_verbosity=full` to ensure that all information about each captured query is stored in the slow query log.

- `slow_query_log_use_global_control=all` to configure the slow query log during runtime and apply these settings to existing connections. (By default, slow query log settings apply only to new sessions.)

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

**Applies to: Percona Server for MySQL, MariaDB**

- `userstat=1` enables *User statistics*, information about user activity, individual table and index access.

	!!! alert alert-warning "Caution"
		In some cases, collecting user statistics can load system resources.




### Slow log file rotation

Set the `--size-slow-logs` variable with [pmm-admin](../../details/commands/pmm-admin.md)
to automatically manage
log file rotation and removal.

When the limit is reached, PMM will remove the previous old slow log file, rename the current file with the suffix `.old`, and execute the MySQL command `FLUSH LOGS`.
It will only keep one old file.
Older files will be deleted on the next iteration.



















<!-- -------------------------------------------------- -->

## Performance Schema

**Applies to: MySQL 5.6+ (enabled by default in MySQL 5.6.6), Percona Server for MySQL 5.6+, MariaDB 10.0+ (disabled by default)**

| Advantages           | Disadvantages
| -------------------- | --------------
| Faster parsing       | Less detailed than *slow query log*

### Configuration

- [`performance_schema=ON`](https://dev.mysql.com/doc/refman/5.7/en/performance-schema-system-variables.html#sysvar_performance_schema) enables *Performance Schema*.

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







## MySQL user account

When adding a MySQL instance to monitoring, you can specify the MySQL
server superuser account credentials.  However, monitoring with the superuser
account is not advised. It’s better to create a user with only the necessary
privileges for collecting data.

As an example, the user `pmm` can be created manually with the necessary
privileges and pass its credentials when adding the instance.

To enable complete MySQL instance monitoring, a command similar to the
following is recommended:

```sh
sudo pmm-admin add mysql --username pmm --password <password>
```

Of course this user should have necessary privileges for collecting data. If
the `pmm` user already exists, you can grant the required privileges as
follows:

```sql
CREATE USER 'pmm'@'localhost' IDENTIFIED BY 'pass' WITH MAX_USER_CONNECTIONS 10;
GRANT SELECT, PROCESS, SUPER, REPLICATION CLIENT, RELOAD ON *.* TO 'pmm'@'localhost';
```




## Adding MySQL Service Monitoring

You add MySQL services (Metrics and Query Analytics) with the following command:

### USAGE

```sh
pmm-admin add mysql --query-source=slowlog --username=pmm --password=pmm
```

where username and password are credentials for the monitored MySQL access, which will be used locally on the database host. Additionally, two positional arguments can be appended to the command line flags: a service name to be used by PMM, and a service address. If not specified, they are substituted automatically as `<node>-mysql` and `127.0.0.1:3306`.

The command line and the output of this command may look as follows:

```sh
pmm-admin add mysql --query-source=slowlog --username=pmm --password=pmm sl-mysql 127.0.0.1:3306
```

```
MySQL Service added.
Service ID  : /service_id/a89191d4-7d75-44a9-b37f-a528e2c4550f
Service name: sl-mysql
```

!!! alert alert-info "Note"

    There are two possible sources for query metrics provided by MySQL to get data for the Query Analytics: the [slow log](#slow-log-settings) and the [Performance Schema](#performance-schema).

    The `--query-source` option can be used to specify it, either as `slowlog` (it is also used by default if nothing specified) or as `perfschema`:

    ```sh
    pmm-admin add mysql --username=pmm --password=pmm --query-source=perfschema ps-mysql 127.0.0.1:3306
    ```

Beside positional arguments shown above you can specify service name and service address with the following flags: `--service-name`, `--host` (the hostname or IP address of the service), and `--port` (the port number of the service). If both flag and positional argument are present, flag gains higher priority. Here is the previous example modified to use these flags:

```sh
pmm-admin add mysql --username=pmm --password=pmm --service-name=ps-mysql --host=127.0.0.1 --port=3306
```

!!! alert alert-info "Note"

    It is also possible to add MySQL instance using UNIX socket with use of a special `--socket` flag followed with the path to a socket without username, password and network type:

    ```sh
    pmm-admin add mysql --socket=/var/path/to/mysql/socket
    ```

After adding the service you can view MySQL metrics or examine the added node on the new PMM Inventory Dashboard.




!!! seealso "See also"
	- [Percona Server for MySQL - Slow Query Log](https://www.percona.com/doc/percona-server/LATEST/diagnostics/slow_extended.html)
	- [Percona Blog - PERFORMANCE_SCHEMA vs Slow Query Log](https://www.percona.com/blog/2014/02/11/performance_schema-vs-slow-query-log/)
	- [Percona Blog - MySQL's INNODB_METRICS table](https://www.percona.com/blog/2014/11/18/mysqls-innodb_metrics-table-how-much-is-the-overhead/)
