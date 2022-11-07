# MongoDB Backup and Restore limitations 

Creating and restoring MongoDB backups in PMM currently has the following limitations and requirements:

- Restoring on different Replica set/Cluster is not supported.
- Physical restores are not supported for deployments with arbiter nodes. For more information, see the [Percona Backup for MongoDB documentation](https://docs.percona.com/percona-backup-mongodb/usage/restore.html#physical-restore-known-limitations).
- All types of backups on Sharder cluster setups are supported, but restoring from physical backups will cause all mongo and pbm-agent instances to shutdown. To bring them back up, restart all **mongod** and **mongos** nodes and restart all **pbm-agents**. 
- Retention policy is supported only for snapshot types of scheduled backups.
- Before restoring, make sure to prevent clients from accessing database.

<style>
  table th:first-of-type {
    width: 5%
  }
  table th:nth-of-type(2) {
    width: 5%
  }
  table th:nth-of-type(3) {
    width: 5%
  }
  table th:nth-of-type(4) {
    width: 5%
  }
  table th:nth-of-type(5) {
    width: 5%
  }
  table th:nth-of-type(6) {
    width: 10%
  }
  table td {
    text-align:left; vertical-align: top;
  }
</style>


## Support matrix

| Backup/Restore | Logical/Physical | PITR | S3/Local | Containerized | Support level| Comments                                                                      |
| -------------- | ---------------- | ---- | -------- | ------------- | --------------------------------------- | ----------------------------------------------------------------------------- |
| Backup         | Logical          | Yes  | S3       | Yes           | <b style="color:#5794f2;"><b style="color:#5794f2;">Full</b></b>                                  |                                                                               |
| Backup         | Logical          | Yes  | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | Yes  | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    | Requires user to mount remote folder properly                                 |
| Backup         | Logical          | Yes  | Local    | No            | <b style="color:#5794f2;">Full</b>                                    | Requires user to mount remote folder properly                                 |
| Backup         | Logical          | No   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | No   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Backup         | Logical          | No   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    | Requires user to mount remote folder properly                                 |
| Backup         | Logical          | No   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    | Requires user to mount remote folder properly                                 |
| Backup         | Physical         | Yes  | S3       | Yes           | <b style="color:#e36526;">No</b>                                       | Not availabe in PBM                                                           |
| Backup         | Physical         | Yes  | S3       | No            | <b style="color:#e36526;">No</b>                                       | Not availabe in PBM                                                           |
| Backup         | Physical         | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                       | Not availabe in PBM                                                           |
| Backup         | Physical         | Yes  | Local    | No            | <b style="color:#e36526;">No</b>                                      | Not availabe in PBM                                                           |
| Backup         | Physical         | No   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    | Perona server for MongoDB only                                                |
| Backup         | Physical         | No   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    | Perona server for MongoDB only                                                |
| Backup         | Physical         | No   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    | Perona server for MongoDB only; Requires user to mount remote folder properly |
| Backup         | Physical         | No   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    | Perona server for MongoDB only; Requires user to mount remote folder properly |
| Restore        | Logical          | Yes  | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | Yes  | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                      | Missing timeranges API in PMM                                                 |
| Restore        | Logical          | Yes  | Local    | No            |<b style="color:#e36526;">No</b>                                      | Missing timeranges API in PMM                                                 |
| Restore        | Logical          | No   | S3       | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | No   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | No   | Local    | Yes           | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Logical          | No   | Local    | No            | <b style="color:#5794f2;">Full</b>                                    |                                                                               |
| Restore        | Physical         | Yes  | S3       | Yes           | <b style="color:#e36526;">No</b>                                       | Not availabe in PBM                                                           |
| Restore        | Physical         | Yes  | S3       | No            | <b style="color:#e36526;">No</b>                                     | Not availabe in PBM                                                           |
| Restore        | Physical         | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                       | Not availabe in PBM                                                           |
| Restore        | Physical         | Yes  | Local    | No            | <b style="color:#e36526;">No</b>                                       | Not availabe in PBM                                                           |
| Restore        | Physical         | No   | S3       | Yes           | <b style="color:#e36526;">No</b>                                      | Supported for cases when stopping mongod doesn't cause container to stop      |
| Restore        | Physical         | No   | S3       | No            | Partial                                 | Requires user to restart mongod and pbm-agents manually                       |
| Restore        | Physical         | No   | Local    | Yes           | <b style="color:#e36526;">No</b>                                     | Supported for cases when stopping mongod doesn't cause container to stop      |
| Restore        | Physical         | No   | Local    | No            | Partial                                 | Requires user to restart mongod and pbm-agents manually                       |