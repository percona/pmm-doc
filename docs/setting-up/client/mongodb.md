# MongoDB

PMM Client collects metrics from [MongoDB][MONGODB] and [Percona Server for MongoDB][PSMDB].

This page shows you how to set up PMM to monitor a MongoDB database instance. (You should read it completely before starting work.)

Here is an overview of the steps involved.

```plantuml source="_resources/diagrams/Setting-Up_Client_MongoDB.puml"
```

## Before you start

Check that:

- [PMM Server is installed](../server/index.md) and running with a known IP address accessible from the client node.
- [PMM Client is installed](index.md) and the [node is registered with PMM Server](index.md#register).
- You have superuser (root) access on the client host.
- You have superuser access to any database servers that you want to monitor.




<!--
**Supported versions of MongoDB**

Query Analytics supports MongoDB version 3.2 or higher.
-->

## Set role permissions

```json
db.getSiblingDB("admin").createRole({
    role: "explainRole",
    privileges: [{
        resource: {
            db: "",
            collection: ""
            },
        actions: [
            "listIndexes",
            "listCollections",
            "dbStats",
            "dbHash",
            "collStats",
            "find"
            ]
        }],
    roles:[]
})
```

## Create PMM account {: #setting-up-client-user}

We recommend using a dedicated account to connect PMM Client to the monitored database instance.

This example creates a database user with name `{{pmm_mongodb_user}}`, password `{{pmm_password}}`, and with the necessary roles.

> Values for username (`user`) and password (`pwd`) are examples. Replace them before using this code.

```json
db.getSiblingDB("admin").createUser({
   user: "{{pmm_mongodb_user}}",
   pwd: "{{pmm_password}}",
   roles: [
      { role: "explainRole", db: "admin" },
      { role: "clusterMonitor", db: "admin" },
      { role: "read", db: "local" }
   ]
})
```




## Profiling

Query Analytics requires profiling. (It is disabled by default to avoid affecting the performance of MongoDB.)

You can set profiling either on the command line when running MongoDB, or in the MongoDB configuration file.

**Command Line**

If you start `mongod` manually:


```sh
mongod --dbpath=DATABASEDIR --profile 2 --slowms 200 --rateLimit 100
```

- `--dbpath`: The path to database files (usually `/var/lib/mongo`).
- `--profile`: A value of `2` tells the server to collect profiling data for *all* operations. To lower the load on the server, use a value of `1` to only record slow operations.
- `--slowms`: An operation is classified as *slow* if it runs for longer than this number of milliseconds.
- `--rateLimit`: (Only available with Percona Server for MongoDB.) The sample rate of profiled queries. A value of `100` means sample every 100th fast query. Smaller values improve accuracy but can load your server. ([Read more][PSMDB_RATELIMIT])

**Configuration file**

If you start `mongod` as a service:

1. Edit the configuration file (usually `/etc/mongod.conf`).

2. Create or add this to the `operationProfiling` section.

    ```yml
    operationProfiling:
      slowOpThresholdMs: 200
      mode: slowOp
      rateLimit: 100
    ```

    > This is a [YAML](http://yaml.org/spec/) file. Indentation is important.

3. Restart the `mongod` service. (Example for `systemd`.)

    ```sh
    systemctl restart mongod
    ```

## Adding a service

When you have configured your database server, you can add a MongoDB service with the user interface or on the command line.

### With the user interface

1. Select *{{icon.cog}} Configuration-->{{icon.inventory}} PMM Inventory-->{{icon.addinstance}} Add Instance*.
2. Select *MongoDB -- Add a remote instance*.
3. Enter values for the fields.
    - *Hostname*: The hostname or IP address of the node where the database server is running.
    - *Service name*: Choose a service name.
    - *Port*: Default is 27017 for MongoDB servers.
    - *Username*: The username for connecting to the MongoDB database. Use the PMM user account if you chose to create one (`{{pmm_mongodb_user}}` in these examples).
    - *Password*: The password for this user account. (`{{pmm_password}}` in these examples.)
    - Additional options:
        - *Use QAN MongoDB Profiler*: Activate if you want to use Query Analytics and have [set up profiling](#profiling).

4. Click *Add service*.


### On the command line

Add the database server as a service using one of these example commands. If successful, PMM Client will print `MongoDB Service added` with the service's ID and name. Use the `--environment` and `-custom-labels` options to set tags for the service to help identify them.

**Example**


```sh
pmm-admin add mongodb
--username={{pmm_mongodb_user}}
--password={{pmm_password}}
--query-source=profiler
--cluster=mycluster
```

**Example**

```sh
pmm-admin add mongodb --use-profiler --server-insecure-tls --username={{pmm_mongodb_user}} --password={{pmm_password}} --server-url=https://<pmm_ip>:443
```

> `--cluster` ...

where username and password are credentials for the monitored MongoDB access, which will be used locally on the database host.

Additionally, two positional arguments can be appended to the command line flags: a service name to be used by PMM, and a service address. If not specified, they are substituted automatically as `<node>-mongodb` and `127.0.0.1:27017`.

**Example**

The command line and the output of this command may look as follows:

```sh
pmm-admin add mongodb --username={{pmm_mongodb_user}} --password={{pmm_password}} mongo 127.0.0.1:27017
```

```
MongoDB Service added.
Service ID  : /service_id/f1af8a88-5a95-4bf1-a646-0101f8a20791
Service name: mongo
```

Beside positional arguments shown above you can specify service name and service address with the following flags: `--service-name`, `--host` (the hostname or IP address of the service), and `--port` (the port number of the service). If both flag and positional argument are present, flag gains higher priority. Here is the previous example modified to use these flags:

```sh
pmm-admin add mongodb --username={{pmm_mongodb_user}} --password={{pmm_password}} --service-name=mongo --host=127.0.0.1 --port=27017
```

You can add a MongoDB instance using a UNIX socket with the `--socket` option:

```sh
pmm-admin add mongodb --socket=/tmp/mongodb-27017.sock
```

> If the password contains special symbols like the 'at' (`@`) symbol, the host might not be detected correctly. Make sure that you insert the password with special characters replaced with their escape sequences. The simplest way is to use the [`encodeURIComponent`][ENCODE_URI] JavaScript function in your browser's web console (usually found under *Development Tools*). Evaluate the function with your password as the parameter. For example:
>
> ```js
> > encodeURIComponent('{{pmm_password}}')
> ```
> will give:
> ```
> "s3cR%23tpa%24%24worD"
> ```

[ENCODE_URI]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

## Passing SSL parameters to the MongoDB monitoring service

SSL/TLS related parameters are passed to an SSL enabled MongoDB server as
monitoring service parameters along with the `pmm-admin add` command when adding
the MongoDB monitoring service.

Run this command as root or by using the `sudo` command

```sh
pmm-admin add mongodb --tls
```

**Supported SSL/TLS Parameters**

`--tls`
: Enable a TLS connection with mongo server

`--tls-skip-verify`
: Skip TLS certificates validation

`--tls-certificate-key-file=PATHTOCERT`
: Path to TLS certificate file.

`--tls-certificate-key-file-password=IFPASSWORDTOCERTISSET`
: Password for TLS certificate file.

`--tls-ca-file=PATHTOCACERT`
: Path to certificate authority file.




[MONGODB]: https://www.mongodb.com/
[PSMDB]: https://www.percona.com/software/mongodb/percona-server-for-mongodb
[PSMDB_RATELIMIT]: https://www.percona.com/doc/percona-server-for-mongodb/LATEST/rate-limit.html#enabling-the-rate-limit