.. _pmm.glossary-terminology-reference:

########
Glossary
########

.. glossary::
   :sorted:

   Data retention
      By default, Prometheus stores time-series data for 30 days, and :ref:`QAN <QAN>` stores query data for 8 days.  Depending on available disk space and your requirements, you may need to adjust data retention time.  You can control data retention via the :guilabel:`Settings` dashboard.

   DSN
   Data Source Name
      A database server attribute found on the :ref:`QAN <QAN>` page. It informs how :ref:`PMM <PMM>` connects to the selected database.

   GTT
   Grand Total Time
      Grand Total Time (percent of grand total time) is the percentage of time that the database server spent running a specific query, compared to the total time it spent running all queries during the selected period of time.

   External Monitoring Service
      A monitoring service which is not provided by :ref:`PMM <PMM>` directly. It is bound to a running Prometheus exporter. As soon as such an service is added, you can set up the :ref:`Metrics Monitor <Metrics-Monitor>` to display its graphs.

   Metric
   Metrics
      A series of data which are visualized in PMM.

   MM
   Metrics Monitor
      Component of :term:`PMM Server` that provides a historical view of :term:`metrics` critical to a MySQL server instance.

   Monitoring service
      A special service which collects information from the database instance where :term:`PMM Client` is installed.  To add a monitoring service, use the ``pmm-admin add`` command.

   PMM
      Percona Monitoring and Management

   pmm-admin
      A program which changes the configuration of the :ref:`PMM-Client`.

      .. seealso:: :ref:`pmm.ref.pmm-admin`

   PMM annotation
      A feature of PMM Server which adds a special mark to all dashboards and signifies an important event in your application. Annotations are added on the PMM Client by using the ``pmm-admin annotate`` command.

      .. seealso:: :ref:`pmm-admin.annotate`

   PMM Client
      Collects MySQL server metrics, general system metrics, and query analytics data for a complete performance overview.  The collected data is sent to :ref:`PMM-Server`.

      .. seealso:: :ref:`pmm.architecture`

   PMM Docker Image
      A docker image which enables installing the PMM Server by using :program:`docker`.

      .. seealso:: Installing PMM Server using Docker :ref:`run-server-docker`

   PMM Home Page
      The starting page of the PMM portal from which you can have an overview of your environment, open the tools of PMM, and browse to online resources.  On the PMM home page, you can also find the version number and a button to update your PMM Server.

      .. seealso:: :term:`PMM Version`

   PMM Server
      Aggregates data collected by :term:`PMM Client` and presents it in the form of tables, dashboards, and graphs in a web interface.  PMM Server combines the backend API and storage for collected data with a front-end for viewing time-based graphs and performing thorough analysis of your MySQL and MongoDB hosts through a web interface.  Run PMM Server on a host that you will use to access this data.

      .. seealso:: :ref:`pmm.architecture`

   PMM Server Version
      If :term:`PMM Server` is installed via Docker, you can check the current PMM Server version by running ``docker exec``::

         docker exec -it pmm-server head -1 /srv/update/main.yml

   PMM user permissions for AWS
      When creating an `IAM user <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html#CHAP_SettingUp.IAM>`_ for an Amazon RDS DB instance that you intend to monitor in PMM, you need to set all required permissions properly. For this, you may copy the following JSON for your IAM user:

      .. code-block::

         { "Version": "2012-10-17",
           "Statement": [{ "Sid": "Stmt1508404837000",
                           "Effect": "Allow",
                           "Action": [ "rds:DescribeDBInstances",
                                       "cloudwatch:GetMetricStatistics",
                                       "cloudwatch:ListMetrics"],
                                       "Resource": ["*"] },
                         { "Sid": "Stmt1508410723001",
                           "Effect": "Allow",
                           "Action": [ "logs:DescribeLogStreams",
                                       "logs:GetLogEvents",
                                       "logs:FilterLogEvents" ],
                                       "Resource": [ "arn:aws:logs:*:*:log-group:RDSOSMetrics:*" ]}
                        ]
         }


      .. seealso:: Creating an IAM user :ref:`pmm.amazon-rds.iam-user.creating`

   PMM Version
      The version of PMM appears at the bottom of the :term:`PMM Home Page`.

      .. image:: .res/graphics/png/pmm.home-page.1.png

      To update your PMM Server, click :guilabel:`Check for Updates Manually` next to the version number.

      .. seealso:: :term:`PMM Server Version`



   .. QAN ......................................................................


   Query Analytics
   QAN
      Component of :term:`PMM Server` that enables you to analyze MySQL query performance over periods of time.

   Query Load
      The percentage of time that the MySQL server spent executing a specific query.

   Query Metrics Summary Table
      An element of :term:`Query Analytics` which displays the available metrics for the selected query.

   Query Metrics Table
      A tool within :term:`Query Analytics` which lists metrics applicable to the query selected in the :term:`Query Summary Table`.

   Query Summary Table
      A tool within :term:`Query Analytics` which lists the queries which were run on the selected database server during the :term:`Selected Time or Date Range`.

   Query time distribution
      A QAN bar graph that shows a query's total time made up of colored segments, each segment representing the proportion of time spent on one of the follow named activities:

      - ``query_time`` - Elapsed time between receiving a request and the returned result.
      - ``lock_time``
      - ``blk_read_time``
      - ``blk_write_time``
      - ``innodb_io_r_wait``
      - ``innodb_queue_wait``
      - ``innodb_rec_lock_wait``
      - ``other`` - Remaining uncategorized query time.

   Dimension
      In the :term:`Query Analytics` dashboard, to help focus on the possible source of performance issues, you can group queries by *dimension*, one of:

      - Query
      - Service Name
      - Database
      - Schema
      - User Name
      - Client Host

   Fingerprint
      A normalized statement digest---a query string with values removed.



   Quick ranges
      Predefined time periods which are used by :term:`Query Analytics` to collect metrics for queries. The following quick ranges are available:

      - last hour
      - last three hours
      - last five hours
      - last twelve hours
      - last twenty four hours
      - last five days

   Selected Time or Date Range
      A predefined time period (see :term:`Quick ranges`), such as 1 hour, or a range of dates that :term:`QAN` uses to collects metrics.

   Telemetry
      Percona may collect some **anonymous** statistics about the machine where PMM is running.  Currently, only the following information is gathered:

      * PMM Version,
      * Installation Method (Docker, AMI, OVF),
      * the Uptime,
      * PMM Server unique ID.

      Read :ref:`server-admin-gui-telemetry` for more details about what and how information is gathered, and how to disable telemetry on the :guilabel:`Settings` dashboard, if needed.

   Version
      A database server attribute found on the :term:`Query Analytics` page. it informs the full version of the monitored database server, as well as the product name, revision and release number.
