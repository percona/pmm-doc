# MongoDB Backup and Restore support matrix

Creating and restoring MongoDB backups in PMM currently has the following limitations and requirements:

- Restoring on different Replica set/Cluster is not supported.
- Physical backups and restores suppoted only for **Percona Server for MongoDB**
- Physical restores are not supported for deployments with arbiter nodes. For more information, see the [Percona Backup for MongoDB documentation](https://docs.percona.com/percona-backup-mongodb/usage/restore.html#physical-restore-known-limitations).
- All types of backups on sharded cluster setups are currently not supported.
- Physical backups are supported, but restoring from physical backups will cause all mongo and pbm-agent instances to shutdown. To bring them back up, restart all **mongod** and **mongos** nodes and restart all **pbm-agents**.
- Retention policy is supported only for snapshot types of scheduled backups and for the S3-compatible storage type.
- Before restoring, make sure to prevent clients from accessing database.
  
## Support matrix

<style>
  table th:first-of-type {
    width: 0.5%
  }
  table th:nth-of-type(2) {
    width: 0.5%
  }
  table th:nth-of-type(3) {
    width: 0.1%
  }
  table th:nth-of-type(4) {
    width: 0.1%
  }
  table th:nth-of-type(5) {
    width: 0.1%
  }
  table th:nth-of-type(6) {
    width: 0.1%
  }
  table th:nth-of-type(7) {
    width: 90%
  }
  table td {
    text-align:left; vertical-align: top;
  }
</style>

=======
## Backup: Logical

| Full or PITR | Storage type (S3 or Local) | DB running in container (Containerized) | Support level|                                                                    
| ---- | -------- | ------------- | --------------------------------------- |
| PITR  | S3       | Yes           | <b style="color:#5794f2;"><b style="color:#5794f2;">Full</b></b>                                  |                   
| PITR  | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                               
| PITR  | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    |
| PITR  | Local    | No            | <b style="color:#5794f2;">Full</b>                                    |
| Full   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                               
| Full   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                               
| Full   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    |
| Full   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    |

## Backup: Physical
| Full or PITR | Storage type (S3 or Local) | DB running in container (Containerized) | Support level|                                                                    
| ---- | -------- | ------------- | --------------------------------------- |
| PITR  | S3       | Yes           | <b style="color:#e36526;">No</b>                                       
| PITR  | S3       | No            | <b style="color:#e36526;">No</b>                                       
| PITR  | Local    | Yes           | <b style="color:#e36526;">No</b>                                       
| PITR  | Local    | No            | <b style="color:#e36526;">No</b>                                      
| Full   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                   
| Full   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    
| Full   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    
| Full   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    

## Restore: Logical
| Full or PITR | Storage type (S3 or Local) | DB running in container (Containerized) | Support level|                                                                    
| ---- | -------- | ------------- | --------------------------------------- |
| PITR  | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                               
| PITR  | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                               
| PITR  | Local    | Yes           | <b style="color:#e36526;">No</b>                                      |
| PITR  | Local    | No            |<b style="color:#e36526;">No</b>                                        |
| Full   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                               
| Full   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                               
| Full   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                               
| Full   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    |                                               

## Restore: Physical
| Full or PITR | Storage type (S3 or Local) | DB running in container (Containerized) | Support level|                                                                    
| ---- | -------- | ------------- | --------------------------------------- |
| PITR  | S3       | Yes           | <b style="color:#e36526;">No</b>                                       
| PITR  | S3       | No            | <b style="color:#e36526;">No</b>                                     
| PITR  | Local    | Yes           | <b style="color:#e36526;">No</b>                                       
| PITR  | Local    | No            | <b style="color:#e36526;">No</b>                                       
| Full   | S3       | Yes           | <b style="color:#e36526;">No</b>                                      
| Full   | S3       | No            | Partial                                
| Full   | Local    | Yes           | <b style="color:#e36526;">No</b>                                    
| Full   | Local    | No            | Partial                                
