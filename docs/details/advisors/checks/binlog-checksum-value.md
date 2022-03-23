# MySQL binlog checksum not set 

## Description
Not having binlog checksums is risky for production servers as it can lead to corruption and consequent loss of data.

For more information, see [binlog_checksum in the MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_binlog_checksum).  


## Rule
`SELECT IF(@@global.binlog_checksum='NONE', 1, 0);`


## Resolution
Consider setting binlog_checksum=CRC32 to improve consistency and reliability.
`SET GLOBAL binlog_checksum=CRC32;`
