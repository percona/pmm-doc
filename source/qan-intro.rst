.. raw:: html

   <!-- Needed for switching between equivalent sections in PMM1/PMM2 -->
   <a id="another-doc-version-link"
      data-location="https://www.percona.com/doc/percona-monitoring-and-management/qan.html"
      href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/qan-intro.html"
      style="display:none;"></a>

.. _pmm.qan:
.. _pmm.qan.home-page.opening:
.. _pmm.qan.query-time-distribution:

###################################
The Query Analytics (QAN) Dashboard
###################################

The *Query Analytics* (QAN) dashboard shows how queries are executed and where they spend their time.  It helps you analyze database queries over time, optimize database performance, and find and remedy the source of problems.

.. image:: /_images/PMM_Query_Analytics.jpg

The dashboard is

.. note::

   Query Analytics is supported only for MySQL and MongoDB. The minimum requirements for MySQL are:

   * MySQL 5.1 or later (if using the slow query log)
   * MySQL 5.6.9 or later (if using Performance Schema)

.. todo:: add MySQL 8 and MongoDB reqs

Query Analytics displays metrics in both visual and numeric form; performance-related characteristics appear as plotted graphics with summaries.

.. note::

   Query Analytics data update frequency is dependent on network conditions.

The dashboard is made up of three panels:

- Filters
- Overview
- Details

.. note::

   Query Analytics data retrieval is not instantaneous and can be delayed
   due to network conditions. Query Analytics reports *no data* in such
   situations and displays a gap in the sparkline.

.. _pmm-qan-query-filtering:
.. _filtering-queries:

*************
Filters Panel
*************

.. image:: /_images/PMM_Query_Analytics_filters.jpg
   :scale: 40%

The Filter panel lists filters, grouped by category.

Filters let you focus on sets of queries--selecting a filter will reduce the Overview list to only those queries matching the filter.

Only the first five of each category are shown. If there are more, the list is expanded by clicking *Show all* beside the category name, and collapsed again with *Show top 5*.

Applying a filter may make other filters inapplicable. These are shown as grayed out and inactive.

.. _pmm.qan.time-date-range.selecting:

.. rubric:: Selecting Time or Date Range

You can further filter the results using the *Time range* settings device to restrict results to a chosen time period as either an Absolute time range or by choosing one of the pre-defined relative time ranges values.

.. _pmm-qan-top-ten:
.. _pmm.qan.query-summary.total:
.. _pmm.qan.query-summary.query:
.. _pmm.qan.metric.value.viewing:


**************
Overview Panel
**************

.. image:: /_images/PMM_Query_Analytics_overview-table.jpg
   :scale: 40%

The Overview panel lists queries and metrics.

The panel comprises three sub-panels:

- Main Columns - The list of queries represented by their :term:`Fingerprint`.
- Main metric - A graph of the query's main metric against time, and the current value of the main metric.
- Metrics - Other metrics for the query.

Below these is a utility bar.

======================
Main Columns Sub-panel
======================

Each row in the query summary contains information about a single query.

The *Query* column shows the type of query, such as INSERT, or UPDATE, and the queried tables, or collections.

Mouse-hovering over a column reveals its name, description, and units.

Hovering over the cursor of a metrics query shows the exact value at that point.  Move the cursor along the plotted line to see how the value changes.

=====================
Main Metric Sub-panel
=====================

Items in the Main metric sub-panel can be sorted with the sort drop-down menu.

Pagination device
-----------------

.. image:: /_images/PMM_Query_Analytics_pagination.jpg
   :scale: 30%

Queries are grouped into pages, each showing ten queries.  The pagination device moves forwards or backwards through the page list, and lets you jump to a specific page.

Add column device
-----------------

.. image:: /_images/PMM_Query_Analytics_add-columns.jpg
   :scale: 30%

The *Add column* button opens a panel showing a list of available metrics. Selecting one adds it to the Metrics sub-panel.

Dimension selector
------------------

.. image:: /_images/PMM_Query_Analytics_group-by.jpg
   :scale: 30%



.. _pmm-qan-query-selecting:
.. _query-detail-section:

*************
Details Panel
*************

.. image:: /_images/PMM_Query_Analytics_details.jpg
   :scale: 30%

The Details panel shows details for the query selected in the Overview panel.

Below the selected query fingerprint are four tabs for sub-panels:

- Details
- Examples
- Explain
- Tables

===========
Details Tab
===========

Details contains a *Query time distribution* bar and a set of *Metrics*.

.. attention:: The Query time distribution bar chart is only available for MySQL.

The Query time distribution bar shows a query's total time made up of colored segments, each segment representing the proportion of time spent on one of the follow named activities:

- ``query_time`` - Elapsed time between receiving a request and the returned result.
- ``lock_time``
- ``blk_read_time``
- ``blk_write_time``
- ``innodb_io_r_wait``
- ``innodb_queue_wait``
- ``innodb_rec_lock_wait``
- ``other`` - Remaining uncategorized query time.

Metrics is a table with these headings:

- Metric - The Metric name, with a question-mark tool-tip that reveals a description of the metric on mouse-over.

- Rate/Second - A historical load graph, with real-time values per unit time.

- Sum - A summation of the metric for the selected query, and the percentage of the total.

- Per Query Stats - The value of the metric per query.

============
Examples Tab
============

.. image:: /_images/PMM_Query_Analytics_examples.jpg
   :scale: 30%

Shows an example of the selected query's fingerprint or table element.

===========
Explain Tab
===========

.. image:: /_images/PMM_Query_Analytics_explain.jpg
   :scale: 30%

Shows the ``explain`` output for the selected query, available as Classic or JSON formats:

- MySQL - Classic and JSON
- MongoDB - JSON only
- PostgreSQL - not supported

==========
Tables Tab
==========

.. image:: /_images/PMM_Query_Analytics_tables.jpg
   :scale: 30%

.. _pmm.qan-mongodb:
.. _figure.pmm.qan-mongodb.query-summary-table.mongodb:
.. _figure.pmm.qan-mongodb.query-metrics:

***************************
Query Analytics for MongoDB
***************************

MongoDB is conceptually different from relational database management systems, such as MySQL and MariaDB.

Relational database management systems store data in tables that represent single entities; complex objects are represented by linking several tables.

In contrast, MongoDB uses the concept of a document where all essential information pertaining to a complex object is stored in one place.

QAN can monitor MongoDB queries. Although MongoDB is not a relational database management system, you analyze its databases and collections in the same interface using the same tools.

.. seealso:: :ref:`conf-mongodb-requirements`
