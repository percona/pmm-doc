# Environment variables

Set environment variables when running PMM Server in Docker:

## Core configuration variables
Use the following Docker container environment variables (with `-e var=value`) to set PMM Server parameters.

| Variable  &nbsp; &nbsp; &nbsp; &nbsp;                              | Description
| --------------------------------------------------------------- | -----------------------------------------------------------------------
| `DISABLE_UPDATES`                                               | Disables a periodic check for new PMM versions as well as ability to apply upgrades using the UI
| `DISABLE_TELEMETRY`                                             | Disable built-in telemetry and disable STT if telemetry is disabled.
| `METRICS_RESOLUTION`                                            | High metrics resolution in seconds.
| `METRICS_RESOLUTION_HR`                                         | High metrics resolution (same as above).
| `METRICS_RESOLUTION_MR`                                         | Medium metrics resolution in seconds.
| `METRICS_RESOLUTION_LR`                                         | Low metrics resolution in seconds.
| `DATA_RETENTION`                                                | The number of days to keep time-series data. <br />**N.B.** This must be set in a format supported by `time.ParseDuration` <br /> and represent the complete number of days. <br /> The supported units are `ns`, `us` (or `µs`), `ms`, `s`, `m`, and `h`. <br /> The value must be a multiple of 24, e.g., for 90 days 2160h (90 * 24).
| `ENABLE_VM_CACHE`                                               | Enable cache in VM.
| `DISABLE_ALERTING`                           | Disables built-in Percona Alerting, which is enabled by default.
| `ENABLE_AZUREDISCOVER`                                          | Enable support for discovery of Azure databases.
| `DISABLE_BACKUP_MANAGEMENT`                                     | Disables Backup Management, which is enabled by default.
| `PMM_DEBUG`                                                     | Enables a more verbose log level.
| `PMM_TRACE`                                                     | Enables a more verbose log level including trace-back information.
| `PMM_PUBLIC_ADDRESS`                                            | External IP address or the DNS name on which PMM server is running.
| `PMM_WATCHTOWER_HOST=${PMM_WATCHTOWER_HOST:-http://watchtower:8080}` | Specifies the connection URL for the WatchTower container, including the schema (http), host (watchtower), and port (8080). 
| `PMM_WATCHTOWER_TOKEN=${PMM_WATCHTOWER_TOKEN:-123}`             | Defines the authentication token used for secure communication between the PMM Server container and the WatchTower container. Make sure this matches the value of the `WATCHTOWER_HTTP_API_TOKEN` environment variable set in the WatchTower container.


## Upgrade variables

## Migrating PMM v2 environment variables to v3
We've renamed some environment variables used by PMM for consistency.
Below is a list of affected variables and their new names.

