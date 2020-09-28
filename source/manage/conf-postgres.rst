
.. _pmm.qan.postgres.conf:

##########
PostgreSQL
##########

There are two options for monitoring PostgreSQL database queries:

- ``pg_stat_monitor``, a new extension created by Percona, based on ``pg_stat_statements`` and compatible with it.

- ``pg_stat_statements``, the original extension created by PostgreSQL, part of the ``postgres-contrib`` package available on Linux.

``pg_stat_monitor`` provides all the features of ``pg_stat_statements``, but extends it to provide bucket-based data aggregation, a feature missing from ``pg_stat_statements``. (``pg_stat_statements`` accumulates data without providing aggregated statistics or histogram information.)

*******************
``pg_stat_monitor``
*******************

``pg_stat_monitor`` collects statistics and aggregates data in a data collection unit called a *bucket*.

You can specify:
- the number of buckets;
- how much space is available for all buckets;
- how long each bucket is used to collect data (known as the bucket expiry).

When a bucket's expiration time is reached, accumulated statistics are reset and data is stored in the next available bucket. When all buckets have been used, the first bucket is reused and its contents overwritten.

If a bucket fills before its expiration time is reached, the next bucket is used.


=============
Compatibility
=============

``pg_stat_monitor`` is compatible with:

- PostgreSQL versions 11 and 12
- Percona Distribution for PostgreSQL versions 11 and 12

=======
Install
=======

This extension can be installed using standard Linux package manager tools, or by downloading and compiling the source code.


**Linux package manager**


.. code-block:: sh

   sudo apt-get -y install lsb-release gnupg wget
   wget https://repo.percona.com/apt/percona-release_latest.$(lsb_release -sc)_all.deb && dpkg -i percona-release_latest.$(lsb_release -sc)_all.deb

   # For 11
   percona-release enable ppg-11 release
   ## For 12
   percona-release enable ppg-12 release

   sudo apt-get update

   sudo apt-get install



**Download and compile source code**




.. seealso::

   `Installing from source code <https://github.com/percona/pg_stat_monitor#installation>`__


=========
Configure
=========

1. Via psql

.. code-block:: sql

   postgres=# alter system set shared_preload_libraries=pg_stat_monitor;
   ALTER SYSTEM

.. code-block:: sh

   sudo systemctl restart postgresql-11


.. code-block:: sql

   postgres=# create extension pg_stat_monitor;
   CREATE EXTENSION


Restart

2. Before start up

Add this line to your ``postgresql.conf`` file:

.. code-block:: ini

   shared_preload_libraries = 'pg_stat_monitor'


========================
Configuration Parameters
========================

Here are the configuration parameters, available values ranges, and default values. All require a restart of PostgreSQL except for ``pg_stat_monitor.pgsm_track_utility`` and ``pg_stat_monitor.pgsm_normalized_query``.

To make settings permanent, add them to your ``postgresql.conf`` file before starting your PostgreSQL instance.


``pg_stat_monitor.pgsm_max`` (5000-2147483647 bytes) Default: 5000
    Defines the limit of shared memory. Memory is used by buckets in a circular manner and is divided between buckets equally when PostgreSQL starts.

``pg_stat_monitor.pgsm_query_max_len`` (1024-2147483647 bytes) Default: 1024
    The maximum size of the query. Long queries are truncated to this length to avoid unnecessary usage of shared memory. This parameter must be set before PostgreSQL starts.

``pg_stat_monitor.pgsm_enable`` (0-1) Default: 1 (true).
    Enables or disables monitoring. A value of ``Disable`` means that ``pg_stat_monitor`` will not collect statistics for the entire cluster.

``pg_stat_monitor.pgsm_track_utility`` (0-1) Default: 1 (true)
    Controls whether utility commands (all except SELECT, INSERT, UPDATE and DELETE)
    are tracked.

``pg_stat_monitor.pgsm_normalized_query`` (0-1) Default: 0 (false)
    By default, a query shows the actual parameter instead of a placeholder (as `$n` where `n` is an integer). Set to 1 to change to showing placeholders.

``pg_stat_monitor.pgsm_max_buckets`` (1-10) Default: 10
    Sets the maximum number of available data buckets.

``pg_stat_monitor.pgsm_bucket_time`` (1-2147483647 seconds) Default: 60
    Sets the lifetime of the bucket. The system switches between buckets on the basis of this value.

``pg_stat_monitor.pgsm_object_cache`` (50-2147483647) Default: 50
    The maximum number of objects in the information cache.

