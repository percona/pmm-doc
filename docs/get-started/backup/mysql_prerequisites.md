# MySQL backup prerequisites
Before creating MySQL backups, make sure to: 

1. Check that **Backup Management** is enabled and the <i class="uil uil-history"></i> Backup option is available on the side menu. If Backup Managemt has been disabled on your instance, go to <i class="uil uil-cog"></i> **Configuration > PMM Settings > Advanced Settings**, re-enable **Backup Management**  then click **Apply changes**. 
2.  !!! caution alert alert-warning "Important"
    If PMM Server runs as a Docker container, enable backup features at container creation time by adding `-e ENABLE_BACKUP_MANAGEMENT=1` to your `docker run` command.
3. Check that the [PMM Client](../../setting-up/client/index.md) is installed and running on the node.

4. To enable Xtrabackup for MySQL 8.0+, check that pmm-agent connects to MySQL with a user that has BACKUP_ADMIN privilege. 

5. Check that there is only one MySQL instance running on the node.

6. Verify that MySQL is running:

    - as a service via `systemd`;

    - with the name `mysql` or `mysqld` (to confirm, use `systemctl status mysql` or `systemctl status mysqld` respectively);

    - from a `mysql` system user account.

7. Make sure that there is a `mysql` system group.

8. Check that MySQL is using the `/var/lib/mysql` directory for database storage.

9.  Make sure that `pmm-agent` has read/write permissions to the `/var/lib/mysql` directory.

10. Check that the latest versions of the following packages are installed and included in the `$PATH` environment variable:

    - [`xtrabackup`](https://www.percona.com/software/mysql-database/percona-xtrabackup), which includes:

        - [`xbcloud`](https://www.percona.com/doc/percona-xtrabackup/2.3/xbcloud/xbcloud.html)

        - [`xbstream`](https://www.percona.com/doc/percona-xtrabackup/2.3/xbstream/xbstream.html)

    - [`qpress`][PERCONA_QPRESS].

!!! caution alert alert-warning "Important"
       The versions of each must be compatible with the installed version of MySQL.