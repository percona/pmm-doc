# PostgreSQL

You can use an external PostgreSQL database instance outside the PMM Server container running on the same or other hosts.

## Environment variables

PMM predefines certain flags that allow you to use PostgreSQL parameters as environment variables:

!!! caution alert alert-warning "Warning"
     The `POSTGRES_*` environment variables are experimental and subject to change. It is recommended that you use these variables for testing purposes only and not on production.

To use PostgreSQL as an external database instance, use the following environment variables: 
 
 | Environment&nbsp;&nbsp;variable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Flag&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description
|:----------------------------------:|----------------------|-------------------------------
| `POSTGRES_ADDR`                  | [postgres-addr](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-HOST)                 | Hostname and port for external PostgreSQL database.
| `POSTGRES_DBNAME`     | [postgres-name](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-DBNAME)               | Database name for external or internal PostgreSQL database.
| `POSTGRES_USERNAME`       | [postgres-username](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-USER)              | PostgreSQL user name to connect as.
| `POSTGRES_DBPASSWORD`       | [postgres-password](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-PASSWORD)           | Password to be used for database authentication.
| `POSTGRES_SSL_MODE`      | [postgres-ssl-mode](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-SSLMODE)    | This option determines whether or with what priority a secure SSL TCP/IP connection will be negotiated with the database. Currently supported: `disable`, `require`, `verify-ca`, `verify-full`.
| `POSTGRES_SSL_CA_PATH`    | [postgres-ssl-ca-path](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-SSLROOTCERT)      | This parameter specifies the name of a file containing SSL certificate authority (CA) certificate(s).
| `POSTGRES_SSL_KEY_PATH`    | [postgres-ssl-key-path](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-SSLKEY)      | This parameter specifies the location for the secret key used for the client certificate.
| `POSTGRES_SSL_CERT_PATH`    | [postgres-ssl-cert-path](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-SSLCERT)     | This parameter specifies the file name of the client SSL certificate.


By default, communications between the PMM server and the database are not encrypted. In order to secure a connection, please follow [PostgeSQL SSL instructions](https://www.postgresql.org/docs/14/ssl-tcp.html) and provide `POSTGRES_SSL_*` variables. 

**Example**

To use PostgreSQL as an external database: 

* Generate all nessesary SSL certificates.
* Deploy Percona Server with certificates under read-only permissions and grafana user and grafana group.
* Attach pg_hba.conf and certificates to the PostgreSQL image.
* Run PostgreSQL server.
```sh
docker run 
--name external-postgres 
-e POSTGRES_PASSWORD=secret 
<image_id> 
postgres 
-c shared_preload_libraries=pg_stat_statements 
-c pg_stat_statements.max=10000 
-c pg_stat_statements.track=all 
-c pg_stat_statements.save=off 
-c ssl=on
-c ssl_ca_file=$CA_PATH
-c ssl_key_file=$KEY_PATH
-c ssl_cert_file=$CERT_PATH
-c hba_file=$HBA_PATH
```
* Run Percona server.
```sh
docker run 
--name percona-server 
-e POSTGRES_ADDR=$ADDRESS:$PORT
-e POSTGRES_DBNAME=$DBNAME
-e POSTGRES_USERNAME=$USER
-e POSTGRES_DBPASSWORD=$PASSWORD
-e POSTGRES_SSL_MODE=$SSL_MODE
-e POSTGRES_SSL_CA_PATH=$CA_PATH
-e POSTGRES_SSL_KEY_PATH=$KEY_PATH
-e POSTGRES_SSL_CERT_PATH=$CERT_PATH 
percona/pmm-server:2
```