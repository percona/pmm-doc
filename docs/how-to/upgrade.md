# Upgrade

Client and Server components are installed and updated separately.


## Plan the upgrade order

### Upgrade PMM Server first

Always upgrade the PMM Server before you upgrade the PMM Client.
Ensure that the PMM Server version is equal to or higher than the PMM Client version. Otherwise, configuration issues may arise, potentially causing failures in Client-Server communication, as the PMM Server may not recognize all the configuration parameters.

### Migrating from PMM 2

When upgrading PMM from PMM v2, follow the following staged approach: 

1. upgrade to the latest PMM v2 version
2. Proceed to upgrading to PMM 3. 

Make sure you have access to the machine where PMM Server: 

1. run docker exec -t <pmm-server> supervisorctl stop all to stop all services of pmm-server container
2. run docker exec -t <pmm-server> chown -R pmm:pmm /srv to transfer ownership of all directories and files located in /srv directory to pmm user
3. stop and remove pmm-server container (docker stop pmm-server && docker rm pmm-server )
4. pull a new docker image for PMM Server v3 (once it goes GA, it will be docker pull percona/pmm-server:3 )
5. run a new container based on v3 image ( see above) while remembering to pass the same pmm-data volume to it (docker run -d -v pmm-data:/srv ... percona/pmm-server:3 )



This sequential upgrading process ensures that PMM's internal components are migrated and updated correctly.

## Update the Server

!!! caution alert alert-warning "Known issue for older versions"
    - PMM versions prior to 2.33.0 may not show the latest versions available with instances created from the AWS marketplace in specific environments, including AWS. For solution, see the [troubleshooting](../how-to/troubleshoot.md#pmm-server-not-showing-latest-versions-available-with-the-instances-created-from-aws) section.


PMM Server can run natively, as a Docker image, a virtual appliance, or an AWS cloud instance. Each has its own installation and update steps.



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
