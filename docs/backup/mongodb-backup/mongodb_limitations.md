# MongoDB Backup and Restore support matrix

Creating and restoring MongoDB backups in PMM currently has the following limitations and requirements:

- Restoring on different Replica set/Cluster is not supported.
- Physical backups and restores suppoted only for **Percona Server for MongoDB**
- Physical restores are not supported for deployments with arbiter nodes. For more information, see the [Percona Backup for MongoDB documentation](https://docs.percona.com/percona-backup-mongodb/usage/restore.html#physical-restore-known-limitations).
- All types of backups on sharded cluster setups are currently not supported.
- Retention policy is supported only for snapshot types of scheduled backups and for the S3-compatible storage type.
- Before restoring, make sure to prevent clients from accessing database.
  
## Support matrix

| Operation (Backup or Restore) | Backup type (Logical or Physical) | Full or PITR | Storage type (S3 or Local) | DB running in container (Containerized) | Support level|                                                                    
| -------------- | ---------------- | ---- | -------- | ------------- | --------------------------------------- |
| Backup         | Logical          | PITR  | S3       | Yes           | <b style="color:#5794f2;"><b style="color:#5794f2;">Full</b></b>                                  |                                                                               |
| Backup         | Logical          | PITR  | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | PITR  | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Logical          | PITR  | Local    | No            | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Logical          | Full   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | Full   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | Full   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Logical          | Full   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Physical         | PITR  | S3       | Yes           | <b style="color:#e36526;">No</b>                                       
| Backup         | Physical         | PITR  | S3       | No            | <b style="color:#e36526;">No</b>                                       
| Backup         | Physical         | PITR  | Local    | Yes           | <b style="color:#e36526;">No</b>                                       
| Backup         | Physical         | PITR  | Local    | No            | <b style="color:#e36526;">No</b>                                      
| Backup         | Physical         | Full   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                   
| Backup         | Physical         | Full   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Physical         | Full   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Physical         | Full   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    
| Restore        | Logical          | PITR  | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | PITR  | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | PITR  | Local    | Yes           | <b style="color:#e36526;">No</b>                                      
| Restore        | Logical          | PITR  | Local    | No            |<b style="color:#e36526;">No</b>                                      
| Restore        | Logical          | Full   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | Full   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | Full   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | Full   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Physical         | PITR  | S3       | Yes           | <b style="color:#e36526;">No</b>                                       
| Restore        | Physical         | PITR  | S3       | No            | <b style="color:#e36526;">No</b>                                     
| Restore        | Physical         | PITR  | Local    | Yes           | <b style="color:#e36526;">No</b>                                       
| Restore        | Physical         | PITR  | Local    | No            | <b style="color:#e36526;">No</b>                                       
| Restore        | Physical         | Full   | S3       | Yes           | <b style="color:#e36526;">No</b>                                      
| Restore        | Physical         | Full   | S3       | No            | Partial                                
| Restore        | Physical         | Full   | Local    | Yes           | <b style="color:#e36526;">No</b>                                    
| Restore        | Physical         | Full   | Local    | No            | Partial                                