``pg_stat_monitor.pgsm_respose_time_lower_bound`` (1-2147483647 milliseconds) Default: 1
    Sets the lower bound of the execution time histogram.

``pg_stat_monitor.pgsm_respose_time_step`` (1-2147483647 milliseconds) Default: 1
    Sets the time value of the steps for the histogram.

``pg_stat_monitor.pgsm_query_shared_buffer`` (500000-2147483647 bytes) Default: 500000
   Sets the query shared_buffer size.

``pg_stat_monitor.pgsm_track_planning`` (0-1) Default: 1 (true)
   Whether to track planning statistics.



.. _pmm.qan.postgres.conf-extension:

**********************
``pg_stat_statements``
**********************

``pg_stat_statements`` is included in the official PostgreSQL ``postgres-contrib`` available from your Linux distribution package manager.

=======
Install
=======

For Debian-based systems:

.. code-block:: bash

   sudo apt-get install postgresql-contrib

=========
Configure
=========

1. Add or change these lines in your ``postgres.conf`` file then restart your PostgreSQL instance.

   .. code-block:: ini

      shared_preload_libraries = 'pg_stat_statements' # Load the extension
      track_activity_query_size = 2048 # Increase tracked query string size
      pg_stat_statements.track = all # Track all statements incl. nested


2. Install the extension (run in the ``postgres`` database).

   .. code-block:: sql

      CREATE EXTENSION pg_stat_statements SCHEMA public;


.. _pmm.qan.postgres.conf-add:

************************************************
Adding PostgreSQL queries and metrics monitoring
************************************************

You can add PostgreSQL metrics and queries monitoring with the following command:

.. code-block:: bash

   pmm-admin add postgresql --username=pmm --password=pmm

where username and password parameters should contain actual PostgreSQL user
credentials.

Additionally, two positional arguments can be appended to the command line
flags: a service name to be used by PMM, and a service address. If not
specified, they are substituted automatically as ``<node>-postgresql`` and
``127.0.0.1:5432``.

The command line and the output of this command may look as follows:

.. code-block:: bash

   pmm-admin add postgresql --username=pmm --password=pmm postgres 127.0.0.1:5432
   PostgreSQL Service added.
   Service ID  : /service_id/28f1d93a-5c16-467f-841b-8c014bf81ca6
   Service name: postgres

As a result, you should be able to see data in PostgreSQL Overview dashboard,
and also Query Analytics should contain PostgreSQL queries, if the needed
extension was installed and configured correctly.

Beside positional arguments shown above you can specify service name and
service address with the following flags: ``--service-name``, ``--host`` (the
hostname or IP address of the service), and ``--port`` (the port number of the
service). If both flag and positional argument are present, flag gains higher
priority. Here is the previous example modified to use these flags:

.. code-block:: bash

   pmm-admin add postgresql --username=pmm --password=pmm --service-name=postgres --host=127.0.0.1 --port=270175432


It is also possible to add a PostgreSQL instance using a UNIX socket with just the ``--socket`` flag followed by the path to a socket:

.. code-block:: bash

   pmm-admin add postgresql --socket=/var/run/postgresql


Capturing read and write time statistics is possible only if
``track_io_timing`` setting is enabled. This can be done either in
configuration file or with the following query executed on the running
system:

.. code-block:: sql

   ALTER SYSTEM SET track_io_timing=ON;
   SELECT pg_reload_conf();

.. _pmm.qan.postgres.conf.essential-permission.setting-up:

***********************************************************
Setting up the required user permissions and authentication
***********************************************************

Percona recommends that a PostgreSQL user be configured for ``SUPERUSER``
level access, in order to gather the maximum amount of data with a minimum
amount of complexity. This can be done with the following command for the
standalone PostgreSQL installation:

.. code-block:: sql

  CREATE USER pmm_user WITH SUPERUSER ENCRYPTED PASSWORD 'secret';


In case of monitoring a PostgreSQL database running on an Amazon RDS instance, the command should look as follows:

.. code-block:: sql

   CREATE USER pmm_user WITH rds_superuser ENCRYPTED PASSWORD 'secret';

.. note:: Specified PostgreSQL user should have enabled local password
   authentication to enable access for PMM. This can be set in the
   ``pg_hba.conf`` configuration file changing ``ident`` to ``md5`` for the
   correspondent user. Also, this user should be able to connect to the
   ``postgres`` database which we have installed the extension into.





.. seealso::

   - `pg_stat_monitor Github repository <https://github.com/percona/pg_stat_monitor>`__

   - `PostgreSQL pg_stat_statements module <https://www.postgresql.org/docs/current/pgstatstatements.html>`__
