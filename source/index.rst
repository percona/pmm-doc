********************************************************************************
Percona Monitoring and Management Documentation
********************************************************************************

Percona Monitoring and Management (PMM) is an open-source platform
for managing and monitoring MySQL and MongoDB performance.
It is developed by Percona in collaboration with experts
in the field of managed database services, support and consulting.

PMM is a free and open-source solution
that you can run in your own environment
for maximum security and reliability.
It provides thorough time-based analysis for MySQL and MongoDB servers
to ensure that your data works as efficiently as possible.

================================================================================
PMM Concepts
================================================================================

--------------------------------------------------------------------------------
PMM Features
--------------------------------------------------------------------------------

* Why use PMM
* Who uses PMM
* Who should not use PMM

--------------------------------------------------------------------------------
Architecture Overview
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 2

   Client/Server Architecture - an Overview <concepts/architecture>

--------------------------------------------------------------------------------
Exporters
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   mysqld_exporter <concepts/section.exporter.mysqld>
   mongodb_exporter <concepts/section.exporter.mongodb>
   proxysql_exporter <concepts/section.exporter.proxysql>
   node_exporter <concepts/section.exporter.node>
   rds_exporter <concepts/section.exporter.rds>

--------------------------------------------------------------------------------
Firewalls
--------------------------------------------------------------------------------

* PMM Server
* pmm-client

--------------------------------------------------------------------------------
Services
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 2

   MySQL requirements <conf-mysql.requirements>
   MongoDB requirements <conf-mongodb>

--------------------------------------------------------------------------------
Security Features
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 2

   Security Features <concepts/security>

================================================================================
Installing PMM Server
================================================================================

.. toctree::
   :maxdepth: 1

   Docker <install/docker>
   Amazon AWS Marketplace <install/ami>
   Virtual Appliance (OVF) <install/virtual-appliance>


================================================================================
Configuring PMM Server
================================================================================

.. toctree::
   :maxdepth: 1

   Using docker environment variables <glossary.option>

* Using PMM Admin GUI
* Using PMM API

================================================================================
Service Configuration for Best Results
================================================================================

--------------------------------------------------------------------------------
MySQL
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 2

   Slow Log Settings <conf-mysql.slow-log>
   PERFORMANCE_SCHEMA settings <conf-mysql.perf-schema>
   MySQL InnoDB Metrics <conf-mysql.innodb>
   Percona Server-specific settings <conf-mysql.ps>
   MySQL 8 settings <conf-mysql.ps8>
   Executing Custom Queries <conf-mysql.custom-queries>

--------------------------------------------------------------------------------
MongoDB
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   Passing SSL parameters to the mongodb monitoring service<manage/client.mongodb.ssl>

================================================================================
Installing PMM Client
================================================================================

.. toctree::
   :maxdepth: 2

   Installing Clients <install/clients>
   Connecting Clients to the Server  <install/clients.connecting>

================================================================================
Using PMM Client
================================================================================

* Overview of available commands

.. toctree::
   :maxdepth: 1
	      
   Configuring PMM Client with pmm-admin config <manage/client.config> 
   Checking the network <client.check.network>
   Pinging the PMM Server <client.ping>
   Understanding Monitoring Service Aliases <manage/client.aliases>

--------------------------------------------------------------------------------
Adding a MySQL Host
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1
	      
   Understanding MySQL metrics service <manage/client.mysql.metrics>
   Understanding MySQL query analytics service <manage/client.mysql.queries>

--------------------------------------------------------------------------------
Adding a MongoDB host
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   Understanding MongoDB metrics service <manage/client.mongodb.metrics>
   Understanding MongoDB query analytics service <manage/client.mongodb.queries>

--------------------------------------------------------------------------------
Adding a ProxySQL host
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   Adding ProxySQL metrics service <manage/client.proxysql.metrics>

--------------------------------------------------------------------------------
Adding Linux metrics
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   Adding general system metrics service <manage/client.linux.metrics>

--------------------------------------------------------------------------------
PostgreSQL
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   Understanding PostgreSQL metrics service <conf-postgres>

--------------------------------------------------------------------------------
Adding Amazon Web Services
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   Adding an Amazon RDS DB instance to PMM <manage/amazon-rds>

--------------------------------------------------------------------------------
Other configuration commands
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   Passing options to the exporter <manage/client.passing-options>
   Purging metrics data with pmm-admin purge <manage/client.purge>
   View state of exporters with pmm-admin list <manage/client.list> 
   Getting information about pmm-client with pmm-admin info <manage/client.info>
   Repairing orphaned services with pmm-admin repair <manage/client.repair>
   Restarting monitoring services with pmm-admin restart <manage/client.restart>
   Stopping monitoring services with pmm-admin stop <manage/client.stop>
   Starting monitoring services with pmm-admin start <manage/client.start> 
   Displaying passwords with pmm-admin show-passwords <manage/client.passwords>
   Removing monitoring services with pmm-admin rm <manage/client.remove>
   Uninstalling monitoring services with pmm-admin uninstall <manage/client.uninstall>

================================================================================
Configuring AWS RDS or Aurora
================================================================================

.. toctree::
   :maxdepth: 2

   Required AWS settings <manage/amazon-rds.settings>
   Using PMM Add Instance wizard <manage/amazon-rds.add-instance>
   Agentless PMM support for MySQL or PostgreSQL Remote instance <manage/remote-instance>

================================================================================
Using PMM Metrics Monitor
================================================================================

.. toctree::
   :maxdepth: 1

   Understanding Dashboards <metrics-monitor.dashboards>

* Navigating across Dashboards while maintaining same host / timerange 

================================================================================
Using PMM Query Analytics
================================================================================

.. toctree::
   :maxdepth: 1

   Introduction <qan.intro>
   Navigating to Query Analytics <qan.navigation>
   Drilling down on a per query basis <qan.drilling>
   Filtering Queries <qan.filtering>
   Configuring QAN <qan.configuring>

--------------------------------------------------------------------------------
MongoDB specific
--------------------------------------------------------------------------------

.. toctree::
   :maxdepth: 1

   QAN for MongoDB <qan.mongodb>

================================================================================
Extending PMM
================================================================================

.. toctree::
   :maxdepth: 1

   Using External Exporters <manage/client.external.exporters>
   Annotating important Application Events <manage/client.annotations>

* Exploring PMM API

================================================================================
PMM for Percona Customers
================================================================================

.. toctree::
   :maxdepth: 1

   Creating a Metrics Monitor dashboard Snapshot as part of a Percona Support engagement <metrics-monitor.snapshots>

================================================================================
Reference
================================================================================

.. toctree::
   :maxdepth: 1

   Release Notes <release-notes/index>
   Dashboards references <index.metrics-monitor.dashboard>
   Glossary <glossary.terminology>
   How to Contact Percona <contact>
   How to get help <placeholder>
   FAQ <faq>

#   Adding monitoring services <manage/client.add>
