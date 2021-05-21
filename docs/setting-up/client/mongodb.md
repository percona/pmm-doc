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
- Your MongoDB server is version 3.2 or higher (for Query Analytics).

## Create PMM account and set permissions

We recommend using a dedicated account to connect PMM Client to the monitored database instance.

This example creates a role with the necessary permissions, and adds a database user with the necessary roles.

> Values for username (`user`) and password (`pwd`) are examples. Replace them before using this code.

Run this in a `mongo` session.

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

To use PMM Query Analytics, you must turn on MongoDB's [profiling feature][MONGDB_DATABASE_PROFILER].

You can set profiling:

- permanently, by editing the MongoDB configuration file  and restarting the database instance (recommended);
- when starting MongoDB, by passing arguments to `mongod` on the command line;
- until the next database instance restart, by running a command in a `mongo` session.

> Profiling is turned off by default as it can adversely affect the performance of the database server.

### Set profiling in the configuration file

1. Edit the configuration file (usually `/etc/mongod.conf`).

2. Create or add this to the `operationProfiling` section. ([Read more][MONGODB_CONFIG_OP_PROF].)

    ```yml
    operationProfiling:
      mode: all
      slowOpThresholdMs: 200
      rateLimit: 100
    ```

    > This is a [YAML](http://yaml.org/spec/) file. Indentation is important.

3. Restart the `mongod` service. (Example for `systemd`.)

    ```sh
    systemctl restart mongod
    ```

### Set profiling on the command Line

```sh
mongod --dbpath=DATABASEDIR --profile 2 --slowms 200 --rateLimit 100
```

- `--dbpath`: The path to database files (usually `/var/lib/mongo`).
- `--profile`: The MongoDB profiling level. A value of `2` tells the server to collect profiling data for *all* operations. To lower the load on the server, use a value of `1` to only record slow operations.
- `--slowms`: An operation is classified as *slow* if it runs for longer than this number of milliseconds.
- `--rateLimit`: (Only available with Percona Server for MongoDB.) The sample rate of profiled queries. A value of `100` means sample every 100th fast query. ([Read more][PSMDB_RATELIMIT].)

    > Smaller values improve accuracy but can adversly affect the performance of your server.

### Set profiling in a `mongo` session

In a `mongo` session:

```json
use admin
db.setProfilingLevel(2)
```

> If you have already [added a service](#add-service), you should remove it and re-add it after changing the profiling level.

## Add service

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

Use `pmm-admin` to add the database server as a service using one of these example commands.

When successful, PMM Client will print `MongoDB Service added` with the service's ID and name. Use the `--environment` and `-custom-labels` options to set tags for the service to help identify them.

> **See also**: [`pmm-admin` man page][PMM_ADMIN_MAN_PAGE]

**Example**

```sh
pmm-admin add mongodb \
--username={{pmm_mongodb_user}} --password={{pmm_password}} \
--query-source=profiler --cluster=mycluster
```

**Example**

```sh
pmm-admin add mongodb \
--username={{pmm_mongodb_user}} --password={{pmm_password}} \
mongo 127.0.0.1:27017
```

**Example**

```sh
pmm-admin add mongodb \
--username={{pmm_mongodb_user}} --password={{pmm_password}} \
--service-name=mymongosvc --host=127.0.0.1 --port=27017
```

**Example -- connect via UNIX socket**

```sh
pmm-admin add mongodb --socket=/tmp/mongodb-27017.sock
```


**Example -- connecting via SSL/TLS**

```sh
pmm-admin add mongodb --tls \
--tls-certificate-key-file=PATHTOCER \
--tls-certificate-key-file-password=IFPASSWORDTOCERTISSET \
--tls-ca-file=PATHTOCACERT
```

where:

- `PATHTOCERT`: Path to TLS certificate file.
- `IFPASSWORDTOCERTISSET`: Password for TLS certificate file.
- `PATHTOCACERT`: Path to certificate authority file.

> **See also** [`pmm-admin` man page for `pmm-admin add mongodb`](../../details/commands/pmm-admin.md#mongodb)

## Tips

- When adding nodes of a replica set, add each node separately using the same cluster name.

- If the password contains special symbols (such as `@`), the host might not be detected correctly. You should convert any password with special characters, replacing them with their escape sequence equivalents.

    One way to do this is to use the [`encodeURIComponent`][ENCODE_URI] JavaScript function in your browser's web console (usually found under *Development Tools*). Evaluate the function with your password as the parameter. For example:

    ```js
    > encodeURIComponent("s3cR#tpa$$worD")
    ```

    will give:

    ```
    "s3cR%23tpa%24%24worD"
    ```

## Check the service

**Check service - PMM user interface**

1. Select *{{icon.cog}} Configuration-->{{icon.inventory}} PMM Inventory-->{{icon.inventory}} Inventory list*.
2. Look in the *Services* tab for a matching *Service Type* (MongoDB), *Service name*, *Addresses*, and any other values used when adding the service.
3. Look in the *Agents* tab to check the desired data source is being used.

**Check service - Command line**

Look for your service in the output of this command.

```sh
pmm-admin inventory list services --service-type=mongodb
```

**Check data**

1. Open the *MongoDB Instances Overview* dashboard.
2. Set the *Service Name* to the newly-added service.

**Check Query Analytics**

1. Open *PMM Query Analytics*.
2. In the *Filters* panel:
    1. Under *Service Name*, select your service.
    2. Under *Service Type* select *mongodb*.


## Remove service

### With the user interface

1. Select *{{icon.cog}} Configuration-->{{icon.inventory}} PMM Inventory-->{{icon.inventory}} Inventory List*.
2. In the first column, click the tick box for the service you want to remove.
3. Click *{{icon.trash}} Delete*.
4. On the *Confirm action* dialog window:
    1. (Optional) Select *Force mode* to also delete associated agents.
    2. Click *Proceed*.

### On the command line

```sh
pmm-admin remove mongodb SERVICE_NAME
```

- `SERVICE_NAME`: The name the service was added as. (Find it with `pmm-admin list`.)


[MONGODB]: https://www.mongodb.com/
[MONGDB_DATABASE_PROFILER]: https://docs.mongodb.com/manual/tutorial/manage-the-database-profiler/
[MONGODB_CONFIG_OP_PROF]: https://docs.mongodb.com/manual/reference/configuration-options/#operationprofiling-options
[PSMDB]: https://www.percona.com/software/mongodb/percona-server-for-mongodb
[PSMDB_RATELIMIT]: https://www.percona.com/doc/percona-server-for-mongodb/LATEST/rate-limit.html#enabling-the-rate-limit
[PMM_ADMIN_MAN_PAGE]: ../../details/commands/pmm-admin.md
[ENCODE_URI]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
