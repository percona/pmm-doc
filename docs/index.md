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

### Links to popular sections

#### For System Administrators

- [Setting up](https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up)
- [How to configure](https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/configure.html)
- [How to upgrade](https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/upgrade.html)
- [pmm-admin](https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/commands/pmm-admin.html)
- [Acrhitecture](https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/architecture.html)

#### For Users

- [User interface](https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/interface.html)
- [Using Query Analytics](https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/query-analytics.html)
- [Using Integrated Alerting](https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/alerting.html)
- [Using DBaaS](https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/dbaas.html)
- [Dashboards reference](https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/dashboards/index.html)

??? note alert alert-info "Full section map (click to show/hide)"
    <p>
      <!-- Maintained at https://www.figma.com/file/UcK1mgqbZv2SPFa1M5AjsU/pmm-doc-sitemap?node-id=1%3A3 -->
        <svg width="1544" height="980" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#a)">
            <path fill="#fff" d="M0 0h1544v980H0z"/>
            <path stroke="#9A1E39" stroke-width="2" d="M727 83v139M1297 149v73M277 372h82M318 150h978M319 149v224"/>
            <rect x="1324" y="443" width="168" height="38" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1361.62" y="468.152">Commands</tspan></text>
            <rect x="1324" y="393" width="168" height="38" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1359.82" y="418.152">Dashboards</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="618.152">API</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1432" y="519.152">pmm-admin</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1432" y="569.152">pmm-agent</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="319.152">Architecture</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="358.652">User Interface </tspan><tspan x="1323" y="379.652">components</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="668.152">VictoriaMetrics</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="718.152">Glossary</tspan></text>
            <path stroke="#9A1E39" stroke-width="2" d="M1418 563h-20M1418 513h-20M1399 481v81M1312 613h-20M1312 663h-20M1312 713h-20M1312 315h-20M1312 363h-20M1312 413h-20M1312 463h-20M1292 271v443"/>
            <rect x="1198" y="222" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1264.46" y="252.152">Details</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="607.652">Render dashboard </tspan><tspan x="1039" y="628.652">images</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="569.152">Annotate</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="519.152">Optimize</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="469.152">Secure</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="419.152">Upgrade</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="319.152">Manage Users</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="369.152">Configure</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="668.152">Extend metrics</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="718.152">Troubleshoot</tspan></text>
            <path stroke="#9A1E39" stroke-width="2" d="M1029 613h-20M1029 663h-20M1029 713h-20M1010 271v443M1029 315h-20M1029 363h-20M1029 413h-20M1029 463h-20M1029 513h-20M1029 563h-20"/>
            <rect x="915" y="222" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="980.453" y="252.152">How to</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="568.152">DBaaS</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="519.152">Security Threat Tool</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="469.152">Query Analytics</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="419.152">Backup and Restore</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="369.152">Integrated Alerting</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="319.152">User Interface</tspan></text>
            <path stroke="#9A1E39" stroke-width="2" d="M727 271v291M746 315h-20M746 363h-20M746 413h-20M746 463h-20M746 513h-20M746 563h-20"/>
            <rect x="632" y="222" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="703.298" y="252.152">Using</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="443.152">MySQL</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="493.152">MongoDB</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="543.152">PostgreSQL</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="593.152">ProxySQL</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="643.152">Amazon RDS</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="693.152">Microsoft Azure</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="793.152">Linux</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="843.152">External Services</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="893.152">HA Proxy</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="943.152">Remote Instances</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="743.152">Google Cloud Platform</tspan></text>
            <path stroke="#9A1E39" stroke-width="2" d="M477 738h-20M477 788h-20M477 838h-20M477 888h-20M477 938h-20M458 396v543M477 440h-20M477 488h-20M477 538h-20M477 588h-20M477 638h-20M477 688h-20"/>
            <rect x="359" y="347" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="430.069" y="377.152">Client</tspan></text>
            <rect x="89" y="347" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="157.635" y="377.152">Server</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="82.6934" y="443.152">Network</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="93.9082" y="493.152">Docker</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="15.7031" y="543.152">Virtual appliance</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="8.51367" y="593.152">AWS Marketplace</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="9.46289" y="643.152">Easy-install script</tspan></text>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="96.7031" y="693.152">DBaaS</tspan></text>
            <path stroke="#9A1E39" stroke-width="2" d="M180 396v293M179 440h-20M179 488h-20M179 538h-20M179 588h-20M179 638h-20M179 688h-20"/>
            <rect x="225" y="222" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space:pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="278.526" y="252.152">Setting up</tspan></text>
            <rect x="632" y="37" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
            <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="688.682" y="67.1523"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/index.html">Welcome</a></tspan></text>
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h1544v980H0z"/>
            </clipPath>
          </defs>
        </svg>
    </p>

[percona_services]: https://www.percona.com/services
[community]: https://www.percona.com/forums/questions-discussions/percona-monitoring-and-management
[technical preview]: details/glossary.md#technical-preview
[easy install]: setting-up/server/easy-install.md
[setting up]: setting-up/index.md
[quickstart install guide]: https://www.percona.com/software/pmm/quickstart
