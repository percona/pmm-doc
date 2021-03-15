# Setting up

This section is an overview of the setting-up process broken into three key stages.

```plantuml source="_resources/diagrams/Setting-Up.puml"
```

Setting up PMM means:

1. Setting up and verifying at least one PMM Server. A server can run as:

	- [a Docker container](server/docker.md);
	- [a virtual appliance](server/virtual-appliance.md);
	- [an Amazon AWS EC2 instance](server/aws.md).

2. Setting up PMM Client on each node where a monitored service. Clients can run:

	- [natively on Linux](client/index.md#installing-pmm-client-with-your-linux-package-manager);
	- [as a Docker container](client/docker.md).

3. Configuring those services so PMM Client can extract, parse and transmit the system's metrics, and adding the service to PMM Server's inventory of monitored systems:

	- [MySQL and variants (Percona Server for MySQL, Percona XtraDB Cluster, MariaDB)](client/mysql.md)
	- [MongoDB](client/mongodb.md)
	- [PostgreSQL](client/postgresql.md)
	- [ProxySQL](client/proxysql.md)
	- [Amazon RDS](client/aws.md)
	- [Microsoft Azure](client/azure.md)
	- [Linux](client/linux.md)
	- [External services](client/external.md)
	- [HAProxy](client/haproxy.md)

You repeat step 3 on each node being monitored.

If you have configured everything correctly, you'll see data in the PMM user interface, in one of the dashboards specific to the type of service.
