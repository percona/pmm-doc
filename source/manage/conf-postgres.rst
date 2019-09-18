
.. _pmm.qan.postgres.conf:

--------------------------------------------------------------------------------
PostgreSQL
--------------------------------------------------------------------------------

|pmm| provides both metrics and queries monitoring for PostgreSQL. Queries
monitoring needs additional ``pg_stat_statements`` extension to be installed
and enabled.

.. _pmm.qan.postgres.conf-extension:

`Adding PostgreSQL extension for queries monitoring <services-mysql.html#pmm-qan-postgres-conf-extension>`_
------------------------------------------------------------------------------------------------------------

The needed extension is ``pg_stat_statements``. It is included in the official
PostgreSQL contrib package, so you have to install this package first with your
Linux distribution package manager. Particularly, on Debian-based systems it is
done as follows::

   sudo apt-get install postgresql-contrib

Now add/edit the following three lines in your ``postgres.conf`` file::

      shared_preload_libraries = 'pg_stat_statements'
      track_activity_query_size = 2048
      pg_stat_statements.track = all

When the editing is over, restart PostgreSQL.

Finally, the following statement should be executed in the PostgreSQL shell::

   CREATE EXTENSION pg_stat_statements SCHEMA public;

.. _pmm.qan.postgres.conf-add:

`Adding PostgreSQL queries and metrics monitoring <services-mysql.html#pmm-qan-postgres-conf-add>`_
----------------------------------------------------------------------------------------------------

You can add PostgreSQL metrics and queries monitoring with the following command::

   pmm-admin add postgresql --username=pmm --password=pmm 127.0.0.1:5432

where username and password parameters should contain actual PostgreSQL user
credentials (for more information about ``pmm-admin add``, see :ref:`pmm-admin.add`).
Additionally, a service name can be appended to the command line parameters,
otherwise it will be generated automatically as ``<node>-postgresql``.

The output of this command may look as follows:

.. code-block:: bash

   # pmm-admin add postgresql --username=pmm --password=pmm postgres 127.0.0.1:5432
   PostgreSQL Service added.
   Service ID  : /service_id/28f1d93a-5c16-467f-841b-8c014bf81ca6
   Service name: postgres

As a result, you should be able to see data in PostgreSQL Overview dashboard,
and also Query Analytics should contain PostgreSQL queries, if needed extension
was installed and configured correctly.

.. note:: Capturing read and write time statistics is possible only if
   ``track_io_timing`` setting is enabled. This can be done either in
   configuration file or with the following query executed on the running
   system::

      ALTER SYSTEM SET track_io_timing=ON;
      SELECT pg_reload_conf();

.. _pmm.qan.postgres.conf.essential-permission.setting-up:

`Setting up the required user permissions and authentication <services-mysql.html#pmm-qan-postgres-conf-essential-permission.setting-up>`_
------------------------------------------------------------------------------------------------------------------------------------------

Percona recommends that a |postgresql| user be configured for ``SUPERUSER``
level access, in order to gather the maximum amount of data with a minimum
amount of complexity. This can be done with the following command for the
standalone |postgresql| installation::

  CREATE USER pmm_user WITH SUPERUSER ENCRYPTED PASSWORD 'secret';

.. note:: In case of monitoring a |postgresql| database running on
   an Amazon RDS instance, the command should look as follows::

      CREATE USER pmm_user WITH rds_superuser ENCRYPTED PASSWORD 'secret';

.. note:: Specified PostgreSQL user should have enabled local password
   authentication to enable access for |pmm|. This can be set in the
   ``pg_hba.conf`` configuration file changing ``ident`` to ``md5`` for the 
   correspondent user.

.. include:: ../.res/replace.txt
