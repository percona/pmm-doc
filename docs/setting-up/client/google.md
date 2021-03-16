# Google Cloud Platform

PMM can monitor MySQL or PostgreSQL instances hosted on the [Google Cloud Platform][GOOGLE_CLOUD].

The connection can be direct, or indirect using [Cloud SQL Proxy][GOOGLE_CLOUD_SQL_PROXY].


## Mysql

1. [Set up a MySQL instance on Google Cloud][GOOGLE_CLOUD_MYSQL]

2. Configure network

3. Configure *Performance Schema*.

	```sh
	gcloud sql instances patch <instance_name> --database-flags performance_schema=on
	```

4. Add service: *PMM --> PMM Add Instance*

5. Click *Add service*

<!--
pmm-admin add ?
-->

## PostgreSQL

1. [Set up a PostgreSQL instance on Google Cloud][GOOGLE_CLOUD_POSTGRESQL]

2. Configure network

3. Configure `pg_stat_statements`:

	```sql
	CREATE EXTENSION pg_stat_statements;
	```

<!--
Why not pg_stat_monitor?
-->


4. Add service: *PMM --> PMM Add Instance*

5. For *Stat tracking options*, select *PG Stat Statements*.

6. Click *Add service*


[GOOGLE_CLOUD_SQL]: https://cloud.google.com/sql
[GOOGLE_CLOUD]: https://cloud.google.com/
[GOOGLE_CLOUD_MYSQL]: https://cloud.google.com/sql/docs/mysql/quickstart
[GOOGLE_CLOUD_POSTGRESQL]: https://cloud.google.com/sql/docs/postgres/quickstart
[GOOGLE_CLOUD_SQL_PROXY]: https://cloud.google.com/sql/docs/mysql/connect-overview#cloud_sql_proxy
