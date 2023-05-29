Supported setups for MongoDB backups

PMM supports the following actions for For MongoDB backups. Restoring for sharded cluster configurations is not currently supported from the UI, and is handled via [PBM documentation](https://docs.percona.com/percona-backup-mongodb/usage/restore.html).

Replica set setups for:

  - Storing backups on Amazon S3-compatible object storage, and on mounted filesystem
  - Creating and restoring Logical snapshot backups
  - Creating and restoring Physical snapshot backups
  - Creating logical PITR backups both locally and on S3-compatible object storage. Restoring logical PITR backups from S3-compatible object storage.
  
Sharded clusters for:
  - Storing backups on Amazon S3-compatible object storage, and on mounted filesystem
  - Creating Logical snapshot backups
  - Creating Physical snapshot backups
  - Creating logical PITR backups both locally and on S3-compatible object storage
 
For a detailed overview of the supported setups for MongoDB, check out the [Support matrix](../backup/mongodb_limitations.md).