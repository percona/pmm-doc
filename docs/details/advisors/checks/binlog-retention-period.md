# MySQL binlog expire logs seconds too low

## Description
Too-short rotation cycles for binary logs can make Point In Time Recovery impossible. 

This can also make replicas maintenance more difficult since a window of opportunity for performing maintenance will be as long as the rotation cycle.  

For more information, see [**binlog_expire_logs_seconds** in the MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_binlog_expire_logs_second). 


## Rule
`SELECT IF(LEAST(@@global.expire_logs_days*86400, @@global.binlog_expire_logs_seconds) > 7*86400, 1, 0);`


## Resolution
Consider increasing **binlog_expire_logs_seconds** to at least 604800 seconds (1 week).
