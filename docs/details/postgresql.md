# PostgreSQL

You can use an external PostgreSQL database instance outside the PMM Server container running on other hosts.

## Environment variables

PMM predefines certain flags that allow you to use PostgreSQL parameters as environment variables:

!!! caution alert alert-warning "Warning"
     The `POSTGRES_*` environment variables are experimental and subject to change. It is recommended that you use these variables for testing purposes only and not on production.

To use PostgreSQL as an external database instance, use the following environment variables: 
 
`POSTGRES_ADDR` -> [postgres-addr](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-HOST)
:   Host name and port for external PostgreSQL database.

**Optional environment variables**

`POSTGRES_DBNAME` -> [postgres-name](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-DBNAME)
:   Database name for external or internal PostgreSQL database.

`POSTGRES_USERNAME` -> [postgres-username](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-USER)
:   PostgreSQL user name to connect as.
 
`POSTGRES_DBPASSWORD` -> [postgres-password](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-PASSWORD)
:   Password to be used for database authentication.

`POSTGRES_SSL_MODE` -> [postgres-ssl-mode](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-SSLMODE)
:   This option determines whether or with what priority a secure SSL TCP/IP connection will be negotiated with the database. Currently supported: `disable`, `require`, `verify-ca`, `verify-full`.

`POSTGRES_SSL_CA_PATH` -> [postgres-ssl-ca-path](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-SSLROOTCERT)
:   This parameter specifies the name of a file containing SSL certificate authority (CA) certificate(s).

`POSTGRES_SSL_KEY_PATH` -> [postgres-ssl-key-path](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-SSLKEY)
:   This parameter specifies the location for the secret key used for the client certificate.

`POSTGRES_SSL_CERT_PATH` -> [postgres-ssl-cert-path](https://www.postgresql.org/docs/14/libpq-connect.html#LIBPQ-CONNECT-SSLCERT)
:   This parameter specifies the file name of the client SSL certificate.

By default communications between server and database are not encrypted. In order to secure connection you can read [this](https://www.postgresql.org/docs/14/ssl-tcp.html) article and provide `POSTGRES_SSL_*` variables. 

**Example**

To use PostgreSQL as an external database: 
* Generate all nessesary SSL certificates.
* Build Percona Server with certificates under read-only rights and  grafana user and group.
* Build PostgreSQL image with pg_hba.conf and certificates.
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
* Run Percona server:

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
<image_id>
```