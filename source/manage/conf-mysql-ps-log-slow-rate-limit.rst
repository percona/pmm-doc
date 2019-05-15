`Percona Server specific settings <pmm.conf-mysql.settings.ps>`_
==================================================================

`log_slow_rate_limit <pmm.conf-mysql.log-slow-rate-limit>`_
--------------------------------------------------------------------------------

The |log_slow_rate_limit|_ variable defines the fraction of queries captured by
the |slow-query-log|.  A good rule of thumb is to have approximately 100 queries
logged per second.  For example, if your |percona-server| instance processes
10_000 queries per second, you should set ``log_slow_rate_limit`` to ``100`` and
capture every 100th query for the |slow-query-log|.

.. note:: When using query sampling, set |log_slow_rate_type|_ to ``query``
   so that it applies to queries, rather than sessions.

   It is also a good idea to set |log_slow_verbosity|_ to ``full``
   so that maximum amount of information about each captured query
   is stored in the slow query log.

.. seealso::

   |mysql| Documentation
      `Setting variables <https://dev.mysql.com/doc/refman/5.7/en/set-variable.html>`_

.. include:: ../.res/replace.txt
