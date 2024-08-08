# PMM Alert Templates

Alert templates provide a set of common events and expressions for alerting, serving as a foundation for creating alert rules.

Percona Monitoring and Management (PMM) offers three categories of alert templates to enhance database performance monitoring:

1. **Built-in templates**: Templates that are available out-of-the-box with the PMM installation.
2. **Percona Platform templates**: Additional templates that become accessible after you [connect PMM to Percona Platform](../how-to/integrate-platform.md). PMM Server then automatically downloads these additional templates from Percona Platform if the **Telemetry** option is enabled under **Configuration > Settings > Advanced Settings**. 
3. **Custom templates**: Templates that you can create when none of the default or Percona Platform templates meet your specific needs. For details on creating custom templates, see [Percona Alerting](../get-started/alerting.md#configure-alert-templates).


## Accessing alert templates

To check the alert templates for your PMM instance, go to PMM > **Alerting > Alert Rule Templates** tab.

## Alert template categories

### Built-in alert templates

These templates are available to all PMM users, regardless of their account type.

| Template Name | Description | Database Technology |
| :------------ | :---------- | :------------------ |
| **MongoDB Down** | Detects when a MongoDB instance becomes unavailable, enabling rapid response to maintain database accessibility. | MongoDB |
| **PMM Agent Down** | Notifies when the PMM agent stops communicating, ensuring continuous monitoring across your database systems. | MySQL, MongoDB, PostgreSQL, ProxySQL |
| **Backup Failed [Technical Preview]** | Alerts on backup failures, helping maintain data safety and recovery readiness. This template is  currently in Technical Preview status. Use this template for testing purposes only as it is subject to change.| MySQL, MongoDB, PostgreSQL, ProxySQL |
| **Memory Used by MongoDB Connections** | Monitors memory consumption by MongoDB connections to prevent resource exhaustion. | MongoDB |
| **Memory Used by MongoDB** | Tracks overall MongoDB memory usage for optimal resource allocation. | MongoDB |
| **MongoDB Restarted** | Notifies of MongoDB instance restarts, facilitating investigation of unexpected downtime. | MongoDB |
| **MySQL Down** | Alerts when a MySQL instance becomes unavailable, enabling quick response to maintain service. | MySQL |
| **MySQL Replication Running IO** | Monitors the I/O thread of MySQL replication to ensure data receipt from the master. | MySQL |
| **MySQL Replication Running SQL** | Monitors the SQL thread of MySQL replication to ensure that data received from the primary is being properly applied to the replica. Helps detect replication lag, data inconsistencies, and potential bottlenecks in the replication process. Critical for maintaining data integrity and minimizing downtime in replicated MySQL environments. | MySQL |
| **MySQL Restarted** | Notifies of MySQL instance restarts, allowing investigation of unexpected downtime. | MySQL |
| **MySQL Connections in Use** | Monitors active MySQL connections to prevent overload and connection issues. | MySQL |
| **Node High CPU Load** | Alerts on high CPU usage, indicating potential performance issues or scaling needs. | MySQL, MongoDB, PostgreSQL |
| **Memory Available Less Than a Threshold** | Notifies when available memory falls below a set threshold, preventing system instability. | MySQL, MongoDB, PostgreSQL |
| **Node High Swap Filling Up** | Monitors swap space usage, indicating potential memory pressure and performance degradation. | MySQL, MongoDB, PostgreSQL |
| **PostgreSQL Down** | Alerts when a PostgreSQL instance becomes unavailable, enabling quick response to maintain service. | PostgreSQL |
| **PostgreSQL Restarted** | Notifies of PostgreSQL instance restarts, facilitating investigation of unexpected downtime. | PostgreSQL |
| **PostgreSQL Connections in Use** | Tracks active PostgreSQL connections to prevent overload and connection issues. | PostgreSQL |
| **ProxySQL Server Status** | Monitors ProxySQL server status to ensure proper load balancing and high availability. | ProxySQL |

### Customer-Only alert templates

These advanced templates are exclusively available to Percona customers who [connect PMM to Percona Platform](../how-to/integrate-platform.md) with a Percona Account.

| Template Name | Description | Database Technology |
| :------------ | :---------- | :------------------ |
| **MongoDB DBPath Disk Space Utilization** | Monitors disk space usage in MongoDB's data directory to prevent storage-related issues. | MongoDB |
| **MongoDB Host SSL Certificate Expiry** | Alerts on approaching SSL certificate expiration to maintain secure connections. | MongoDB |
| **MongoDB Oplog Window** | Tracks oplog window size to ensure sufficient time for secondary node data replication. | MongoDB |
| **MongoDB Read Tickets** | Monitors read ticket availability in WiredTiger storage engine to optimize read performance. | MongoDB |
| **MongoDB Replication Lag is High** | Alerts when replication lag exceeds acceptable thresholds, ensuring data consistency across replicas. | MongoDB |
| **MongoDB ReplicaSet Has No Primary** | Notifies when a replica set loses its primary node, potentially affecting write operations. | MongoDB |
| **MongoDB Member is in Unusual State** | Alerts on abnormal states of replica set members, helping maintain cluster health. | MongoDB |
| **MongoDB Write Tickets** | Monitors write ticket availability in WiredTiger storage engine to optimize write performance. | MongoDB |
| **PostgreSQL Index Bloat is High** | Alerts on excessive index bloat, which can degrade query performance. | PostgreSQL |
| **PostgreSQL High Number of Dead Tuples** | Monitors accumulation of dead tuples, which can impact query performance and storage efficiency. | PostgreSQL |
| **PostgreSQL Has a High Number of Statement Timeouts** | Tracks frequent statement timeouts, indicating potential performance or configuration issues. | PostgreSQL |
| **PostgreSQL Table Bloat is High** | Alerts on excessive table bloat, which can degrade query performance and waste storage. | PostgreSQL |
| **PostgreSQL High Rate of Transaction Rollbacks** | Monitors frequent transaction rollbacks, which may indicate application or database issues. | PostgreSQL |
| **PostgreSQL Tables Not Auto Analyzed** | Identifies tables not being auto-analyzed, potentially leading to suboptimal query plans. | PostgreSQL |
| **PostgreSQL Tables Not Auto Vacuumed** | Alerts on tables not being auto-vacuumed, which can lead to bloat and performance issues. | PostgreSQL |
| **PostgreSQL Unused Replication Slot** | Identifies unused replication slots, which can prevent WAL retention and lead to disk space issues. | PostgreSQL |
