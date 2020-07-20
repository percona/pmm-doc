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

.. note::

   - Query Analytics is supported only for MySQL and MongoDB. The minimum requirements for MySQL are:

      * MySQL 5.1 or later (if using the slow query log)
      * MySQL 5.6.9 or later (if using Performance Schema)

   - Query Analytics data retrieval is not instantaneous and can be delayed due to network conditions. Query Analytics reports *no data* in such situations and displays a gap in the sparkline.

.. todo:: add MySQL 8 and MongoDB reqs

Query Analytics displays metrics in both visual and numeric form; performance-related characteristics appear as plotted graphics with summaries.

The dashboard contains three panels:

- `Filters Panel`_
- `Overview Panel`_
- `Details Panel`_


.. _pmm-qan-query-filtering:
.. _filtering-queries:

*************
Filters Panel
*************

.. image:: /_images/PMM_Query_Analytics_filters.jpg
   :scale: 40%

- The Filter panel lists filters, grouped by category. Filters let you focus on sets of queries. Selecting one will reduce the Overview list to only those items matching the filter.

- A maximum of the first five of each category are shown. If there are more, the list is expanded by clicking *Show all* beside the category name, and collapsed again with *Show top 5*.

- Applying a filter may make other filters inapplicable. These become grayed out and inactive.

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

Each row of the Overview panel table represents the metrics for a chosen object type, one of:

- Query
- Service Name
- Database
- Schema
- User Name
- Client Host

The object type is chosen with the *dimension* menu.

.. image:: /_images/PMM_Query_Analytics_group-by.jpg

**Columns**

- The first column is the object's identifier. For *Query*, it is the query's fingerprint.

- The second column is the *Main metric*, a reduced graphical representation of the metric over time, called a *sparkline*.

- Metrics columns are added with the *Add column* button.

.. image:: /_images/PMM_Query_Analytics_add-columns.jpg

- When clicked, it becomes a text field and a list of available metrics. Select a metric or enter a search string to reduce the list. Selecting a metric adds it to the panel.

- A metric column is removed by clicking on the column heading and selecting *Remove column*.

- The value plotted in the *main metric* column can be changed by clicking a metric column heading and selecting *Swap with main metric*.

**Sorting**

- The entire list is sorted by one of the columns.

- Click either the up or down caret to sort the list by that column's ascending or descending values.

**Tool-tips**

- For the *Query* dimension, hovering over the information icon reveals the query ID and its example.

- Hovering on a column header reveals an informative tool-tip for that column.

- Hovering on a sparkline shows the data value under the cursor.

- Hovering on column values reveals more details on the value. The contents depends on the type of value.

**Pagination**

- Queries are grouped into pages, each showing up to ten items.

- The pagination device moves forwards or backwards through the page list, and lets you jump to a specific page.

.. image:: /_images/PMM_Query_Analytics_pagination.jpg

.. _pmm-qan-query-selecting:
.. _query-detail-section:

*************
Details Panel
*************

Selecting an item in the Overview panel opens the Details panel with a single `Details Tab`_.

.. image:: /_images/PMM_Query_Analytics_details.jpg
   :scale: 30%

If the dimension is *Query*, three additional tabs are visible: `Examples Tab`_, `Explain Tab`_, and `Tables Tab`_.

===========
Details Tab
===========

This tab contains a *Query time distribution* bar (only for MySQL databases)
and a set of *Metrics* in collapsable subpanels.

- The *Query time distribution* bar shows a query's total time made up of colored segments, each segment representing the proportion of time spent on one of the follow named activities:

   - ``query_time`` - Elapsed time between receiving a request and the returned result
   - ``lock_time``
   - ``blk_read_time``
   - ``blk_write_time``
   - ``innodb_io_r_wait``
   - ``innodb_queue_wait``
   - ``innodb_rec_lock_wait``
   - ``other`` - Remaining uncategorized query time.

- *Metrics* is a table with these headings:

   - *Metric*: The Metric name, with a question-mark tool-tip that reveals a description of the metric on mouse-over.

   - *Rate/Second*: A sparkline chart of real-time values per unit time.

   - *Sum*: A summation of the metric for the selected query, and the percentage of the total.

   - *Per Query Stats*: The value of the metric per query.

- Each row in the table is a metric. The contents depends on the chosen dimension.

.. todo:: Explain metrics for each dimention in a reference section

============
Examples Tab
============

(For *Query* dimension.)

.. image:: /_images/PMM_Query_Analytics_examples.jpg
   :scale: 30%

Shows an example of the selected query's fingerprint or table element.

===========
Explain Tab
===========

(For *Query* dimension.)

.. image:: /_images/PMM_Query_Analytics_explain.jpg
   :scale: 30%

Shows the ``explain`` output for the selected query, available as Classic or JSON formats:

- MySQL - Classic and JSON
- MongoDB - JSON only
- PostgreSQL - not supported

==========
Tables Tab
==========

(For *Query* dimension.)

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

Query Analytics can monitor MongoDB queries. Although MongoDB is not a relational database management system, you analyze its databases and collections in the same interface using the same tools.

.. seealso:: :ref:`conf-mongodb-requirements`
