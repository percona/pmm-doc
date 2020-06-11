.. _pmm.qan:

.. include:: /.res/qan-redirect.rst  
  
############
Introduction
############ 

The :guilabel:`Query Analytics` (QAN) dashboard shows how queries are executed and where they spend their time.  It helps you analyze database queries over time, optimize database performance, and find and remedy the source of problems.

QAN displays metrics in both visual and numeric form; performance-related characteristics appear as plotted graphics with summaries.

.. image:: .res/graphics/png/qan01.png

.. note::

   Query Analytics only supports MySQL and MongoDB. The minimum requirements for MySQL are:

   * MySQL 5.1 or later (if using the slow query log)
   * MySQL 5.6.9 or later (if using Performance Schema)
