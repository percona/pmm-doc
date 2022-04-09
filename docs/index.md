# Welcome
??? Full section map (click to show/hide)

    | Check type  |  Description | "query" required (must be empty if no)   |  Availability in PMM | Documentation  |
    |---|---|---|---|---|
    | MYSQL_SHOW |     Executes 'SHOW …' clause against MySQL database.      |Yes | PMM 2.27 and older||
    | MYSQL_SELECT    |     Executes 'SELECT …' clause against MySQL database.       |Yes|PMM 2.27 and older|   |
    | POSTGRESQL_SHOW     |    Executes 'SHOW ALL' command against PosgreSQL database.        | No| PMM 2.27 and older ||
    | POSTGRESQL_SELECT      | Executes 'SELECT …' clause against PosgreSQL database.    | Yes|  PMM 2.27 and older||
    | MONGODB_GETPARAMETER     | Executes db.adminCommand( { getParameter: "*" } ) against MongoDB's "admin" database.    | No | PMM 2.27 and older| [getParameter](https://docs.mongodb.com/manual/reference/command/getParameter/)|
    | MONGODB_BUILDINFO    | Executes db.adminCommand( { buildInfo:  1 } ) against MongoDB's "admin" database.    | No | PMM 2.27 and older| [buildInfo](https://docs.mongodb.com/manual/reference/command/buildInfo/) |
    | MONGODB_GETCMDLINEOPTS          |    Executes db.adminCommand( { getCmdLineOpts: 1 } ) against MongoDB's "admin" database.      | No | PMM 2.27 and older| [getCmdLineOpts](https://docs.mongodb.com/manual/reference/command/getCmdLineOpts/) |
    | MONGODB_REPLSETGETSTATUS     |   Executes db.adminCommand( { replSetGetStatus: 1 } ) against MongoDB's "admin" database.       | No |PMM 2.27 and newer |  [replSetGetStatus](https://docs.mongodb.com/manual/reference/command/replSetGetStatus/) |
    | MONGODB_GETDIAGNOSTICDATA |Executes db.adminCommand( { getDiagnosticData: 1 } ) against MongoDB's "admin" database.   | No | PMM 2.27 and newer| [MongoDB Performance](https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/#full-time-diagnostic-data-capture)| 



=== "Security Checks format"
            ---
        checks:
        - version: 1
            name: example
            summary: Example check
            description: This check is just an example.
            tiers: [anonymous, registered]
            type: MONGODB_BUILDINFO
            script: |
            def check(docs):
                # for compatibility with PMM Server < 2.12
                context = {
                    "format_version_num": format_version_num,
                    "parse_version": parse_version,
                }
                return check_context(docs, context)


            def check_context(docs, context):
                # `docs` is a frozen (deeply immutable) list of dicts where each dict represents a single document in result set.
                # `context` is a dict with additional functions.
                #
                # Global `print` and `fail` functions are available.
                #
                # `check_context` function is expected to return a list of dicts that are then converted to alerts;
                # in particular, that list can be empty.
                # Any other value (for example, string) is treated as script execution failure
                # (Starlark does not support Python exceptions);
                # it is recommended to use global function `fail` for that instead.

                format_version_num = context.get("format_version_num", fail)
                parse_version = context.get("parse_version", fail)

                print("first doc =", repr(docs[0]))

                return [{
                    "summary": "Example summary",
                    "description": "Example description",
                    "severity": "warning",
                    "labels": {
                        "version": format_version_num(10203),
                    }
                }]

