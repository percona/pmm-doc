# Create and restore MongoDB Backups

## Supported setups
PMM supports MongoDB replica set setups (GA)  for:

  -  Storing backups on Amazon S3-compatible object storage, and on mounted filesystem
  -  Creating and restoring Logical snapshot backups
  -  Creating and restoring Physical snapshot backups. This is only available with Percona Server for MongoDB and requires post-restore actions.
  - Creating logical PITR backups both locally and on S3-compatible object storage. Restoring logical PITR backups from S3-compatible object storage.
  
   For a detailed overview of the supported setups for MongoDB, check out the [Support matrix](../using/mongodb_limitations.md).

### MongoDB backup prerequisites
Before creating MongoDB backups, make sure to:

1. Enable Backup Management from <i class="uil uil-cog"></i> **Configuration > PMM Settings > Advanced Settings** and activate the **Backup Management** option. This adds the <i class="uil uil-history"></i> Backup option on the side menu.
2. [Prepare and create a storage location for your backups](prepare_storage_location.md).
3. For setups where PMM Server runs as a Docker container, enable backup features at container creation time by adding `-e ENABLE_BACKUP_MANAGEMENT=1` to your `docker run` command.
4. Check that [PMM Client](../setting-up/client/index.md) is installed and running at least on one node of the replica set. Make sure this is the one that will be used for backup and restore jobs.
5. Check that [Percona Backup for MongoDB](https://docs.percona.com/percona-backup-mongodb/index.html) (PBM) is installed and `pbm-agent` is running on all MongoDB nodes in the replica set. PMM 2.32 and later require PBM 2.0.1 or newer.
6. Check that MongoDB is a member of a replica set.
7. Check that you set the [required permissions for creating and restoring MongoDB backups](/docs/setting-up/client/mongodb.md#create-pmm-account-and-set-permissions).
8. Verify the [MongoDB supported configurations and limitations](mongodb_limitations.md).

## [Make a backup](#make-a-backup)

To create a backup:

1. Go to  <i class="uil uil-history"></i> **Backup > All Backups**.
2. Click <i class="uil uil-plus-square"></i> **Create Backup**.
3. Specify the type of backup that you want to create: **On Demand** or **Schedule Backup**.
4. Enter a unique name for this backup.
5. Choose the service to back up from the Service name drop-down menu. This automatically populates the **DB Technology** field.
6. Select whether you want to create a **Physical** or **Logical** backup of your data, depending on your use case and requirements.
7. Choose a storage location for the backup. MySQL currently only supports storing backups to Amazon S3. If no options are available here, see the [Create a storage location](prepare_storage_location.md) section above.
8. If you're creating a schedule backups, also specify the backup type, the schedule, and a retention policy for your backup:
    - **Backup Type**: currently, PMM supports both **Full** and Point-in-type recovery **(PITR)** backup types for MongoDB. However, the PITR option is only available for the **Logical** data model. For MySQL, only the **Full** type is supported.
    - **Shedule**: configure the frequency and the start time for this backup. Make sure that the the schedule you specify here does not create overlapping jobs or overhead on the production environment. Also check that your specified shedule does not overlap with production hours.
    - **Retention**: this option is only available for Snapshot backups stored on Amazon S3. If you wand to keep an unlimited number of backup artifacts, type `0`.
9. Expand **Advanced Settings** to specify the settings for retrying the backup in case of any issues. You can either let PMM retry the backup again (**Auto**), or do it again yourself **Manual**. Auto retry mode enables you to select up to ten retries and an interval of up to eight hours between retries.
10. Click **Backup** to start creating the backup artifact or schedule a job.
11. Go to the **All Backups** tab, and check the **Status** column. An animated ellipsis indicator {{icon.bouncingellipsis}} shows that a backup is currently being created.

## Edit a scheduled backup

1. Go to **Backup > Scheduled Backup Jobs**.
2. In the **Actions** column:
    - Click the switch <i class="uil uil-toggle-on"></i> to enable or disable the backup.
    - Click ![](../_images/dots-three-vertical.png) to edit, delete or create a (by default, disabled) copy of the backup schedule.

## Restore a backup

### Restore compatibility

MongoDB backups can only be restored to the same service they were created from.

To restore a backup:

1. Go to <i class="uil uil-history"></i> **Backup > All backups** and find the backup that you want to restore.
2. Click the arrow in the **Actions** column to check all the information for the backup, then click ![](../_images/dots-three-vertical.png) **> Restore from backup**.
3. In the **Restore from backup** dialog, select **Same service** to restore to a service with identical properties or **Compatible services** to restore to a compatible service.
4. Select one of the available service names from the drop-down menu.
5. If you are restoring a PITR backup, also  select the point for the date and time that you want to restore the database to.
6. Check the values, then click **Restore**.
7. Go to the **Restores** tab to check the status of the restored backup.
During restoring, PMM disables all the scheduled backup tasks for the current service. Remember to re-enable them manually after the restore.

### Restore to a new cluster manually

=== "Restoring a backup into a new environment"

    1. Install MongoDB and Percona Backup for MongoDB. For instructions, see the [PBM install documentation](https://docs.percona.com/percona-backup-mongodb/installation.html).
    2. Configure your environment use the same replica set names in your new destination cluster and in the cluster that was backed up.
      Example:
      `$ export PBM_REPLSET_REMAPPING="rsX=rsA,rsY=rsB"`
      or 
      `$ pbm restore <timestamp> --replset-remapping="rsX=rsA,rsY=rsB`
    3. Make sure that Percona Backup for MongoDB configuration in the new environment points to the remote storage defined for the original environment, including the authentication credentials if it is an object store. The easiest way to configure is create a config file (e.g. pbm_config.yaml).
    You can either copy the config from the source host or create a new one.Redirect config output from existing environment:
    `pbm config >> pbm_config.yaml`
    To implement the config, use the following command: `pbm config --file pbm_config.yaml`
    For more information, see **Restoring a backup into a new-environment** in [the PBM documentation](https://docs.percona.com/percona-backup-mongodb/usage/restore.html#restoring-a-backup-into-a-new-environment).  

=== "Restoring into a replica set with a different name"

1. Restore the backup. Once you run `pbm list` and see the backups made from the original environment, then you can run the `pbm restore` command: <br/> 
  
  - For snapshot backups: `pbm list`
     Backup snapshots: `2022-11-23T19:40:06Z [restore_to_time: 2021-01-13T15:53:40Z]` supplying the timestamp of the backup to  the `pbm` command: `pbm restore 2022-11-23T19:40:06Z`.
    <br/> For more information, see [Restore a backup](https://docs.percona.com/percona-backup-mongodb/usage/restore.html) topic in the PBM documentation.
    
  - For PITR backups: `pbm list`
     Backup snapshots: 2022-11-23T19:40:06Z <logical> [restore_to_time: 2022-11-23T19:40:25Z]

     2022-11-23T19:45:07Z <logical> [restore_to_time: 2022-11-23T19:45:22Z]
     PITR <on>: 2022-11-23T19:40:26Z - 2022-11-23T19:45:22Z, supplying the timestamp from one of the PITR ranges to pbm command: `pbm restore --time="2022-11-23T19:40:26"`. 
    
  For more information, see [Point-in-time Recovery topic in the PBM documentation](https://docs.percona.com/percona-backup-mongodb/usage/point-in-time-recovery.html)
1. Check the restore progress using the following command: `pbm list --restore`

Make sure not to run pbm backup from the new environment while the Percona Backup for MongoDB config is pointing to the remote storage location of the original environment.

=== "Restoring into a replica set with a different name"

When restoring **logical backups** to a new environment that has the same (or more) number of shards with different replica set names, configure the name mapping between the source and target environments.

To do this, you can either set the `PBM_REPLSET_REMAPPING` environment variable for pbm CLI or use the `--replset-remapping` flag for PBM commands. The mapping format is `<rsTarget>=<rsSource>`.

      The mapping format is `<rsTarget>=<rsSource>`
      Example:
      ```$ export PBM_REPLSET_REMAPPING="rsX=rsA,rsY=rsB"``
        or
      ```$ pbm restore <timestamp> --replset-remapping="rsX=rsA,rsY=rsB"``
          
      For more information, see **Restoring into a cluster replica set with a different name** in [the PBM documentation](https://docs.percona.com/percona-backup-mongodb/usage/restore.html#restoring-into-a-cluster-replica-set-with-a-different-name). 

## Delete a backup

You can only delete backup artifacts stored on Amazon S3. Local backups must be removed manually.

To delete a backup:

1. Go to  <i class="uil uil-history"></i> **Backup > All Backups** and find the row with the backup you want to delete.
2. Click the arrow in the **Actions** column to check all the information for the backup, then click ![](../_images/dots-three-vertical.png) **> Delete backup**.
3. In the Delete backup artifact dialog box, enable **Delete from storage** if you also want to delete the actual backup content besides just the backup register.
4. Click **Delete**.
