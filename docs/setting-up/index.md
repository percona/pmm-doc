# Setting up

Setting up PMM means:

1. Setting up and verifying at least one server as either a
	a) Docker container,
	b) virtual appliance, or
	c) Amazon AWS instance;
2. Setting up the client on each node where a monitored service runs using either:
	a) the native Linux package, or
	b) a Docker container;
3. Configuring those services so the client can extract, parse and transmit the system's metrics;
4. Adding the service to PMM's inventory of monitored systems.

You repeat steps 3 and 4 on each node being monitored.

If you have configured everything correctly, you'll see data in the PMM user interface, in one of the dashboards specific to the type of service.

This section is an overview of the setting-up process broken into these four key stages.

Follow the links to separate sections which cover each stage in detail.

```plantuml source="_resources/diagrams/Setting-Up.puml"
```

## 1. Setting up PMM Server

How you set up PMM Server depends on your use cases, system resources, and technical skills.

Learn about each in these sections:

- [Docker](server/docker.md)
- [Virtual appliance](server/virtual-appliance.md)
- [Amazon AWS](server/aws.md)

## 2. Setting up PMM Client

PMM Client is a suite of software that runs on the node being monitored.

These sections explain how you can run it:

- [Natively on Linux](client/index.md#installing-pmm-client-with-your-linux-package-manager),
- [as a Docker container](client/docker.md).

## 3. Configure service

When PMM Client is running and has connected to PMM Server, you can add whatever services the node has access to. Most services need some pre-configuration before PMM can monitor them. Learn more about each service's specific configuration needs in these sections.

- [MySQL and MySQL-based databases (Percona Server for MySQL, MariaDB, Percona XtraDB Cluster)](client/mysql.md)
- [MongoDB](client/mongodb.md)
- [PostgreSQL](client/postgresql.md)
- [ProxySQL](client/proxysql.md)
- [Amazon RDS](client/aws.md)
- [Microsoft Azure](client/azure.md)
- [Linux](client/linux.md)
- [External services](client/external.md)
- [HAProxy](client/haproxy.md)
