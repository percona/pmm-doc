# PMM alert templates

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

### Built-in alert templates

| Template name | Description | Database technology |
| :------------ | :---------- | :------------------ |
| MongoDB down | Detects when a MongoDB instance becomes unavailable, enabling rapid response to maintain database accessibility. | MongoDB |
| PMM agent down | Monitors PMM Agent status and alerts when an agent becomes unreachable, indicating potential host or agent issues.  | MySQL, MongoDB, PostgreSQL, ProxySQL |
| Backup failed [*Technical Preview*] | Monitors backup processes and alerts on failures, providing details about the failed backup artifact and service. Helps maintain data safety and recovery readiness. This template is currently in Technical Preview status and should be used for testing purposes only as it is subject to change. | MySQL, MongoDB, PostgreSQL, ProxySQL |
| Memory used by MongoDB connections | Tracks MongoDB connection memory usage and alerts when it exceeds configurable thresholds. Helps identify and address potential performance issues caused by high memory consumption. | MongoDB |
| Memory used by MongoDB | Monitors overall MongoDB memory usage and alerts when it exceeds 80% of total system memory. Provides details about specific MongoDB services and nodes experiencing high memory consumption, aiding in resource optimization. | MongoDB |
| MongoDB restarted | Detects recent MongoDB restarts, alerting if an instance has been restarted within the last 5 minutes (default threshold). Facilitates investigation of unexpected downtime and potential issues. | MongoDB |
| MySQL down | Monitors MySQL instance availability and alerts when any MySQL service becomes unreachable. Enables quick response to maintain database services. | MySQL |
| MySQL replication running IO | Tracks MySQL replication I/O thread status and alerts if it stops running on a replica. Crucial for ensuring data is being received from the primary server. | MySQL |
| MySQL replication running SQL | Monitors MySQL replication SQL thread status and alerts if it stops running on a replica. Essential for verifying that received data is being applied correctly to maintain data consistency. | MySQL |
| MySQL restarted | Detects recent MySQL restarts, alerting if an instance has been restarted within the last 5 minutes (default threshold). Aids in investigating unexpected downtime and potential issues. | MySQL |
| MySQL connections in use | Tracks MySQL connection usage and alerts when the percentage of active connections exceeds 80% of the maximum allowed (default threshold). Helps prevent performance degradation due to connection overload. | MySQL |
| Node high CPU load | Monitors node CPU usage and alerts when it surpasses 80% (default threshold). Provides details about specific nodes experiencing high CPU load, indicating potential performance issues or scaling needs. | MySQL, MongoDB, PostgreSQL |
| Memory available less than a threshold | Tracks available memory on nodes and alerts when free memory drops below 20% (default threshold). Helps prevent system instability due to memory constraints. | MySQL, MongoDB, PostgreSQL |
| Node high swap filling up | Monitors node swap usage and alerts when it exceeds 80% (default threshold). Indicates potential memory pressure and performance degradation, allowing for timely intervention. | MySQL, MongoDB, PostgreSQL |
| PostgreSQL down | Detects when PostgreSQL instances become unavailable, enabling quick response to maintain database services. Provides details about affected services and nodes. | PostgreSQL |
| PostgreSQL restarted | Identifies recent PostgreSQL restarts, alerting if an instance has been restarted within the last 5 minutes (default threshold). Aids in investigating unexpected downtime and potential issues. | PostgreSQL |
| PostgreSQL connections in use | Monitors PostgreSQL connection usage and alerts when the percentage of active connections exceeds 80% of the maximum allowed (default threshold). Helps prevent performance degradation due to excessive connections. | PostgreSQL |
| ProxySQL server status | Tracks ProxySQL server status and alerts when a server's status becomes OFFLINE_SOFT (3) or OFFLINE_HARD (4). Provides details about the server's endpoint, hostgroup, and associated ProxySQL service. Crucial for maintaining high availability and preventing service disruptions. | ProxySQL |

### Customer-only alert templates

| Template Name | Description | Database Technology |
| :------------ | :---------- | :------------------ |
| MongoDB DBPath disk space utilization | Monitors disk space usage in MongoDB's data directory and alerts when it exceeds set thresholds. Helps prevent storage-related issues and ensures adequate space for database operations. | MongoDB |
| MongoDB host SSL certificate expiry | Tracks SSL certificate expiration dates for MongoDB hosts and alerts when certificates are approaching expiry. Enables timely certificate renewal to maintain secure connections. | MongoDB |
| MongoDB oplog window | Monitors the oplog window size and alerts when it falls below the recommended threshold (typically 24-48 hours). Ensures sufficient time for secondary nodes to replicate data and maintain cluster consistency. | MongoDB |
| MongoDB read tickets | Tracks read ticket availability in the WiredTiger storage engine and alerts when it falls below set thresholds. Helps optimize read performance and identify potential bottlenecks. | MongoDB |
| MongoDB replication lag is high | Monitors replication lag and alerts when it exceeds acceptable thresholds. Crucial for maintaining data consistency across replicas and identifying synchronization issues. | MongoDB |
| MongoDB ReplicaSet has no primary | Detects when a replica set loses its primary node and alerts users. Indicates that the cluster is in read-only mode, potentially affecting write operations and overall database functionality. | MongoDB |
| MongoDB member is in unusual state | Identifies and alerts when replica set members enter unusual states such as Recovering, Startup, or Rollback. Helps maintain cluster health and performance by enabling quick intervention. | MongoDB |
| MongoDB write tickets | Monitors write ticket availability in the WiredTiger storage engine and alerts when it falls below set thresholds. Aids in optimizing write performance and identifying potential bottlenecks. | MongoDB |
| PostgreSQL index bloat is high | Detects excessive index bloat and alerts users. Helps identify performance degradation due to bloated indexes, enabling timely maintenance to improve query performance. | PostgreSQL |
| PostgreSQL high number of dead tuples | Monitors the accumulation of dead tuples in relations and alerts when they exceed set thresholds. Indicates potential issues with vacuum settings and helps optimize storage and query performance. | PostgreSQL |
| PostgreSQL has a high number of statement timeouts | Tracks and alerts on frequent query cancellations due to statement timeouts. Helps identify various issues such as high load, poorly written queries, or inadequate resource allocation. | PostgreSQL |
| PostgreSQL table bloat is high | Detects excessive table bloat and alerts users. Indicates a need to adjust vacuum settings for specific relations or globally, helping to maintain optimal query performance and storage efficiency. | PostgreSQL |
| PostgreSQL high rate of transaction rollbacks | Monitors the ratio of transaction rollbacks to commits and alerts on high rates. Helps identify potential application or database issues leading to frequent transaction failures. | PostgreSQL |
| PostgreSQL tables not auto analyzed | Identifies tables that are not being auto-analyzed and alerts users. Crucial for maintaining accurate statistics and generating proper query execution plans. | PostgreSQL |
| PostgreSQL tables not auto vacuumed | Detects tables that are not being auto-vacuumed and alerts users. Essential for managing bloat, optimizing storage, and maintaining overall database health. | PostgreSQL |
| PostgreSQL unused replication slot | Identifies and alerts on unused replication slots. Helps prevent excessive WAL retention and potential disk space issues, especially when replicas are offline. | PostgreSQL |