# Welcome

**Percona Monitoring and Management** (PMM) is a free, open-source monitoring tool for MySQL, PostgreSQL, MongoDB, and ProxySQL, and the servers they run on.

PMM helps you improve the performance of your databases, simplify their management, and strengthen their security. It's efficient, quick to [set up](setting-up/index.md), and easy to use.

- PMM **collects** thousands of out-of-the-box performance **metrics** from databases and their hosts.

- The PMM [web UI](using/interface.md) **visualizes data** in [dashboards](details/dashboards/).

- Additional features include checking databases for [security threats](using/security-threat-tool.md).

!!! alert alert-info ""
This is the documentation for the latest release, **PMM {{release}}** ([Release Notes](release-notes/{{release}}.md)).

Here's how the home page looks on our <a href='https://pmmdemo.percona.com/' target='_blank'>free, live demo system</a>.

<a href='https://pmmdemo.percona.com/' target='_blank'>
    <img src="_images/PMM_Home_Dashboard.png" alt="PMM Demo Home Page" width=800px class="imgcenter"/>
</a>

PMM runs in the cloud, on-prem, or across hybrid platforms. It's supported by our [legendary expertise][percona_services] in open source databases, and by a vibrant developer and user [community].

A minimal PMM set-up comprises one [server](details/architecture.md#pmm-server) and a [client agent](details/architecture.md#pmm-client) on every system you want to monitor.

## Start here

- An [easy install] script, which you download, make executable and run. The script installs Docker and runs PMM Server as a container.

- The [Quickstart install guide] shows how to run PMM Server as a Docker container, and how to install PMM Client on Ubuntu or Red Hat Linux hosts.

- [Setting Up] explains in detail how to set up PMM Server, clients, and how to add services.

## Read more

```plantuml format="svg_object" width="90%" height="90%"
@startmindmap ""
title Links to popular sections
skinparam svgLinkTarget _blank
skinparam defaultFontName Chivo
skinparam defaultFontSize 11
<style>
mindmapDiagram {
  node {
    ' Gap within nodes
    Padding 7
    ' Gap between nodes
    Margin 5
  }
}
</style>
' Absolute links - can be useful for exporting map as stand-alone image
' relative links make testing easier but must be changed for local vs hosting
!$base = "https://www.percona.com/doc/percona-monitoring-and-management/2.x"
'!$base = "../2.x"
'!$base = "."
+[#goldenrod] For Sys Admins <&star> <<admin>>
--_ [[$base/setting-up/ Setting up]]
--_ [[$base/how-to/configure.html How to configure]]
--_ [[$base/how-to/upgrade.html How to upgrade]]
--_ [[$base/details/commands/pmm-admin.html pmm-admin]]
--_ [[$base/details/architecture.html Architecture]]
++[#lightblue] For Users <&person> <<user>>
+++_ [[$base/using/interface.html User interface]]
+++_ [[$base/using/query-analytics.html Using Query Analytics]]
+++_ [[$base/using/alerting.html Using Integrated Alerting]]
+++_ [[$base/using/dbaas.html Using DBaaS]]
+++_ [[$base/details/dashboards/ Dashboards reference]]
@endmindmap
```

??? note alert alert-info "Full section map v2 (click to show/hide)"
  <p>
    <img src="_images/site-nav.svg" />
  </p>

[percona_services]: https://www.percona.com/services
[community]: https://www.percona.com/forums/questions-discussions/percona-monitoring-and-management
[technical preview]: details/glossary.md#technical-preview
[easy install]: setting-up/server/easy-install.md
[setting up]: setting-up/index.md
[quickstart install guide]: https://www.percona.com/software/pmm/quickstart
