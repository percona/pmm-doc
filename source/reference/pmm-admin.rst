.. _pmm.ref.pmm-admin:

###################################
pmm-admin - PMM Administration Tool
###################################

****
NAME
****

``pmm-admin`` - Administer PMM

********
SYNOPSIS
********

``pmm-admin [OPTIONS] COMMAND [FLAGS]``

``pmm-admin add mongodb|mysql|postgresql|proxysql``

``pmm-admin remove <service-type> [<service-name>]``

``pmm-admin register``

``pmm-admin status --server-url=<SERVER-URL>``

``pmm-admin list --server-url=<SERVER-URL>``

``pmm-admin register --server-url=<SERVER-URL>``
   Register the current node with the PMM Server located at ``SERVER-URL``.

***********
DESCRIPTION
***********

``pmm-admin`` is a command-line tool for administering PMM using a set of COMMAND keywords and associated FLAGS.

PMM communicates with the PMM Server via a PMM agent process.

*******
OPTIONS
*******

There are two sets of options: general, and those relating to the connection to PMM Server.

General Options
===============

``--debug``
   Enable debug logging
  
``-h``, ``--help``
   Show help.

``--help-long``
   Show extended help.

``--help-man``
   Generate ``man`` format help. (Use ``pmm-admin --help-man | man -l -`` to view.)

``--json``
   Enable JSON output

``--trace``
   Enable trace logging (implies debug).
   
``--version``
   Show the application version and exit.

Connection Options
==================

``--server-url=SERVER-URL``
   PMM Server URL in `https://username:password@pmm-server-host/` format.

``--server-insecure-tls``
   Skip PMM Server TLS certificate validation.
  
********
COMMANDS
********

General Commands
================

``help [<COMMAND>]``
    Show help for ``COMMAND``.

Information Commands
====================
    
``list --server-url=<SERVER-URL> [<flags>]``
    Show Services and Agents running on this Node

``status --server-url=<SERVER-URL> [<flags>]``
    Show the following information about a local pmm-agent, and its connected server and client:
    
    - Agent: Agent ID, Node ID.
    - PMM Server: URL and version.
    - PMM Client: connection status, time drift, latency, pmm-admin and pmm-agent versions.
    - Agents: Agent ID path and client name.

``summary --server-url=<SERVER-URL> [<flags>]``
    Fetch system data for diagnostics.

    Flags:

    ``--filename="<filename>"``  
       The Summary Archive filename.

    ``--skip-server``
       Skip fetching ``logs.zip`` from PMM Server.
      
    ``--pprof``
       Include performance profiling data in the summary.
    
Configuration Options
=====================
    
``config [<flags>] [<node-address>] [<node-type>] [<node-name>]``
    Configure a local ``pmm-agent``.

    ``--node-id=NODE-ID``
       Node ID (default is autodetected)
    ``--node-model=NODE-MODEL``
       Node model
    ``--region=REGION``
       Node region
    ``--az=AZ``
       Node availability zone
    ``--force``
       Remove Node with that name with all dependent Services and Agents if one exist

