# Extend Metrics

Sometimes, though, you’ll have the need for a metric that’s not present in the list of node_exporter metrics out of the box. 
The textfile collector allows exporting of statistics from batch jobs. It can also be used to export static metrics, such as what role a machine has. 

## Enable the textfile collector

The collector is enabled by default. Next folders are used for different resolutions:

| Resolution | Folder                                                                  |
|------------|-------------------------------------------------------------------------|
|  High      | /usr/local/percona/pmm2/collectors/textfile-collector/high-resolution   |
|  Medium    | /usr/local/percona/pmm2/collectors/textfile-collector/medium-resolution |
|  Low       | /usr/local/percona/pmm2/collectors/textfile-collector/low-resolution    |

![!image](../_images/node-exporter.textfile-collector.1.png)

Exporter parse all files in that directories matching the glob *.prom using a simple text-based [exposition format](https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format).
Metrics are stored on PMM Server-side with additional labels related to this Node.

## Examples of shell commands for custom metrics

To statically set roles for a machine using labels:

    ```sh
    echo 'node_role{role="my_monitored_server_1"} 1' > /usr/local/percona/pmm2/collectors/textfile-collector/low-resolution/node_role.prom
    ```

To atomically push loggedin users for a cron job:

    ```sh
    $ cat /etc/cron.d/loggedin_users
    */1 * * * *     root    /usr/bin/who | /usr/bin/wc -l | sed -ne 's/^/node_loggedin_users /p' > /usr/local/percona/pmm2/collectors/textfile-collector/high-resolution/node_users.prom
    ```

![!image](../_images/node-exporter.textfile-collector.2.png)

