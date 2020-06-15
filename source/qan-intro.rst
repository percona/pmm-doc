.. _pmm.qan:

.. raw:: html

   <!-- Needed for switching between equivalent sections in PMM1/PMM2 -->
   <a id="another-doc-version-link"
      data-location="https://www.percona.com/doc/percona-monitoring-and-management/qan.html"
      href="https://www.percona.com/doc/percona-monitoring-and-management/2.x/qan-intro.html"
      style="display:none;"></a>


###################################
The Query Analytics (QAN) Dashboard
###################################

The :guilabel:`Query Analytics` (QAN) dashboard shows how queries are executed and where they spend their time.  It helps you analyze database queries over time, optimize database performance, and find and remedy the source of problems.

.. note::

   Query Analytics is supported only for MySQL and MongoDB. The minimum requirements for MySQL are:

   * MySQL 5.1 or later (if using the slow query log)
   * MySQL 5.6.9 or later (if using Performance Schema)

.. todo:: add MySQL 8 and MongoDB reqs

QAN displays metrics in both visual and numeric form; performance-related characteristics appear as plotted graphics with summaries.


.. note::

   QAN data update frequency is dependent on network conditions.



.. .. image:: .res/graphics/png/qan01.png

The dashboard is made up of three panels:

- Filters
- Overview
- Details

.. image:: /img/qan-panels.png
   :width: 800px

.. _pmm-qan-query-filtering:
.. _filtering-queries:

*************
Filters Panel
*************

.. image:: /img/qan-filters-panel.png
   :scale: 50%

The Filter panel lists filters, grouped by category.

Filters let you focus on sets of queries--selecting a filter will reduce the Overview list to only those queries matching the filter.

Only the first five of each category are shown. If there are more, the list is expanded by clicking :guilabel:`Show all` beside the category name, and collapsed again with :guilabel:`Show top 5`.

Applying a filter may make other filters inapplicable. These are shown as grayed out and inactive.

.. _pmm.qan.time-date-range.selecting:

.. rubric:: Selecting Time or Date Range

You can further filter the results using the Time range settings device to restrict results to a chosen time period as either an Absolute time range or by choosing one of the pre-defined relative time ranges values.

.. todo:: update image

.. image:: /.res/graphics/png/qan.range-selection.1.png


.. _pmm-qan-top-ten:

**************
Overview Panel
**************

.. image:: /img/qan-overview-panel.png
   :scale: 40%

The Overview panel lists queries and metrics.

The panel comprises three sub-panels:

- Main Columns - The list of queries represented by their :term:`fingerprint`.
- Main metric - A graph of the query's main metric against time, and the current value of the main metric.
- Metrics - Other metrics for the query.

Below these is a utility bar.

.. _pmm.qan.query-summary.query:
.. _pmm.qan.metric.value.viewing:
.. _pmm.qan.query-summary.total:

======================
Main Columns Sub-panel
======================

Each row in the query summary contains information about a single query.

The *Query* column shows the type of query, such as INSERT, or UPDATE, and the queried tables, or collections.

.. The *ID* attribute is a unique hexadecimal number associated with the given query.

.. The *Load*, *Count*, and *Latency* attributes refer to the essential metrics of each query.

.. Their values are plotted graphics and summary values in the numeric form.

.. The summary values have two parts: the average value of the metric, and its percentage with respect to the corresponding total value at the top of the query summary table.

Hovering over the cursor of a metrics query shows the exact value at that point.  Move the cursor along the plotted line to see how the value changes.

.. todo:: updated image showing value on mouse hover

.. The first line of the query summary contains the totals of the *load*, *count*, and *latency* for all queries that were run on the selected database server during the time period that you've specified.

.. The *load* is the amount of time that the database server spent during the selected time or date range running all queries.

.. The *count* is the average number of requests to the server during the specified time or date range.

.. The *latency* is the average amount of time that it took the database server to retrieve and return the data.

=====================
Main Metric Sub-panel
=====================

Items in the Main metric sub-panel can be sorted with the sort drop-down menu.

.. image:: /img/qan-overview-panel-main-metrics-sorting.png


.. todo::

=================
Metrics Sub-panel
=================


===========
Utility bar
===========

Pagination device
-----------------


.. image:: /img/qan-overview-panel-pagination-device.png
   :scale: 30%

Queries are grouped into pages of ten queries with only one page of results visible at any time.  The pagination device moves forwards or backwards through the page list, and lets you jump to a specific page.


Add column device
-----------------

.. image:: /img/qan-overview-panel-add-column-device.png
   :scale: 30%

The Add column button opens a panel showing a list of available metrics. Selecting one adds it to the Metrics sub-panel.


Dimension selector
------------------

.. image:: /img/qan-overview-panel-dimension-selector.png

.. todo::


.. _pmm-qan-query-selecting:
.. _query-detail-section:

*************
Details Panel
*************

.. image:: /img/qan-details-panel.png
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

Details contains a :guilabel:`Query time distribution` bar and a set of :guilabel:`Metrics`.

.. note:: The Query time distribution bar chart is only available for MySQL.

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

- Metric - The Metric name, with a question-mark tool-tip that reveals a description of the metric on mouse-over (see :ref:`ref-qan-metrics`).

- Rate/Second - A historical load graph, with real-time values per unit time.

- Sum - A summation of the metric for the selected query, and the percentage of the total.

.. in some cases, "Complex metric" - calculating the ratio between two metrics ??? Explain what a complex metric is

- Per Query Stats - The value of the metric per query.

.. image:: /img/qan-details-panel-details-tab-metrics.png
   :scale: 30%

============
Examples Tab
============

.. image:: /img/qan-details-panel-examples-tab.png
   :scale: 30%

Shows an example of the selected query's fingerprint or table element.

===========
Explain Tab
===========

Shows the ``explain`` output for the selected query, available as Classic or JSON formats:

- MySQL - Classic and JSON
- MongoDB - JSON only
- PostgreSQL - not supported

==========
Tables Tab
==========

.. image:: /img/qan-details-panel-tables-tab.png
   :scale: 30%

.. _pmm.qan-mongodb:

***************************
Query Analytics for MongoDB
***************************

MongoDB is conceptually different from relational database management systems, such as MySQL and MariaDB.

Relational database management systems store data in tables that represent single entities; complex objects are represented by linking several tables.

In contrast, MongoDB uses the concept of a document where all essential information pertaining to a complex object is stored in one place.

QAN can monitor MongoDB queries. Although MongoDB is not a relational database management system, you analyze its databases and collections in the same interface using the same tools.

.. seealso:: :ref:`pmm.qan-mongodb.conf`
