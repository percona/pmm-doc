.. _pmm.conf-mysql.log-slow-verbosity:

######################
``log_slow_verbosity``
######################

``log_slow_verbosity`` variable specifies how much information to include in
the slow query log. It is a good idea to set ``log_slow_verbosity`` to ``full``
so that maximum amount of information about each captured query is stored.

.. seealso::

   |mysql| Documentation
      `Setting variables <https://dev.mysql.com/doc/refman/5.7/en/set-variable.html>`_

.. _long_query_time: http://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_long_query_time

.. _log_slow_rate_limit: https://www.percona.com/doc/percona-server/5.7/diagnostics/slow_extended.html#log_slow_rate_limit

.. _log_slow_rate_type: https://www.percona.com/doc/percona-server/5.7/diagnostics/slow_extended.html#log_slow_rate_type

.. _log_slow_verbosity: https://www.percona.com/doc/percona-server/5.7/diagnostics/slow_extended.html#log_slow_verbosity

.. _slow_query_log_always_write_time: https://www.percona.com/doc/percona-server/5.7/diagnostics/slow_extended.html#slow_query_log_always_write_time

.. _slow_query_log_use_global_control: https://www.percona.com/doc/percona-server/5.7/diagnostics/slow_extended.html#slow_query_log_use_global_control

.. include:: ../.res/replace.txt
