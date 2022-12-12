# Create MongoDB on-demand backups

To create a backup:

1. Go to <i class="uil uil-history"></i> **Backup > All Backups**.
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