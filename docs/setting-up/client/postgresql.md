# PostgreSQL

PMM Client collects metrics from [PostgreSQL][POSTGRESQL] and [Percona Distribution for PostgreSQL][PERCONA_POSTGRESQL] databases.

This page shows how to set up PMM to monitor a PostgreSQL database instance. (Read it completely before starting work.)

Here is an overview of the steps involved.

```plantuml source="_resources/diagrams/Setting-Up_Client_PostgreSQL.puml"
```

## Before you start

Check that:

- [PMM Server is installed](../server/index.md) and running with a known IP address accessible from the client node.
- [PMM Client is installed](index.md) and the [node is registered with PMM Server](index.md#register).
- You have superuser (root) access on the client host.
- You have superuser access to any database servers that you want to monitor.

(PMM follows [PostgreSQL's end-of-life policy][POSTGRESQL_VERSIONING]. For specific details on supported platforms and versions, see [Percona’s Software Platform Lifecycle page][PERCONA_LIFECYCLE].)

## Create a database account for PMM {: #setting-up-client-user}

We recommend creating a PMM database account that can connect to the `postgres` database with the `SUPERUSER` role.

1. Create a user (e.g. `pmm_user`):

	```sql
	CREATE USER pmm WITH SUPERUSER ENCRYPTED PASSWORD '******';
	```

	If your database runs on Amazon RDS:

	```sql
	CREATE USER pmm WITH rds_superuser ENCRYPTED PASSWORD '******';
	```

2. PMM must be able to log in locally as this user to the PostgreSQL instance. To enable this:

	1. Edit the `pg_hba.conf` file

	2. If not already enabled by an existing rule, add this line:

	```
	local   all             pmm                                md5
	```

3. Reload the configuration:

	```sql
	select pg_reload_conf();
	```

4. Check local login by opening a `psql` session.

	```sh
	psql postgres pmm
	```

## Choose and configure an extension

Decide which database extension to use, and configure your database server for it. The choices are:

1. [`pg_stat_statements`](#pg_stat_statements), the original extension created by PostgreSQL, part of the `postgresql-contrib` package available on Linux.

2. [`pg_stat_monitor`](#pg_stat_monitor) is a new extension created by Percona. It is based on and compatible with `pg_stat_statements`. `pg_stat_monitor` has all the features of `pg_stat_statements`, but adds *bucket-based data aggregation*.

We recommend choosing only one of these. **If you use both, you will get duplicate metrics.**

> <b style="color:goldenrod">Important</b> While we recommend use of the newer `pg_stat_monitor` extension, be aware it is currently in beta phase and unsupported.

Here are the benefits and drawbacks of each.

|                        | {{icon.thumbsup}} **Benefits**                                                   | {{icon.thumbsdown}} **Drawbacks**
|------------------------|----------------------------------------------------------------------------------|------------------------------------------
| `pg_stat_statements`   | Part of official `postgresql-contrib` package                                    | No aggregated statistics or histograms
| `pg_stat_monitor`      | Builds on `pg_stat_monitor` features                                             | Beta software
|                        | Bucket-based aggregation                                                         |

> **About *bucket-based data aggregation***
>
> `pg_stat_monitor` collects statistics and aggregates data in a data collection unit called a *bucket*. These are linked together to form a *bucket chain*.
>
> You can specify:
>
> - the number of buckets (the length of the chain)
> - how much space is available for all buckets
> - a time limit for each bucket's data collection (the *bucket expiry*)
>
> When a bucket's expiration time is reached, accumulated statistics are reset and data is stored in the next available bucket in > the chain.
>
> When all buckets in the chain have been used, the first bucket is reused and its contents are overwritten.
>
> If a bucket fills before its expiration time is reached, data is discarded.

### `pg_stat_statements`

**Install**

- Debian/Ubuntu

	```sh
	sudo apt-get install -y postgresql-contrib
	```

- Red Hat/CentOS

	```sh
	sudo yum install -y postgresql-contrib
	```

**Configure**

1. Add these lines to your `postgresql.conf` file:

	```sh
	shared_preload_libraries = 'pg_stat_statements'
	track_activity_query_size = 2048 # Increase tracked query string size
	pg_stat_statements.track = all   # Track all statements including nested
	track_io_timing = on             # Capture read/write stats
	```

2. Restart your PostgreSQL instance. (E.g. on Linux).

	```sh
	sudo systemctl restart postgresql
	```

3. Install the extension.

	In a `psql` session in the `postgres` database:

	```sh
	CREATE EXTENSION pg_stat_statements SCHEMA public;
	```

You can now [add the service](#add-a-service).

### `pg_stat_monitor`

`pg_stat_monitor` has been tested with:

- PostgreSQL versions 11, 12, 13.
- Percona Distribution for PostgreSQL versions 11, 12, 13.

> <b style="color:goldenrod">Important</b> `pg_stat_monitor` is currently in beta phase and unsupported.

**Install**

There are two ways to install this extension:

- For *Percona Distribution for PostgreSQL*: Using a Linux package manager.

- For *PostgreSQL* or *Percona Distribution for PostgreSQL*: [download and compile the source code](https://github.com/percona/pg_stat_monitor#installation).

**Install using a Linux package manager**

The `pg-stat-monitor` extension is included in *Percona Distribution for PostgreSQL*.

You can install *Percona Distribution for PostgreSQL* with the `percona-release` package.

> See [Installing Percona Distribution for PostgreSQL][PERCONA_POSTGRESQL_INSTALL].

**Install from source code**

> See [Installing `pg_stat_monitor` from source code][PG_STAT_MONITOR_INSTALL].

**Configure**

1. Set or change the value for `shared_preload_library`.

	- Either in your `postgresql.conf` file:

	   ```ini
	   shared_preload_libraries = 'pg_stat_monitor'
	   ```

	- Or with a `psql` session:

		```sh
		psql -c "ALTER SYSTEM SET shared_preload_libraries = pg_stat_monitor"
		```

2. Set the value

	```
	pg_stat_monitor.pgsm_normalized_query
	```

3. Restart the database server.

4. Create the extension. In a `psql` session:

	```sql
	CREATE EXTENSION pg_stat_monitor;
	```

5. Check the version.

	```sql
	SELECT pg_stat_monitor_version();
	```


> You can get a list of available settings with `SELECT * FROM pg_stat_monitor_settings;`.
>
> See [`pg_stat_monitor` GitHub repository](https://github.com/percona/pg_stat_monitor/blob/master/docs/USER_GUIDE.md#configuration) for details about available parameters.







## Add a service {: #add-service }

When you have configured your database server, you can add a PostgreSQL service with the user interface or on the command line.

### With the user interface

1. Select {{icon.cog}} *Configuration-->PMM Inventory-->Add Instance*.
2. Select *PostgreSQL -- Add a remote instance*.
3. Enter values for these fields.

	| Section                  | Field                                          | Required | Description                             | Default  | `pmm-admin` parameter
	| ------------------------ | ---------------------------------------------- | -------- | --------------------------------------- | -------- | --------------------------
	| *Main details*           |                                                |          |                                         |          |
	|                          | *Hostname*                                     | ☑️        | Hostname or IP address of the service   |          | `--address`
	|                          | *Service name*                                 |          | Service name                            |          | `--name`
	|                          | *Port*                                         |          | Port for accessing the service          | 5432     | `port` in `--address=address[:port]`
	|                          | *Username*                                     |          | PostgreSQL user name                    |          | `--username`
	|                          | *Password*                                     |          | PostgreSQL user password                |          | `--password`
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
	|                          | *Stat tracking options*                        |          |                                         |          |
	|                          | --> *Don't track*                              |          |                                         |          |
	|                          | --> *PG Stat Statements*                       |          |                                         |          |
	|                          | --> *PG Stat Monitor*                          |          |                                         |          |

4. Click *Add service*.

### On the command line

Add the database server as a service using one of these example commands. If successful, PMM Client will print `PostgreSQL Service added` with the service's ID and name. Use the `--environment` and `-custom-labels` options to set tags for the service to help identify them.

**Examples**

Add instance with default node (`<node>-postgresql`) and service name.

```sh
pmm-admin add postgresql \
--username=pmm \
--password=password \
--server-url=https://admin:admin@X.X.X.X:443 \
--server-insecure-tls
```

- `<user name>`: The
- `<password>` are the PostgreSQL user credentials.

The service name and service ID will be automatically chosen.

Add instance with specified node and service name.

```sh
pmm-admin add postgresql \
--username=pmm \
--password=password \
--server-url=https://admin:admin@X.X.X.X:443 \
--server-insecure-tls \

```

Add instance to connect with a UNIX socket.

```sh
pmm-admin add postgresql --socket=/var/run/postgresql
```

## Check the service

**Check service - PMM user interface**

1. Select {{icon.cog}} *Configuration-->PMM Inventory-->Inventory list*.
2. Look in the *Services* tab for a matching *Service Type* (PostgreSQL), *Service name*, *Addresses*, and any other details entered in the form.
3. Look in the *Agents* tab to check the desired data source is being used.

**Check service - Command line**

Look for your service in the output of this command.

```sh
pmm-admin inventory list services
```

**Check data**

1. Open the *PostgreSQL Instance Summary* dashboard.
2. Set the *Service Name* to the newly-added service.

> See also
> - [Configuring Percona Repositories with percona-release][PERCONA_RELEASE]

[POSTGRESQL]: https://www.postgresql.org/
[POSTGRESQL_VERSIONING]: https://www.postgresql.org/support/versioning/
[PERCONA_LIFECYCLE]: https://www.percona.com/services/policies/percona-software-platform-lifecycle/
[PERCONA_POSTGRESQL]: https://www.percona.com/software/postgresql-distribution
[PERCONA_RELEASE]: https://www.percona.com/doc/percona-repo-config/percona-release.html
[PERCONA_POSTGRESQL_INSTALL]: https://www.percona.com/doc/postgresql/LATEST/installing.html
[PG_STAT_MONITOR_INSTALL]: https://github.com/percona/pg_stat_monitor#installation