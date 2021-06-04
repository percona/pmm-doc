# Welcome

**Percona Monitoring and Management** (PMM) is a free, open-source monitoring tool for MySQL, PostgreSQL, MongoDB, and ProxySQL, and the servers they run on.

PMM helps you improve the performance of databases, simplify their management, and strengthen their security. It is efficient, quick to set up and easy to use. It runs in cloud, on-prem, or across hybrid platforms. It's supported by [our legendary expertise][PERCONA_SERVICES] in open source databases, and by a [vibrant developer and user community][PMM_FORUM].

!!! important ""
    The latest release is <a href="release-notes/{{release}}.html">PMM {{release}}</a>.

??? "What does it do?"
    - Collects performance data from databases and their hosts.
    - Visualizes thousands of performance metrics, out-of-the-box;
    - Checks databases for security threats.

??? "What can I do with it?"
    - Drill-down and pinpoint where and why a database is running slowly.
    - Watch performance over time.
    - Solve security concerns before they are exploited.

??? "What does it look like?"
    Here's how the home page looks on our
    <a href='https://pmmdemo.percona.com/' target='_blank'>live demo system.</a>

    ![!](_images/PMM_Home_Dashboard.jpg){ width="400px" }

??? "How do I get started?"

    PMM is one *server* and as many *clients* as there are systems you want to monitor. PMM Server collects metrics data from PMM Clients and shows it in a web GUI. PMM Client runs on all systems you want to monitor.

    Read about:

    - [setting up PMM Server](setting-up/server/index.md);
    - [setting up PMM Client](setting-up/client/index.md).

    Or see the [**Quickstart installation guide.**][PMM_QUICKSTART]

??? "How does it work?"

    PMM is a client/server application built by us with our own and third-party open-source tools. (Read more in [Architecture](details/architecture.md).)

    ```plantuml source="_resources/diagrams/1_PMM_Context.puml"
    ```

    **PMM Server**

    PMM Server is the heart of PMM. It receives data from clients, collates it and stores it. Metrics are drawn as tables, charts and graphs within [*dashboards*](details/dashboards/), each a part of the web-based [user interface](using/interface.md).

    **PMM Client**

    PMM Client runs on every database host or node you want to monitor. The client collects server metrics, general system metrics, and query analytics data, and sends it to the server.

    **Percona Platform**

    [Percona Platform](using/platform/) (in development) provides value-added services for PMM.

??? "Where next?"

    Click a link jump to a section.

    ```plantuml format="svg_object" width="90%" height="90%" source="_resources/diagrams/Topics.puml"
    ```

[PERCONA_SERVICES]: https://www.percona.com/services
[PMM_FORUM]: https://www.percona.com/forums/questions-discussions/percona-monitoring-and-management
[PMM_QUICKSTART]: https://www.percona.com/software/pmm/quickstart
[PMMDEMO]: https://pmmdemo.percona.com/