=== "Realistic example of security checks"
            ---
        checks:
        - version: 1
            name: mongodb_version
            summary: MongoDB Version
            description: This check returns warnings if MongoDB/PSMDB version is not the latest one.
            tiers: [anonymous, registered]
            type: MONGODB_BUILDINFO
            script: |
            LATEST_VERSIONS = {
                "mongodb": {
                    "3.6": 30620,  # https://docs.mongodb.com/manual/release-notes/3.6/
                    "4.0": 40020,  # https://docs.mongodb.com/manual/release-notes/4.0/
                    "4.2": 40210,  # https://docs.mongodb.com/manual/release-notes/4.2/
                    "4.4": 40401,  # https://docs.mongodb.com/manual/release-notes/4.4/
                },
                "percona": {
                    "3.6": 30620,  # https://www.percona.com/downloads/percona-server-mongodb-3.6/
                    "4.0": 40020,  # https://www.percona.com/downloads/percona-server-mongodb-4.0/
                    "4.2": 40209,  # https://www.percona.com/downloads/percona-server-mongodb-4.2/
                    "4.4": 40401,  # https://www.percona.com/downloads/percona-server-mongodb-4.4/
                },
            }


            def check(docs):
                # for compatibility with PMM Server < 2.12
                context = {
                    "format_version_num": format_version_num,
                    "parse_version": parse_version,
                }
                return check_context(docs, context)


            def check_context(docs, context):
                # `docs` is a frozen (deeply immutable) list of dicts where each dict represents a single document in result set.
                # `context` is a dict with additional functions.
                #
                # Global `print` and `fail` functions are available.
                #
                # `check_context` function is expected to return a list of dicts that are then converted to alerts;
                # in particular, that list can be empty.
                # Any other value (for example, string) is treated as script execution failure
                # (Starlark does not support Python exceptions);
                # it is recommended to use global function `fail` for that instead.

                """
                This check returns warnings if MongoDB/PSMDB version is not the latest one.
                """

                format_version_num = context.get("format_version_num", fail)
                parse_version = context.get("parse_version", fail)

                if len(docs) != 1:
                    return "Unexpected number of documents"

                info = docs[0]

                # extract information
                is_percona = 'psmdbVersion' in info

                # parse_version returns a dict with keys: major, minor, patch, rest, num
                version = parse_version(info["version"])
                print("version =", repr(version))
                num = version["num"]
                mm = "{}.{}".format(version["major"], version["minor"])

                results = []

                if is_percona:
                    latest = LATEST_VERSIONS["percona"][mm]
                    if latest > num:
                        results.append({
                            "summary": "Newer version of Percona Server for MongoDB is available",
                            "description": "Current version is {}, latest available version is {}.".format(format_version_num(num), format_version_num(latest)),
                            "severity": "warning",
                            "labels": {
                                "current": format_version_num(num),
                                "latest":  format_version_num(latest),
                            },
                        })

                    return results

                if True:  # MongoDB
                    latest = LATEST_VERSIONS["mongodb"][mm]
                    if latest > num:
                        results.append({
                            "summary": "Newer version of MongoDB is available",
                            "description": "Current version is {}, latest available version is {}.".format(format_version_num(num), format_version_num(latest)),
                            "severity": "warning",
                            "labels": {
                                "current": format_version_num(num),
                                "latest":  format_version_num(latest),
                            },
                        })

                    return results




=== "Format for Advisor Checks"
        ---
        checks:
        - version: 1
        name: example
        summary: Example check
        description: This check is just an example.
        tiers: [anonymous, registered]
        type: MONGODB_BUILDINFO
        script: |
        def check(docs):
                # for compatibility with PMM Server < 2.12
                context = {
                "format_version_num": format_version_num,
                    "parse_version": parse_version,
                }
                return check_context(docs, context)

            def check_context(docs, context):
                # `docs` is a frozen (deeply immutable) list of dicts where each dict represents a single document in result set.
                # `context` is a dict with additional functions.
                #
                # Global `print` and `fail` functions are available.
                #
                # `check_context` function is expected to return a list of dicts that are then converted to alerts;
            # in particular, that list can be empty.
            # Any other value (for example, string) is treated as script execution failure
                # (Starlark does not support Python exceptions);
            # it is recommended to use global function `fail` for that instead.

            format_version_num = context.get("format_version_num", fail)
            parse_version = context.get("parse_version", fail)

            print("first doc =", repr(docs[0]))

            return [{
                "summary": "Example summary",
                "description": "Example description",
                "severity": "warning",
                "labels": {
                    "version": format_version_num(10203),
                }
            }]
           

