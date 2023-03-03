# Environment variables

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
| `ENABLE_ALERTING`                                               | Enable integrated alerting.
| `ENABLE_AZUREDISCOVER`                                          | Enable support for discovery of Azure databases.
| `ENABLE_BACKUP_MANAGEMENT`                                      | Enable integrated backup tools.
| `ENABLE_DBAAS`                                                  | Enable DBaaS features.
| `PMM_DEBUG`                                                     | Enables a more verbose log level.
| `PMM_TRACE`                                                     | Enables a more verbose log level including trace-back information.
| `PMM_PUBLIC_ADDRESS`                                            | External IP address or the DNS name on which PMM server is running.