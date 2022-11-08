# MySQL Backup and Restore support matrix

Before creating and restoring MySQL backups, make sure to check the support matrix below:

| Backup/Restore | Logical/Physical | PITR | S3/Local | Containerized | Support level| 
| -------------- | ---------------- | ---- | -------- | ------------- | --------------------------------------- | 
| Backup         | Logical          | Yes  | S3       | Yes           | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Logical          | Yes  | S3       | No            | <b style="color:#e36526;">No</b>                                      |          |
| Backup         | Logical          | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                    |          |
| Backup         | Logical          | Yes  | Local    | No            | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Logical          | No   | S3       | Yes           | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Logical          | No   | S3       | No            | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Logical          | No   | Local    | Yes           | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Logical          | No   | Local    | No            | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Physical         | Yes  | S3       | Yes           | <b style="color:#e36526;">No</b>                                      |          |
| Backup         | Physical         | Yes  | S3       | No            | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Physical         | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Physical         | Yes  | Local    | No            | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Physical         | No   | S3       | Yes           | <b style="color:#e36526;">No</b>                                      |          |
| Backup         | Physical         | No   | S3       | No            | <b style="color:#5794f2;">Full</b>                                  |          |
| Backup         | Physical         | No   | Local    | Yes           | <b style="color:#e36526;">No</b>                                     |          |
| Backup         | Physical         | No   | Local    | No            | <b style="color:#e36526;">No</b>                                     |          |
| Restore        | Logical          | Yes  | S3       | Yes           | <b style="color:#e36526;">No</b>                                    |          |
| Restore        | Logical          | Yes  | S3       | No            | <b style="color:#e36526;">No</b>                                    |          |
| Restore        | Logical          | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                    |          |
| Restore        | Logical          | Yes  | Local    | No            | <b style="color:#e36526;">No</b>                                      |          |
| Restore        | Logical          | No   | S3       | Yes           | <b style="color:#e36526;">No</b>                                     |          |
| Restore        | Logical          | No   | S3       | No            | <b style="color:#e36526;">No</b>                                     |          |
| Restore        | Logical          | No   | Local    | Yes           | <b style="color:#e36526;">No</b>                                      |          |
| Restore        | Logical          | No   | Local    | No            | <b style="color:#e36526;">No</b>                                    |          |
| Restore        | Physical         | Yes  | S3       | Yes           | <b style="color:#e36526;">No</b>                                    |          |
| Restore        | Physical         | Yes  | S3       | No            | <b style="color:#e36526;">No</b>                                     |          |
| Restore        | Physical         | Yes  | Local    | Yes           | <b style="color:#e36526;">No</b>                                     |          |
| Restore        | Physical         | Yes  | Local    | No            | <b style="color:#e36526;">No</b>                                     |          |
| Restore        | Physical         | No   | S3       | Yes           | <b style="color:#e36526;">No</b>                                   |          |
| Restore        | Physical         | No   | S3       | No            | <b style="color:#5794f2;">Full</b>                                    |          |
| Restore        | Physical         | No   | Local    | Yes           | <b style="color:#e36526;">No</b>                                     |          |
| Restore        | Physical         | No   | Local    | No            | <b style="color:#e36526;">No</b>                                   |