| PMM 2                                         | PMM 3                                      | Comments                                                     |
|-----------------------------------------------|--------------------------------------------|--------------------------------------------------------------|
| `DATA_RETENTION`                              | `PMM_DATA_RETENTION`                       |                                                              |
| `DISABLE_ALERTING`                            | `PMM_ENABLE_ALERTING`                      |                                                              |
| `DISABLE_UPDATES`                             | `PMM_ENABLE_UPDATES`                       |                                                              |
| `DISABLE_TELEMETRY`                           | `PMM_ENABLE_TELEMETRY`                     |                                                              |
| `PERCONA_PLATFORM_API_TIMEOUT`                | `PMM_DEV_PERCONA_PLATFORM_API_TIMEOUT`     |                                                              |
| `DISABLE_BACKUP_MANAGEMENT`                   | `PMM_ENABLE_BACKUP_MANAGEMENT`             | Note the reverted boolean                                    |
| `ENABLE_AZUREDISCOVER`                        | `PMM_ENABLE_AZURE_DISCOVER`                |                                                              |
| `ENABLE_RBAC`                                 | `PMM_ENABLE_ACCESS_CONTROL`                |                                                              |
| `LESS_LOG_NOISE`                              |                                            | Removed in PMM v3                                            |
| `METRICS_RESOLUTION`                          | `PMM_METRICS_RESOLUTION`                   |                                                              |
| `METRICS_RESOLUTION_HR`                       | `PMM_METRICS_RESOLUTION_HR`                |                                                              |
| `METRICS_RESOLUTION_LR`                       | `PMM_METRICS_RESOLUTION_LR`                |                                                              |
| `METRICS_RESOLUTION_MR`                       | `PMM_METRICS_RESOLUTION_MR`                |                                                              |
| `OAUTH_PMM_CLIENT_ID`                         | `PMM_DEV_OAUTH_CLIENT_ID`                  |                                                              |
| `OAUTH_PMM_CLIENT_SECRET`                     | `PMM_DEV_OAUTH_CLIENT_SECRET`              |                                                              |
| `PERCONA_TEST_AUTH_HOST`                      |                                            | Removed in PMM v3, use `PMM_DEV_PERCONA_PLATFORM_ADDRESS`    |
| `PERCONA_TEST_CHECKS_FILE`                    | `PMM_DEV_ADVISOR_CHECKS_FILE`              |                                                              |
| `PERCONA_TEST_CHECKS_HOST`                    |                                            | Removed in PMM v3, use `PMM_DEV_PERCONA_PLATFORM_ADDRESS`    |
| `PERCONA_TEST_CHECKS_INTERVAL`                |                                            | Removed in PMM v3 as it wasn't actually used.                |
| `PERCONA_TEST_CHECKS_PUBLIC_KEY`              |                                            | Removed in PMM v3, use `PMM_DEV_PERCONA_PLATFORM_PUBLIC_KEY` |
| `PERCONA_TEST_NICER_API`                      |                                            | Removed in PMM v3                                            |
| `PERCONA_TEST_PMM_CLICKHOUSE_ADDR`            | `PMM_CLICKHOUSE_ADDR`                      |                                                              |
| `PERCONA_TEST_PMM_CLICKHOUSE_BLOCK_SIZE`      |                                            | Removed in PMM v3, because of new clickhouse version.        |
| `PERCONA_TEST_PMM_CLICKHOUSE_DATABASE`        | `PMM_CLICKHOUSE_DATABASE`                  |                                                              |
| `PERCONA_TEST_PMM_CLICKHOUSE_DATASOURCE`      | `PMM_CLICKHOUSE_DATASOURCE`                |                                                              |
| `PERCONA_TEST_PMM_CLICKHOUSE_HOST`            | `PMM_CLICKHOUSE_HOST`                      |                                                              |
| `PERCONA_TEST_PMM_CLICKHOUSE_POOL_SIZE`       |                                            | Removed in PMM v3, because of new clickhouse version.        |
| `PERCONA_TEST_PMM_CLICKHOUSE_PORT`            | `PMM_CLICKHOUSE_PORT`                      |                                                              |
| `PERCONA_TEST_PMM_DISABLE_BUILTIN_CLICKHOUSE` | `PMM_DISABLE_BUILTIN_CLICKHOUSE`           |                                                              |
| `PERCONA_TEST_PMM_DISABLE_BUILTIN_POSTGRES`   | `PMM_DISABLE_BUILTIN_POSTGRES`             |                                                              |
| `PERCONA_TEST_INTERFACE_TO_BIND`              | `PMM_INTERFACE_TO_BIND`                    |                                                              |
| `PERCONA_TEST_PLATFORM_ADDRESS`               | `PMM_DEV_PERCONA_PLATFORM_ADDRESS`         |                                                              |
| `PERCONA_TEST_PLATFORM_INSECURE`              | `PMM_DEV_PERCONA_PLATFORM_INSECURE`        |                                                              |
| `PERCONA_TEST_PLATFORM_PUBLIC_KEY`            | `PMM_DEV_PERCONA_PLATFORM_PUBLIC_KEY`      |                                                              |
| `PERCONA_TEST_POSTGRES_ADDR`                  | `PMM_POSTGRES_ADDR`                        |                                                              |
| `PERCONA_TEST_POSTGRES_DBNAME`                | `PMM_POSTGRES_DBNAME`                      |                                                              |
| `PERCONA_TEST_POSTGRES_SSL_CA_PATH`           | `PMM_POSTGRES_SSL_CA_PATH`                 |                                                              |
| `PERCONA_TEST_POSTGRES_SSL_CERT_PATH`         | `PMM_POSTGRES_SSL_CERT_PATH`               |                                                              |
| `PERCONA_TEST_POSTGRES_SSL_KEY_PATH`          | `PMM_POSTGRES_SSL_KEY_PATH`                |                                                              |
| `PERCONA_TEST_POSTGRES_SSL_MODE`              | `PMM_POSTGRES_SSL_MODE`                    |                                                              |
| `PERCONA_TEST_POSTGRES_DBPASSWORD`            | `PMM_POSTGRES_DBPASSWORD`                  |                                                              |
| `PERCONA_TEST_SAAS_HOST`                      |                                            | Removed in PMM v3, use `PMM_DEV_PERCONA_PLATFORM_ADDRESS`    |
| `PERCONA_TEST_POSTGRES_USERNAME`              | `PMM_POSTGRES_USERNAME`                    |                                                              |
| `PERCONA_TEST_STARLARK_ALLOW_RECURSION`       | `PMM_DEV_ADVISOR_STARLARK_ALLOW_RECURSION` |                                                              |
| `PMM_TEST_TELEMETRY_DISABLE_SEND`             | `PMM_DEV_TELEMETRY_DISABLE_SEND`           |                                                              |
| `PERCONA_TEST_TELEMETRY_DISABLE_START_DELAY`  | `PMM_DEV_TELEMETRY_DISABLE_START_DELAY`    |                                                              |
| `PMM_TEST_TELEMETRY_FILE`                     | `PMM_DEV_TELEMETRY_FILE`                   |                                                              |
| `PERCONA_TEST_TELEMETRY_HOST`                 | `PMM_DEV_TELEMETRY_HOST`                   |                                                              |
| `PERCONA_TEST_TELEMETRY_INTERVAL`             | `PMM_DEV_TELEMETRY_INTERVAL`               |                                                              |
| `PERCONA_TEST_TELEMETRY_RETRY_BACKOFF`        | `PMM_DEV_TELEMETRY_RETRY_BACKOFF`          |                                                              |                 
| `PERCONA_TEST_VERSION_SERVICE_URL`            | `PMM_DEV_VERSION_SERVICE_URL`              |                                                              |
## Other variables

