# Prepare a storage location

Prepare a stogare location as a backup destination for creating and storing your backup artifacts.

PMM supports the following types of storage:

- **Amazon AWS S3-compatible**: enables you to use not only AWS S3, but also tools like **min.io** to host your storage.
- **Local storage**: creates backups faster, but is  more risky since you can lose backups if the Server is lost. Percona recommends using local backups only as a temporary solution.

## Prepare a location for local backups
If you prefer storing your backup artifacts on a remote filesystem, make sure that you have Write permissions on the path you define, and that you've mounted the remote folder to all the mongoDB nodes.

For more information, see the [Percona Backup for MongoDB (PBM) documentation](https://www.google.com/url?q=https://docs.percona.com/percona-backup-mongodb/details/storage-configuration.html%23remote-filesystem-server-storage&sa=D&source=docs&ust=1667855380308508&usg=AOvVaw3B1N4tjh_mv8lt4msbf3Ui). 

## Prepare a location for Amazon AWS S3-compatible backups
If you want to store backup artifacts in the cloud, make sure you have your Amazon S3 storage account and location details ready.
In addition to bucket location details, you will also need to ensure proper S3 permissions.

The general minimum permissions are **LIST**/**PUT**/**GET**/**DELETE**.
A sample IAM policy is:

        ```json
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:ListBucket"
                    ],
                    "Resource": "arn:aws:s3:::pmm-backup-testing"
                },
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:PutObject",
                        "s3:PutObjectAcl",
                        "s3:GetObject",
                        "s3:GetObjectAcl",
                        "s3:DeleteObject"
                    ],
                    "Resource": "arn:aws:s3:::pmm-backup-testing/*"
                }
            ]
        }
        ```
   
## [Create the storage location](#create-a-storage-location)

1. Go to **Backup > Storage Locations**:
    ![!](../../_images/PMM_Backup_Management.jpg)

2. Click **Add storage location** and fill in a name and description for this new location.
3. Choose the type of storage location you are creating:
     - **S3**: Specify the Amazon AWS S3 backup location endpoint (URL), bucket name, and connection details. 
     - **Local Client**: specify the path on your local client for files to be backed up to.

4. Optionally, click **Test** to test the connection.

5. Click **Add** to create the location.