=== "Security check example"
    
    ---
    checks:
    - version: 1
    name: mongodb_version
    summary: MongoDB Version
    description: This check returns warnings if MongoDB/PSMDB version is not the latest one.
    tiers: [anonymous, registered]
    type: MONGODB_BUILDINFO
    script: |
      LATEST_VERSIONS = {
          "mongodb": {
              "3.6": 30620,  # https://docs.mongodb.com/manual/release-notes/3.6/
              "4.0": 40020,  # https://docs.mongodb.com/manual/release-notes/4.0/
              "4.2": 40210,  # https://docs.mongodb.com/manual/release-notes/4.2/
              "4.4": 40401,  # https://docs.mongodb.com/manual/release-notes/4.4/
          },
          "percona": {
              "3.6": 30620,  # https://www.percona.com/downloads/percona-server-mongodb-3.6/
              "4.0": 40020,  # https://www.percona.com/downloads/percona-server-mongodb-4.0/
              "4.2": 40209,  # https://www.percona.com/downloads/percona-server-mongodb-4.2/
              "4.4": 40401,  # https://www.percona.com/downloads/percona-server-mongodb-4.4/
          },
      }


      def check(docs):
          # for compatibility with PMM Server < 2.12
          context = {
              "format_version_num": format_version_num,
              "parse_version": parse_version,
          }
          return check_context(docs, context)


      def check_context(docs, context):
          # `docs` is a frozen (deeply immutable) list of dicts where each dict represents a single document in result set.
          # `context` is a dict with additional functions.
          #
          # Global `print` and `fail` functions are available.
          #
          # `check_context` function is expected to return a list of dicts that are then converted to alerts;
          # in particular, that list can be empty.
          # Any other value (for example, string) is treated as script execution failure
          # (Starlark does not support Python exceptions);
          # it is recommended to use global function `fail` for that instead.

          """
          This check returns warnings if MongoDB/PSMDB version is not the latest one.
          """

          format_version_num = context.get("format_version_num", fail)
          parse_version = context.get("parse_version", fail)

          if len(docs) != 1:
              return "Unexpected number of documents"

          info = docs[0]

          # extract information
          is_percona = 'psmdbVersion' in info

          # parse_version returns a dict with keys: major, minor, patch, rest, num
          version = parse_version(info["version"])
          print("version =", repr(version))
          num = version["num"]
          mm = "{}.{}".format(version["major"], version["minor"])

          results = []

          if is_percona:
              latest = LATEST_VERSIONS["percona"][mm]
              if latest > num:
                  results.append({
                      "summary": "Newer version of Percona Server for MongoDB is available",
                      "description": "Current version is {}, latest available version is {}.".format(format_version_num(num), format_version_num(latest)),
                      "severity": "warning",
                      "labels": {
                          "current": format_version_num(num),
                          "latest":  format_version_num(latest),
                      },
                  })

              return results

          if True:  # MongoDB
              latest = LATEST_VERSIONS["mongodb"][mm]
              if latest > num:
                  results.append({
                      "summary": "Newer version of MongoDB is available",
                      "description": "Current version is {}, latest available version is {}.".format(format_version_num(num), format_version_num(latest)),
                      "severity": "warning",
                      "labels": {
                          "current": format_version_num(num),
                          "latest":  format_version_num(latest),
                      },
                  })

              return results
              

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
      <svg width="1544" height="980" viewBox="0 0 1544 980" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_3)">
        <line x1="727" y1="83" x2="727" y2="222" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1297" y1="149" x2="1297" y2="222" stroke="#9A1E39" stroke-width="2"/>
        <line x1="277" y1="372" x2="359" y2="372" stroke="#9A1E39" stroke-width="2"/>
        <line x1="318" y1="150" x2="1296" y2="150" stroke="#9A1E39" stroke-width="2"/>
        <line x1="319" y1="149" x2="319" y2="373" stroke="#9A1E39" stroke-width="2"/>
        <rect x="1324" y="443" width="168" height="38" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1361.62" y="468.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/commands/">Commands</a></tspan></text>
        <rect x="1324" y="393" width="168" height="38" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1359.82" y="418.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/dashboards/">Dashboards</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="618.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/api.html">API</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1432" y="519.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/commands/pmm-admin.html">pmm-admin</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1432" y="569.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/commands/pmm-agent.html">pmm-agent</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="319.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/architecture.html">Architecture</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="358.652"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/interface.html">User Interface </a></tspan><tspan x="1323" y="379.652"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/interface.html">components</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="668.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/victoria-metrics.html">VictoriaMetrics</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1323" y="718.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/glossary.html">Glossary</a></tspan></text>
        <line x1="1418" y1="563" x2="1398" y2="563" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1418" y1="513" x2="1398" y2="513" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1399" y1="481" x2="1399" y2="562" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1312" y1="613" x2="1292" y2="613" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1312" y1="663" x2="1292" y2="663" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1312" y1="713" x2="1292" y2="713" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1312" y1="315" x2="1292" y2="315" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1312" y1="363" x2="1292" y2="363" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1312" y1="413" x2="1292" y2="413" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1312" y1="463" x2="1292" y2="463" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1292" y1="271" x2="1292" y2="714" stroke="#9A1E39" stroke-width="2"/>
        <rect x="1198" y="222" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1264.46" y="252.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/details/">Details</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="607.652"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/render-dashboard-images.html">Render dashboard </a></tspan><tspan x="1039" y="628.652"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/render-dashboard-images.html">images</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="569.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/annotate.html">Annotate</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="519.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/optimize.html">Optimize</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="469.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/secure.html">Secure</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="419.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/upgrade.html">Upgrade</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="319.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/configure.html">Configure</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="369.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/manage-users.html">Manage Users</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="668.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/extend-metrics.html">Extend metrics</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="1039" y="718.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/troubleshoot.html">Troubleshoot</a></tspan></text>
        <line x1="1029" y1="613" x2="1009" y2="613" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1029" y1="663" x2="1009" y2="663" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1029" y1="713" x2="1009" y2="713" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1010" y1="271" x2="1010" y2="714" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1029" y1="315" x2="1009" y2="315" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1029" y1="363" x2="1009" y2="363" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1029" y1="413" x2="1009" y2="413" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1029" y1="463" x2="1009" y2="463" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1029" y1="513" x2="1009" y2="513" stroke="#9A1E39" stroke-width="2"/>
        <line x1="1029" y1="563" x2="1009" y2="563" stroke="#9A1E39" stroke-width="2"/>
        <rect x="915" y="222" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="980.453" y="252.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/how-to/">How to</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="568.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/dbaas.html">DBaaS</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="519.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/security-threat-tool.html">Security Threat Tool</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="469.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/query-analytics.html">Query Analytics</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="419.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/backup.html">Backup and Restore</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="369.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/alerting.html">Integrated Alerting</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="756" y="319.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/interface.html">User Interface</a></tspan></text>
        <line x1="727" y1="271" x2="727" y2="562" stroke="#9A1E39" stroke-width="2"/>
        <line x1="746" y1="315" x2="726" y2="315" stroke="#9A1E39" stroke-width="2"/>
        <line x1="746" y1="363" x2="726" y2="363" stroke="#9A1E39" stroke-width="2"/>
        <line x1="746" y1="413" x2="726" y2="413" stroke="#9A1E39" stroke-width="2"/>
        <line x1="746" y1="463" x2="726" y2="463" stroke="#9A1E39" stroke-width="2"/>
        <line x1="746" y1="513" x2="726" y2="513" stroke="#9A1E39" stroke-width="2"/>
        <line x1="746" y1="563" x2="726" y2="563" stroke="#9A1E39" stroke-width="2"/>
        <rect x="632" y="222" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="703.298" y="252.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/using/">Using</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="443.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/mysql.html">MySQL</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="493.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/mongodb.html">MongoDB</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="543.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/postgresql.html">PostgreSQL</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="593.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/proxysql.html">ProxySQL</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="643.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/aws.html">Amazon RDS</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="693.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/azure.html">Microsoft Azure</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="793.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/linux.html">Linux</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="843.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/external.html">External Services</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="893.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/haproxy.html">HA Proxy</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="943.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/remote.html">Remote Instances</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="486" y="743.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/google.html">Google Cloud Platform</a></tspan></text>
        <line x1="477" y1="738" x2="457" y2="738" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="788" x2="457" y2="788" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="838" x2="457" y2="838" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="888" x2="457" y2="888" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="938" x2="457" y2="938" stroke="#9A1E39" stroke-width="2"/>
        <line x1="458" y1="396" x2="458" y2="939" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="440" x2="457" y2="440" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="488" x2="457" y2="488" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="538" x2="457" y2="538" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="588" x2="457" y2="588" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="638" x2="457" y2="638" stroke="#9A1E39" stroke-width="2"/>
        <line x1="477" y1="688" x2="457" y2="688" stroke="#9A1E39" stroke-width="2"/>
        <rect x="359" y="347" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="430.069" y="377.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/client/">Client</a></tspan></text>
        <rect x="89" y="347" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="157.635" y="377.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/server/">Server</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="82.6934" y="443.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/server/network.html">Network</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="93.9082" y="493.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/server/docker.html">Docker</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="15.7031" y="543.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/server/virtual-appliance.html">Virtual appliance</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="8.51367" y="593.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/server/aws.html">AWS Marketplace</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="9.46289" y="643.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/server/easy-install.html">Easy-install script</a></tspan></text>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="96.7031" y="693.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/server/dbaas.html">DBaaS</a></tspan></text>
        <line x1="180" y1="396" x2="180" y2="689" stroke="#9A1E39" stroke-width="2"/>
        <line x1="179" y1="440" x2="159" y2="440" stroke="#9A1E39" stroke-width="2"/>
        <line x1="179" y1="488" x2="159" y2="488" stroke="#9A1E39" stroke-width="2"/>
        <line x1="179" y1="538" x2="159" y2="538" stroke="#9A1E39" stroke-width="2"/>
        <line x1="179" y1="588" x2="159" y2="588" stroke="#9A1E39" stroke-width="2"/>
        <line x1="179" y1="638" x2="159" y2="638" stroke="#9A1E39" stroke-width="2"/>
        <line x1="179" y1="688" x2="159" y2="688" stroke="#9A1E39" stroke-width="2"/>
        <rect x="225" y="222" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="278.526" y="252.152"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/setting-up/">Setting up</a></tspan></text>
        <rect x="632" y="37" width="188" height="48" rx="9" fill="#B6D7E4" stroke="#9A1E39" stroke-width="2"/>
        <text fill="#001CF5" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="18" letter-spacing="0em" text-decoration="underline"><tspan x="688.682" y="67.1523"><a href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/index.html">Welcome</a></tspan></text>
        </g>
        <defs>
        <clipPath id="clip0_1_3">
        <rect width="1544" height="980" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    </p>

[percona_services]: https://www.percona.com/services
[community]: https://www.percona.com/forums/questions-discussions/percona-monitoring-and-management
[Technical Preview]: details/glossary.md#technical-preview
[easy install]: setting-up/server/easy-install.md
[Setting Up]: setting-up/index.md
[Quickstart install guide]: https://www.percona.com/software/pmm/quickstart