``register [<flags>] [<node-address>] [<node-type>] [<node-name>]``
    Register the current Node with the PMM Server.

    ``--machine-id="/machine_id/9812826a1c45454a98ba45c56cc4f5b0"``  
       Node machine-id (default is auto-detected).
    ``--distro="linux"``
       Node OS distribution (default is auto-detected).
    ``--container-id=CONTAINER-ID``
       Container ID.
    ``--container-name=CONTAINER-NAME``  
       Container name.
    ``--node-model=NODE-MODEL``
       Node model.
    ``--region=REGION``
       Node region.
    ```--az=AZ``
       Node availability zone.
    ``--custom-labels=CUSTOM-LABELS``\
       Custom user-assigned labels.
    ``--force``
       Remove Node with that name with all dependent Services and Agents if one exists.
    
``remove [<flags>] <service-type> [<service-name>]``
    Remove Service from monitoring.

    ``--service-id=SERVICE-ID``
       Service ID.

MongoDB Options
===============
    
``add mongodb [<flags>] [<name>] [<address>]``
    Add MongoDB to monitoring.

    ``--node-id=NODE-ID``
       Node ID (default is auto-detected).
    ``--pmm-agent-id=PMM-AGENT-ID``
       The pmm-agent identifier which runs this instance (default is auto-detected).
    ``--username=USERNAME``
       MongoDB username.
    ``--password=PASSWORD``
       MongoDB password.
    ``--query-source=profiler``
       Source of queries, one of: profiler, none (default: profiler).
    ``--environment=ENVIRONMENT``
       Environment name.
    ``--cluster=CLUSTER``
       Cluster name.
    ``--replication-set=REPLICATION-SET``  
       Replication set name.
    ``--custom-labels=CUSTOM-LABELS``
       Custom user-assigned labels.
    ``--skip-connection-check``
       Skip connection check.
    ``--tls``
       Use TLS to connect to the database.
    ``--tls-skip-verify``
       Skip TLS certificates validation.

MySQL Options
=============
    
``add mysql [<flags>] [<name>] [<address>]``
    Add MySQL to monitoring.

    ``--socket=SOCKET``
       Path to MySQL socket.
    ``--node-id=NODE-ID``
       Node ID (default is auto-detected).
    ``--pmm-agent-id=PMM-AGENT-ID``
       The pmm-agent identifier which runs this instance (default is auto-detected).
    ``--username="root"``
       MySQL username.
    ``--password=PASSWORD``
       MySQL password.
    ``--query-source=slowlog``
       Source of SQL queries, one of: slowlog, perfschema, none (default: slowlog).
    ``--disable-queryexamples``
       Disable collection of query examples.
    ``--size-slow-logs=SIZE-SLOW-LOGS``
       Rotate slow log file at this size (default: server-defined; negative value disables rotation).
    ``--disable-tablestats``
       Disable table statistics collection.
    ``--disable-tablestats-limit=DISABLE-TABLESTATS-LIMIT``  
       Table statistics collection will be disabled if there are more than specified number of tables
       (default: server-defined).
    ``--environment=ENVIRONMENT``
       Environment name.
    ``--cluster=CLUSTER``
       Cluster name.
    ``--replication-set=REPLICATION-SET``  
       Replication set name.
    ``--custom-labels=CUSTOM-LABELS``
       Custom user-assigned labels.
    ``--skip-connection-check``
       Skip connection check.
    ``--tls``
       Use TLS to connect to the database.
    ``--tls-skip-verify``
       Skip TLS certificates validation.

PostgreSQL Options
==================
    
``add postgresql [<flags>] [<name>] [<address>]``
    Add PostgreSQL to monitoring.

    ``--node-id=NODE-ID``
      Node ID (default is auto-detected).
    ``--pmm-agent-id=PMM-AGENT-ID``
       The pmm-agent identifier which runs this instance (default is auto-detected).
    ``--username="postgres"``
       PostgreSQL username.
    ``--password=PASSWORD``
       PostgreSQL password.
    ``--query-source=pgstatements``
       Source of SQL queries, one of: pgstatements, none (default: pgstatements).
    ``--environment=ENVIRONMENT``
       Environment name.
    ``--cluster=CLUSTER``
       Cluster name.
    ``--replication-set=REPLICATION-SET``  
       Replication set name
    ``--custom-labels=CUSTOM-LABELS``
       Custom user-assigned labels.
    ``--skip-connection-check``
       Skip connection check.
    ``--tls``
       Use TLS to connect to the database.
    ``--tls-skip-verify``
       Skip TLS certificates validation.

ProxySQL Options
================
    
``add proxysql [<flags>] [<name>] [<address>]``
    Add ProxySQL to monitoring.

    ``--node-id=NODE-ID``
       Node ID (default is auto-detected).
    ``--pmm-agent-id=PMM-AGENT-ID``
       The pmm-agent identifier which runs this instance (default is auto-detected).
    ``--username="admin"``
       ProxySQL username.
    ``--password="admin"``
       ProxySQL password.
    ``--environment=ENVIRONMENT``
       Environment name.
    ``--cluster=CLUSTER``
       Cluster name.
    ``--replication-set=REPLICATION-SET``  
       Replication set name.
    ``--custom-labels=CUSTOM-LABELS``
       Custom user-assigned labels.
    ``--skip-connection-check``
       Skip connection check.
    ``--tls``
       Use TLS to connect to the database.
    ``--tls-skip-verify``
       Skip TLS certificates validation.
    
********
EXAMPLES
********

.. code-block:: sh

   # pmm-admin status
   Agent ID: /agent_id/c2a55ac6-a12f-4172-8850-4101237a4236
   Node ID : /node_id/29b2cc24-3b90-4892-8d7e-4b44258d9309
   PMM Server:
    URL : https://x.x.x.x:443/
    Version: 2.5.0
   PMM Client:
    Connected : true
    Time drift: 2.152715ms
    Latency : 465.658µs
    pmm-admin version: 2.5.0
    pmm-agent version: 2.5.0
   Agents:
    /agent_id/aeb42475-486c-4f48-a906-9546fc7859e8 mysql_slowlog_agent Running
