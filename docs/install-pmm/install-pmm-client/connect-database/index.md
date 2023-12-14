# About connecting databases

You must configure and add database/service according to the service type.

- [MySQL](mysql.md) (and variants Percona Server for MySQL, Percona XtraDB Cluster, MariaDB)
- [MongoDB](mongodb.md)
- [PostgreSQL](postgresql.md)
- [ProxySQL](proxysql.md)
- [Amazon RDS](aws.md)
- [Microsoft Azure](azure.md)
- [Google Cloud Platform](google) (MySQL and PostgreSQL)
- [Linux](linux.md)
- [External services](external.md)
- [HAProxy](haproxy.md)
- [Remote instances](remote.md)

!!! hint alert alert-success "Tip"
    To change the parameters of a previously-added service, remove the service and re-add it with new parameters.

## Remove services for PMM monitoring

You must specify the service type and service name to remove services from monitoring.

```sh
pmm-admin remove <service-type> <service-name>
```

`service-type`
: One of `mysql`, `mongodb`, `postgresql`, `proxysql`, `haproxy`, `external`.

!!! seealso alert alert-info "See also"
    - [Percona release](https://www.percona.com/doc/percona-repo-config/percona-release.html)
    - [PMM Client architecture](../../details/architecture.md#pmm-client)
