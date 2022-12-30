# Upgrade

!!! caution alert alert-warning "Important"
    Upgrade the PMM Server before you upgrade the PMM Client.
    Ensure that the PMM Server version is higher than or equal to the PMM Client version. Otherwise, there might be configuration issues, thus leading to failure in the client-server communication as PMM Server might not be able to identify all the parameters in the configuration.

    For example, for a PMM Server version 2.25.0, the PMM Client version should be 2.25.0 or 2.24.0. If the PMM Client version is 2.26.0, PMM might not work as expected.


## Updating a Server

!!! caution alert alert-warning "Caution"
    - While upgrading PMM to version 2.32.0, it fails. This issue has been resolved for PMM version 2.33.0. However, the issue persists on all the versions prior to 2.33.0. For solution, see the [troubleshooting](../how-to/troubleshoot.md#pmm-server-fails-while-upgrading) section.
    - PMM versions prior to 2.33.0 may not show the latest versions available with instances created from the AWS marketplace in specific environments, including AWS. For solution, see the [troubleshooting](../how-to/troubleshoot.md#pmm-server-not-showing-latest-versions-available-with-the-instances-created-from-aws) section.


Client and server components are installed and updated separately.

PMM Server can run natively, as a Docker image, a virtual appliance, or an AWS cloud instance. Each has its own installation and update steps.

The preferred and simplest way to update PMM Server is with the *PMM Upgrade* panel on the Home page.

![!image](../_images/PMM_Home_Dashboard_Panels_Upgrade.jpg)

The panel shows:

- the current server version and release date;
- whether the server is up to date;
- the last time a check was made for updates.

Click the refresh button to manually check for updates.

If one is available, click the update button to update to the version indicated.

!!! seealso alert alert-info "See also"
    [PMM Server Docker upgrade](../setting-up/server/docker.md#upgrade)

## Updating a PMM-Agent

PMM-Agent can be updated from tarball:

 1. Download `tar.gz` with `pmm2-client`.
 2. Extract it.
 3. Run `./install_tarball` script with the `-u` flag.

**Hint!** The configuration file will be overwritten if you do not provide the `-u` flag while the `pmm-agent` is updated.

## Upgrade from PMM 1

Because of the significant architectural changes between PMM1 and PMM2, there is no direct upgrade path. The approach to making the switch from PMM version 1 to 2 is a gradual transition, outlined [in this blog post](https://www.percona.com/blog/2019/11/27/running-pmm1-and-pmm2-clients-on-the-same-host/).

In short, it involves first standing up a new PMM2 server on a new host and connecting clients to it. As new data is reported to the PMM2 server, old metrics will age with the retention period (30 days, by default), at which point you'll be able to shut down your existing PMM1 server.

Any alerts configured through the Grafana UI will have to be recreated due to the target dashboard id's not matching between PMM1 and PMM2.  In this instance we recommend moving to Alertmanager recipes in PMM2 for alerting which, for the time being, requires a separate Alertmanager instance. We are working on integrating this natively into PMM2 Server and expect to support your existing Alertmanager rules.
