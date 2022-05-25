# ClickHouse


You can use an external Clickhouse database instance outside the PMM Server container running on other hosts.

## Environment variables

PMM predefines certain flags that allow you to use ClickHouse parameters as environment variables:

To use ClickHouse as an external database instance, use the following environment variables: 
 
`PERCONA_TEST_PMM_CLICKHOUSE_ADDR -> hostname:port`
:   Name of the host and port of the external ClickHouse database instance. 

**Optional environment variables**

`PERCONA_TEST_PMM_CLICKHOUSE_DATABASE -> database name`
:   Database name of the external ClickHouse database instance.

`​​PERCONA_TEST_PMM_CLICKHOUSE_POOL_SIZE ->` [pool size](https://github.com/ClickHouse/ClickHouse/blob/master/programs/server/config.xml#L1130)
:   The number of simultaneous queries  you can run for this connection.

`PERCONA_TEST_PMM_CLICKHOUSE_BLOCK_SIZE ->` [max_block_size](https://clickhouse.com/docs/en/operations/settings/settings/#setting-max_block_size)
:   The number of rows to load from tables in one block for this connection.
 
**Example**

To use ClickHouse as an external database instance start the PMM docker with the specified variables for external Clickhouse:
​​

```sh
-e PERCONA_TEST_PMM_CLICKHOUSE_ADDR=$ADDRESS:$PORT
-e PERCONA_TEST_PMM_CLICKHOUSE_DATABASE=$DB
-e PERCONA_TEST_PMM_CLICKHOUSE_POOL_SIZE=1 
-e PERCONA_TEST_PMM_CLICKHOUSE_BLOCK_SIZE=65000
```

## Troubleshooting

To troubleshoot issues, see the ClickHouse [troubleshooting documentation](https://clickhouse.com/docs/en/operations/troubleshooting/).

