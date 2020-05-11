.. include:: /.res/replace.txt

.. _perf-disable-table-stats:
.. _performance-issues:

################################################################################
Improving |pmm| Performance with |pmm-admin| Table Statistics Options
################################################################################

If a |mysql| instance has a lot of schemas or tables,
|pmm-admin| has two options to help improve the performance of |pmm|:
|opt.dis-tablestats| and
|opt.dis-tablestats-limit|.

.. contents::
   :local:
   :depth: 1

***********************************************************************************************
`Disable per-table statistics for an instance <pmm.conf.mysql.perf.metrics.tablestats>`_
***********************************************************************************************

=====
USAGE
=====

.. code-block:: sh

   sudo pmm-admin add mysql --disable-tablestats

******************************************************************************************************************************
`Change the number of tables beyond which per-table statistics is disabled <pmm.conf.mysql.perf.metrics.tablestats.limit>`_
******************************************************************************************************************************

=====
USAGE
=====


Table statistics collection will be disabled if there are more than specified number of tables (default: server-defined)

Default is 1000, meaning that table statistics are already disabled for that number of tables.

.. code-block:: sh

   sudo pmm-admin add mysql --disable-tablestats-limit
