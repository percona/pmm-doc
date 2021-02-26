# HAProxy

## Adding HAProxy services

You can collect metrics from an haproxy on a node when:

* there is already configured haproxy
  1. How to configure HAProxy https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint
  2. After HAProxy is running (default address http://localhost:8404/metrics) you can add it to PMM.
  3. Use the `haproxy` alias to enable HAProxy metrics monitoring.
* there is already a PMM Agent instance running
* this node has been [configured](/setting-up/client/index.md) using the `pmm-admin config` command.

## USAGE

```sh
pmm-admin add haproxy --listen-port=8404
```

where listen-port is port, where HAProxy running. Flag listen-port is only one, which is required.
Additionally, one positional argument can be appended to the command line flags: a service name to be used
by PMM. If not specified, they are substituted automatically as `<node>-haproxy`.

During adding here is connection check (can be skipped by flag --skip-connection-check).
If HAProxy doesnt running properly on given port then you will see error message:
Connection check failed: Get "http://127.0.0.1:8404/metrics": dial tcp 127.0.0.1:8404: connect: connection refused.

The output of this command may look as follows:

```
HAProxy Service added.
Service ID  : /service_id/c481183f-70a2-443f-91e5-cae5cecd06a2
Service name: Ubuntu-haproxy
```

Beside positional argument shown above you can specify service name  with the following flags: `--username`, `--password`, `--metrics-path` (path for scraping metrics, default: /metrics) and `--scheme` (http or https), Here are some examples:

```sh
pmm-admin add haproxy --listen-port=8404 --username=pmm --password=pmm new-haproxy
pmm-admin add haproxy --listen-port=8404 --metrics-path=/prom-metrics --scheme=https
```

Here you can check list of all avalaible flags: [pmm-admin](../../details/commands/pmm-admin.md)