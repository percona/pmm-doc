###########
QAN Metrics
###########

*******
MongoDB
*******

.. csv-table:: MongoDB Metrics
   :header-rows: 1

    Metric Name     , Metric Key          , Unit Type      , Relation                   , Relation Units
    Docs Returned   , ``docs_returned``   , per second     ,                            ,                 
    Docs Scanned    , ``docs_scanned``    , per second     , Rows_examined_sum_per_rows , per row sent    
    Query Count     , ``num_queries``     , per second     ,                            ,                 
    Query Time      , ``query_time``      , per second     ,                            ,                 
    Response Length , ``response_length`` , per second     , Bytes_sent_sum_per_rows    , bytes per row   


*****
MySQL
*****

.. csv-table:: MySQL Metrics
   :header-rows: 1

+----------------------+-----------------------+----------------+-----------------------------------------+------------|
| Metric Name          | Metric Key            | Unit Type      | Relation                                | Relation Units  |
+======================+=======================+================+=========================================+============+========|
| Query Count          | ``num_queries``       | per second     |                                         |                 |
| Query Time           | ``query_time``        |                |                                         |                 |
| Lock Time            | ``lock_time``         | unit-avg-load  | Lock_time_avg_per_query_time            | of query time   |
| Innodb Row Lock Wait |                       | unit-avg-load  | InnoDB_rec_lock_wait_avg_per_query_time | of query time   |
| Innodb IO Read Wait  | ``innodb_io_r_wait``  | unit-avg-load  | InnoDB_IO_r_wait_avg_per_query_time     | of query time   |
| Innodb Queue Wait    | ``innodb_queue_wait`` | unit-avg-load  | InnoDB_queue_wait_avg_per_query_time    | of query time   |
| Innodb Read Ops      |                       | per second     | 
| Innodb Read Bytes     | ``innodb_io_r_bytes`` | per second     | InnoDB_IO_r_bytes_sum_per_io           | io size
| Innodb Distinct Pages
| Query Cache Hits
| Rows Sent
| Bytes Sent
| Rows Examined         | ``rows_examined``     per second      Rows_examined_sum_per_rows      per row sent
| Rows Affected         | ``rows_affected``     per second    
| External Sorts<small>(Filesort) | | per second | Filesort_sum_per_query | of queries
| External Sorts of Disk<small>(Filesort on disk)| | per second | | Filesort_on_disk_sum_per_query | of queries |
| External Sort Passes<small>(Merge Passes) | | per second | | Merge_passes_sum_per_external_sort | per external sort |
| Cartesian Products<small>(Full Joins) | | per second | | Full_join_sum_per_query | of queries |
| Full Table Scans | | per second | | Full_scan_sum_per_query | of queries |
| Queries Requiring Tmp Table In Memory | | per second | | Tmp_table_sum_per_query | of queries |
| Number of Tmp table in Memory | | rate-sec | | Tmp_tables_sum_per_query_with_tmp_table | per query with tmp table |


Queries Requiring Tmp Table on Disk


	
	

( per sec )


	
	

Tmp_table_on_disk_sum_per_query


	

of queries


Number of Tmp Tables on Disk


	
	

( per sec )


	
	

Tmp_disk_tables_sum_per_query_with_tmp_table


	

per query with disk tmp table


Total Size of Tmp Tables


	
	

( per sec )


	
	

Tmp_table_sizes_sum_per_query_with_any_tmp_table


	

per query