The following variables are also supported but values passed are not verified by PMM. If any other variable is found, it will be considered invalid and the server won't start.

| Variable                                                        | Description
| --------------------------------------------------------------- | ------------------------------------------------------
| `_`, `HOME`, `HOSTNAME`, `LANG`, `PATH`, `PWD`, `SHLVL`, `TERM` | Default environment variables.
| `GF_*`                                                          | [Grafana](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/) environment variables.
| `VM_*`                                                          | [VictoriaMetrics'](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#environment-variables) environment variables.
| `SUPERVISOR_`                                                   | `supervisord` environment variables.
| `KUBERNETES_`                                                   | Kubernetes environment variables.
| `MONITORING_`                                                   | Kubernetes monitoring environment variables.
| `PERCONA_TEST_`                                                 | Unknown variable but won't prevent the server starting.


# Environment variables in PMM

Configure PMM Server by setting Docker container environment variables using the `-e var=value` syntax:

```bash
docker run -e PMM_DATA_RETENTION=720h -e PMM_DEBUG=true percona/pmm-server:3
```

## Core configuration variables

### Performance & storage

| Variable | Default | Description | Example |
|----------|---------|-------------|----------|
| `PMM_DATA_RETENTION` | `30d` | Duration to retain metrics data. Must be in multiples of 24h. | `720h` (30 days) |
| `PMM_METRICS_RESOLUTION` | `1s` | Base metrics collection interval | `5s` |
| `PMM_METRICS_RESOLUTION_HR` | `5s` | High-resolution metrics interval | `10s` |
| `PMM_METRICS_RESOLUTION_MR` | `10s` | Medium-resolution metrics interval | `30s` |
| `PMM_METRICS_RESOLUTION_LR` | `60s` | Low-resolution metrics interval | `300s` |

### Feature flags

| Variable | Default | Effect When Enabled |
|----------|---------|-------------------|
| `PMM_ENABLE_UPDATES` | `true` | Allows version checks and UI updates |
| `PMM_ENABLE_TELEMETRY` | `true` | Enables usage data collection |
| `PMM_ENABLE_ALERTING` | `true` | Enables Percona Alerting system |
| `PMM_ENABLE_BACKUP_MANAGEMENT` | `true` | Enables backup features |
| `PMM_ENABLE_AZURE_DISCOVER` | `false` | Enables Azure database discovery |

### Debugging

| Variable | Default | Purpose |
|----------|---------|---------|
| `PMM_DEBUG` | `false` | Enables verbose logging |
| `PMM_TRACE` | `false` | Enables detailed trace logging |

## Migration from PMM v2

The migration to PMM v3 introduces several important changes:

- environment variables now use `PMM_` prefix
- some boolean flags reversed (e.g., `DISABLE_` → `ENABLE_`)
- removed deprecated variables

### Examples: 
```bash
# PMM v2
-e DISABLE_UPDATES=true -e DATA_RETENTION=720h

# PMM v3 equivalent
-e PMM_ENABLE_UPDATES=false -e PMM_DATA_RETENTION=720h
```

### Migration Reference Table

<details>
<summary>Click to see the complete list of affected variables and their new names.</summary>

#### Core settings
| PMM 2 | PMM 3 | Comments |
|-------|-------|----------|
| `DATA_RETENTION` | `PMM_DATA_RETENTION` | |
| `DISABLE_ALERTING` | `PMM_ENABLE_ALERTING` | |
| `DISABLE_UPDATES` | `PMM_ENABLE_UPDATES` | |
| `DISABLE_TELEMETRY` | `PMM_ENABLE_TELEMETRY` | |
| `DISABLE_BACKUP_MANAGEMENT` | `PMM_ENABLE_BACKUP_MANAGEMENT` | Note the reverted boolean |
| `ENABLE_AZUREDISCOVER` | `PMM_ENABLE_AZURE_DISCOVER` | |
| `ENABLE_RBAC` | `PMM_ENABLE_ACCESS_CONTROL` | |
| `LESS_LOG_NOISE` | | Removed in PMM v3 |

#### Metrics configuration
| PMM 2 | PMM 3 | Comments |
|-------|-------|----------|
| `METRICS_RESOLUTION` | `PMM_METRICS_RESOLUTION` | |
| `METRICS_RESOLUTION_HR` | `PMM_METRICS_RESOLUTION_HR` | |
| `METRICS_RESOLUTION_LR` | `PMM_METRICS_RESOLUTION_LR` | |
| `METRICS_RESOLUTION_MR` | `PMM_METRICS_RESOLUTION_MR` | |

#### Authentication & platform
| PMM 2 | PMM 3 | Comments |
|-------|-------|----------|
| `OAUTH_PMM_CLIENT_ID` | `PMM_DEV_OAUTH_CLIENT_ID` | |
| `OAUTH_PMM_CLIENT_SECRET` | `PMM_DEV_OAUTH_CLIENT_SECRET` | |
| `PERCONA_PLATFORM_API_TIMEOUT` | `PMM_DEV_PERCONA_PLATFORM_API_TIMEOUT` | |
| `PERCONA_TEST_PLATFORM_ADDRESS` | `PMM_DEV_PERCONA_PLATFORM_ADDRESS` | |
| `PERCONA_TEST_PLATFORM_INSECURE` | `PMM_DEV_PERCONA_PLATFORM_INSECURE` | |
| `PERCONA_TEST_PLATFORM_PUBLIC_KEY` | `PMM_DEV_PERCONA_PLATFORM_PUBLIC_KEY` | |

#### ClickHouse configuration
| PMM 2 | PMM 3 | Comments |
|-------|-------|----------|
| `PERCONA_TEST_PMM_CLICKHOUSE_ADDR` | `PMM_CLICKHOUSE_ADDR` | |
| `PERCONA_TEST_PMM_CLICKHOUSE_DATABASE` | `PMM_CLICKHOUSE_DATABASE` | |
| `PERCONA_TEST_PMM_CLICKHOUSE_DATASOURCE` | `PMM_CLICKHOUSE_DATASOURCE` | |
| `PERCONA_TEST_PMM_CLICKHOUSE_HOST` | `PMM_CLICKHOUSE_HOST` | |
| `PERCONA_TEST_PMM_CLICKHOUSE_PORT` | `PMM_CLICKHOUSE_PORT` | |
| `PERCONA_TEST_PMM_DISABLE_BUILTIN_CLICKHOUSE` | `PMM_DISABLE_BUILTIN_CLICKHOUSE` | |
| `PERCONA_TEST_PMM_CLICKHOUSE_BLOCK_SIZE` | | Removed in PMM v3, because of new clickhouse version |
| `PERCONA_TEST_PMM_CLICKHOUSE_POOL_SIZE` | | Removed in PMM v3, because of new clickhouse version |

#### PostgreSQL configuration
| PMM 2 | PMM 3 | Comments |
|-------|-------|----------|
| `PERCONA_TEST_POSTGRES_ADDR` | `PMM_POSTGRES_ADDR` | |
| `PERCONA_TEST_POSTGRES_DBNAME` | `PMM_POSTGRES_DBNAME` | |
| `PERCONA_TEST_POSTGRES_USERNAME` | `PMM_POSTGRES_USERNAME` | |
| `PERCONA_TEST_POSTGRES_DBPASSWORD` | `PMM_POSTGRES_DBPASSWORD` | |
| `PERCONA_TEST_POSTGRES_SSL_CA_PATH` | `PMM_POSTGRES_SSL_CA_PATH` | |
| `PERCONA_TEST_POSTGRES_SSL_CERT_PATH` | `PMM_POSTGRES_SSL_CERT_PATH` | |
| `PERCONA_TEST_POSTGRES_SSL_KEY_PATH` | `PMM_POSTGRES_SSL_KEY_PATH` | |
| `PERCONA_TEST_POSTGRES_SSL_MODE` | `PMM_POSTGRES_SSL_MODE` | |
| `PERCONA_TEST_PMM_DISABLE_BUILTIN_POSTGRES` | `PMM_DISABLE_BUILTIN_POSTGRES` | |

#### Telemetry & development
| PMM 2 | PMM 3 | Comments |
|-------|-------|----------|
| `PMM_TEST_TELEMETRY_DISABLE_SEND` | `PMM_DEV_TELEMETRY_DISABLE_SEND` | |
| `PERCONA_TEST_TELEMETRY_DISABLE_START_DELAY` | `PMM_DEV_TELEMETRY_DISABLE_START_DELAY` | |
| `PMM_TEST_TELEMETRY_FILE` | `PMM_DEV_TELEMETRY_FILE` | |
| `PERCONA_TEST_TELEMETRY_HOST` | `PMM_DEV_TELEMETRY_HOST` | |
| `PERCONA_TEST_TELEMETRY_INTERVAL` | `PMM_DEV_TELEMETRY_INTERVAL` | |
| `PERCONA_TEST_TELEMETRY_RETRY_BACKOFF` | `PMM_DEV_TELEMETRY_RETRY_BACKOFF` | |
| `PERCONA_TEST_VERSION_SERVICE_URL` | `PMM_DEV_VERSION_SERVICE_URL` | |
| `PERCONA_TEST_STARLARK_ALLOW_RECURSION` | `PMM_DEV_ADVISOR_STARLARK_ALLOW_RECURSION` | |

#### Removed variables
| PMM 2 | PMM 3 | Comments |
|-------|-------|----------|
| `PERCONA_TEST_AUTH_HOST` | | Removed in PMM v3, use `PMM_DEV_PERCONA_PLATFORM_ADDRESS` |
| `PERCONA_TEST_CHECKS_HOST` | | Removed in PMM v3, use `PMM_DEV_PERCONA_PLATFORM_ADDRESS` |
| `PERCONA_TEST_CHECKS_INTERVAL` | | Removed in PMM v3 as it wasn't actually used |
| `PERCONA_TEST_CHECKS_PUBLIC_KEY` | | Removed in PMM v3, use `PMM_DEV_PERCONA_PLATFORM_PUBLIC_KEY` |
| `PERCONA_TEST_NICER_API` | | Removed in PMM v3 |
| `PERCONA_TEST_SAAS_HOST` | | Removed in PMM v3, use `PMM_DEV_PERCONA_PLATFORM_ADDRESS` |

</details>
                                          |
## Advanced configuration

### Networking
| Variable | Description |
|----------|-------------|
| `PMM_PUBLIC_ADDRESS` | External DNS/IP for PMM server |
| `PMM_INTERFACE_TO_BIND` | Network interface binding |

### Database connections
| Variable | Purpose |
|----------|----------|
| `PMM_CLICKHOUSE_*` | ClickHouse connection settings |
| `PMM_POSTGRES_*` | PostgreSQL connection settings |

### Development & testing
| Variable | Use Case |
|----------|----------|
| `PMM_DEV_*` | Development environment settings |
| `PMM_TEST_*` | Testing environment settings |

## Third-party variables

PMM respect vs certain third-party environment variables:

### Supported external Variables
- **Grafana**: All `GF_*` variables
- **VictoriaMetrics**: All `VM_*` variables
- **Kubernetes**: All `KUBERNETES_*` variables
- **System**: Standard variables like `HOME`, `PATH`, etc.
