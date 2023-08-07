
# Change the number of tables

You can optimiza PMM performance by changing the number of tables beyond which per-table statistics is disabled as follows:

When adding an instance with `pmm-admin add`, the `--disable-tablestats-limit` option changes the number of tables (from the default of 1000) beyond which per-table statistics collection is disabled.

## USAGE

```sh
pmm-admin add mysql --disable-tablestats-limit=<LIMIT>
```

## EXAMPLE

Add a MySQL instance, disabling per-table statistics collection when the number of tables in the instance reaches 2000.

```sh
pmm-admin add mysql --disable-tablestats-limit=2000
```
