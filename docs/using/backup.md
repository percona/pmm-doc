# Backup and Restore

> <b style="color:goldenrod">Caution</b> Backup and restore features are a technical preview and currently only work with MySQL database servers backing up to Amazon AWS S3 storage locations.

## Before you start

**For restoring**

There are no special requirements for restoring.

**For backing up**

- You have either an AWS S3 storage account and location
- There is only one MySQL instance running on the node
- MySQL is running:
    - as a service via `systemd`;
    - with the name `mysql` (to confirm, use `systemctl status mysql`);
    - from a `mysql` system user account
- There is a `mysql` system group
- MySQL is using the `/var/lib/mysql` directory for database storage
- These packages are installed and their locations included in the `$PATH` environment variable:
    - [xtrabackup][PERCONA_XTRABACKUP], which includes:
        - [`xbcloud`][PERCONA_XBCLOUD]
        - [`xbstream`][PERCONA_XBSTREAM]
    - [`qpress`][PERCONA_QPRESS]

    **The versions of each must be compatible with the installed version of MySQL.**

- Backup management has been enabled:
    1. Navigate to *{{icon.cog}} Configuration-->Settings-->Advanced Settings*
    2. Activate *Backup Management*
    3. Click *Apply changes*
    4. In the left menu bar, click *{{icon.history}}-->Backup*

        ![!](../_images/PMM_Backup_Management.jpg)

## Adding a storage location {: #backup-location }

1. Navigate to Backup Management-->Storage locations
2. Click *Add*
3. Fill in the form fields

    ![!](../_images/PMM_Backup_Management_Locations_Add_Storage_Location.jpg)

    - *Name*:
    - *Description*:
    - *Type:*
        - *S3*:
        - *Local Client:*
        - *Local Server:*
    - *Endpoint:*
    - *Bucket Name:*
    - *Access Key:*
    - *Secret Key:*

4. Click *Add* to add the location or *Test* to test the connection.

## Creating a backup {: #backup-create }

> You must add a [backup storage location](#backup-location) before backing up

1. Navigate to *Backup Management-->Backup Inventory*

2. Click {{icon.plussquare}} Add

3. In the *Backup On Demand* dialog, enter values for:

    - *Service name* -- The service being backed up
    - *Vendor* -- The database vendor name (only * * currently supported)
    - *Backup name* -- A unique name for the backup
    - *Description* -- A long description
    - *Location* -- The predefined storage location

4. Click *Backup*

5. In the *Backup Inventory* pane, watch the *Status* column.


## Restoring a backup {: #backup-restore }

> You can only restore a backup to the same service type. I.e. a MySQL backup can only be restored to a MySQL database server.

1. Navigate to *Backup Management-->Backup Inventory*

2. Find the row with the backup you want to restore.

3. In the *Actions* column for that row, click *Restore from backup*

4. In the *Restore from backup* dialog, check the values and click *Restore*

5. Navigate to the *Restore History* tab to check the status of the restored backup



[PERCONA_XTRABACKUP]: https://www.percona.com/software/mysql-database/percona-xtrabackup
[PERCONA_XBCLOUD]: https://www.percona.com/doc/percona-xtrabackup/2.3/xbcloud/xbcloud.html
[PERCONA_XBSTREAM]: https://www.percona.com/doc/percona-xtrabackup/2.3/xbstream/xbstream.html
[PERCONA_QPRESS]: https://www.percona.com/doc/percona-xtrabackup/LATEST/backup_scenarios/compressed_backup.html
