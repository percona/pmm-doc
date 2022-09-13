# PMM components and versions

The following table lists all the PMM client/server components and their versions:


| Component     | Version      |Has the version changed since the last release | URL                                                                                           | GIT HUB URL
|---------------|---------------|----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------ 
| Grafana       | 9.1           | Yes                                          | [Grafana Documentation](https://grafana.com/docs/grafana/latest/administration/configuration/)|[Github Grafana](https://github.com/percona-platform/grafana)


!!! caution alert alert-warning "Important"
    Depending on your architecture other ports may also need to be exposed.
    - For `pmm-agent`, the default listen port is 7777.
    - The default range for agents ports can be changed with the flag `--ports-min` and  `--ports-max`, or in the configuration file.
