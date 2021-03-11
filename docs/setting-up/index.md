# Setting up

Setting up PMM means:

1. installing and running at least one server,
2. installing the client software on each node where a monitored service runs,
3. configuring those services so the client can extract, parse and transmit the system's metrics, and,
4. adding the service to PMM's inventory of monitored systems.

If you have configured everything correctly, you'll start to see data appear in one of the dashboards that are part of the PMM user interface.

This section is an overview of the setting-up process.

You have three ways to run PMM Server:

- as a [Docker](server/docker.md) container,
- a [Virtual appliance](server/virtual-appliance.md),
- or on [Amazon AWS EC2](server/aws.md).

2. [Set up PMM Client](client/index.md) on each monitored node,
 [natively on Linux](client/index.md#installing-pmm-client-with-your-linux-package-manager),
or [use the PMM Client Docker container](client/docker.md).

3. Configure services to set up monitoring of different types of client systems:
	- [MySQL and MySQL-based databases (Percona Server for MySQL, MariaDB, Percona XtraDB Cluster)](client/mysql.md)
	- [MongoDB](client/mongodb.md)
	- [PostgreSQL](client/postgresql.md)
	- [ProxySQL](client/proxysql.md)
	- [Amazon RDS](client/aws.md)
	- [Microsoft Azure](client/azure.md)
	- [Linux](client/linux.md)
	- [External services](client/external.md)
	- [HAProxy](client/haproxy.md)

```plantuml source="_resources/diagrams/Setting-Up.puml"
```
