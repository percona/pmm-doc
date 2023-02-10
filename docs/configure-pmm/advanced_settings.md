# Advanced Settings

![!](../_images/PMM_Settings_Advanced_Settings.jpg)

### Data Retention

*Data retention* specifies how long data is stored by PMM Server. By default, time-series data is stored for 30 days. You can adjust the data retention time to balance your system's available disk space with your metrics history requirements.

### Telemetry

The *Telemetry* switch enables gathering and sending basic **anonymous** data to Percona, which helps us to determine where to focus the development and what is the uptake for each release of PMM. Specifically, gathering this information helps determine if we need to release patches to legacy versions beyond support, determining when supporting a particular version is no longer necessary, and even understanding how the frequency of release encourages or deters adoption.

The following information is gathered:

- PMM Server Integration Alerting feature enabled/disabled
- PMM Server Security Thread Tool feature enabled/disabled
- PMM Server Backup feature enabled/disabled
- PMM Server DBaaS feature enabled/disabled
- PMM Server Check Updates feature disabled
- Detailed information about the version of monitored MySQL services
- Monitored MongoDB services version
- Monitored PostgreSQL services version
- Total Grafana users
- Monitored nodes count
- Monitored services count
- Agents version
- Node type

We do not gather anything that identify a system, but the following two points should be mentioned:

1. The Country Code is evaluated from the submitting IP address before being discarded.

2. We do create an "instance ID" - a random string generated using UUID v4.  This instance ID is generated to distinguish new instances from existing ones, for figuring out instance upgrades.

The first telemetry reporting of a new PMM Server instance is delayed by 24 hours to allow enough time to disable the service for those that do not wish to share any information.

The landing page for this service, [check.percona.com](https://check.percona.com), explains what this service is.

Grafana’s [anonymous usage statistics](https://grafana.com/docs/grafana/latest/administration/configuration/#reporting-enabled) is not managed by PMM. To activate it, you must change the PMM Server container configuration after each update.

As well as via the *PMM Settings* page, you can also disable telemetry with the `-e DISABLE_TELEMETRY=1` option in your docker run statement for the PMM Server.

!!! note alert alert-primary ""

    Telemetry is sent straight away; the 24 hour grace period is not honored.

### Check for updates

When active, PMM will automatically check for updates and put a notification in the home page *Updates* dashboard if any are available.

### Advisors

Advisors are sets of checks grouped by functionality that run a range of database health checks on a registered instance.

The findings are reported on the **Advisors > Failed Checks** page, and an overview is displayed on the Dashboard in the Failed Advisor Checks panel.

The Advisors option is enabled by default.

Checks are re-fetched and rerun at intervals.

See [Working with Advisor checks](advisors.md).

## Public address

The address or hostname PMM Server will be accessible at. Click **Get from browser** to have your browser detect and populate this field automatically.

### DBaaS

!!! caution alert alert-warning "Caution"
    DBaaS functionality is a technical preview that must be turned on with a server feature flag. See [DBaaS](../setting-up/server/dbaas.md).

Enables/disables [DBaaS features](../get-started/dbaas.md) on this server.

!!! caution alert alert-warning "Important"
    Deactivating DBaaS ***does not*** suspend or remove running DB clusters.

### Alerting

Enables [Percona Alerting](../get-started/alerting.md) and reveals the **Percona templated alerts** option on the Alerting page.

### Microsoft Azure Monitoring

!!! caution alert alert-warning "Caution"
    This is a technical preview feature.

Activates Microsoft Azure monitoring.

### Public Address {: #public-address-1 }

Public address for accessing DBaaS features on this server.

