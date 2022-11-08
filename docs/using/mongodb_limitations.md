# MongoDB Backup and Restore support matrix

Creating and restoring MongoDB backups in PMM currently has the following limitations and requirements:

- Restoring on different Replica set/Cluster is not supported.
- Physical restores are not supported for deployments with arbiter nodes. For more information, see the [Percona Backup for MongoDB documentation](https://docs.percona.com/percona-backup-mongodb/usage/restore.html#physical-restore-known-limitations).
- All types of backups on sharded cluster setups are currently not supported.
- Physical backups are supported, but restoring from physical backups will cause all mongo and pbm-agent instances to shutdown. To bring them back up, restart all **mongod** and **mongos** nodes and restart all **pbm-agents**.
- Retention policy is supported only for snapshot types of scheduled backups and for the S3 storage type.
- Before restoring, make sure to prevent clients from accessing database.
- 
## Support matrix

### Logical Backup/Restore

|    Storage type           | Snapshot   | PITR    |
| ------------- | ------ | ------- |
| Local storage | **Backup**/**Restore** |**Backup**/ - |
| S3            | **Backup**/**Restore** | **Backup**/**Restore** |

### Physical Backup/Restore

|      Storage type          | Full   | PITR      |
| ------------- | ------ | --------- |
| Local storage | **Backup**/**Restore.** Restoring requires manual restart of mongod and pbm-agents. | -/-|
| S3            | **Backup**/**Restore**. Restoring requires manual restart of mongod and pbm-agents. |  -/-|


### Full matrix

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

| Backup Restore | Logical Physical | PITR | S3 Local | Containerized | Support level|                                                                    
| -------------- | ---------------- | ---- | -------- | ------------- | --------------------------------------- |
| Backup         | Logical          | Yes  | S3       | Yes           | <b style="color:#5794f2;"><b style="color:#5794f2;">Full</b></b>                                  |                                                                               |
| Backup         | Logical          | Yes  | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | Yes  | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Logical          | Yes  | Local    | No            | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Logical          | No   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | No   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | No   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Logical          | No   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Physical         | Yes  | S3       | Yes           | <b style="color:#e36526;">No</b>                                       
| Backup         | Physical         | Yes  | S3       | No            | <b style="color:#e36526;">No</b>                                       
| Backup         | Physical         | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                       
| Backup         | Physical         | Yes  | Local    | No            | <b style="color:#e36526;">No</b>                                      
| Backup         | Physical         | No   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                   
| Backup         | Physical         | No   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Physical         | No   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    
| Backup         | Physical         | No   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    
| Restore        | Logical          | Yes  | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | Yes  | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                      
| Restore        | Logical          | Yes  | Local    | No            |<b style="color:#e36526;">No</b>                                      
| Restore        | Logical          | No   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | No   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | No   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | No   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Physical         | Yes  | S3       | Yes           | <b style="color:#e36526;">No</b>                                       
| Restore        | Physical         | Yes  | S3       | No            | <b style="color:#e36526;">No</b>                                     
| Restore        | Physical         | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                       
| Restore        | Physical         | Yes  | Local    | No            | <b style="color:#e36526;">No</b>                                       
| Restore        | Physical         | No   | S3       | Yes           | <b style="color:#e36526;">No</b>                                      
| Restore        | Physical         | No   | S3       | No            | Partial                                
| Restore        | Physical         | No   | Local    | Yes           | <b style="color:#e36526;">No</b>                                    
| Restore        | Physical         | No   | Local    | No            | Partial                                