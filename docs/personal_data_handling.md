# Data handling in PMM - FAQ


The following questions are being answered related to personal and confidential data handling in PMM:

1. Which type of data is transmitted?


|**Data collection source**                                          | **Data collected** |
| --------------------------------------------------------------- | ------------------------------------------------------
| DB host to PMM                                                  | Database performance metrics <br/> SQL query examples for query analytics (optional).
| PMM to DB Host                                                  | DSN and credentials for database access. A separate DB user is used (read-only) to access the database.
| DB Host to Cloud S3                                             | Database backup - optional if PMM Administrator configures it.
| PMM Server to Percona Cloud                                     | Telemetry data is collected. </br/> PMM Server collects varying amounts of data from version to version. <br/> No personal or confidential information is collected.



2. Where is the data transmitted?

    - As of now, all data gathered from the DB Host is transmitted to the PMM Server.
    - It is possible to transmit DB backups to Cloud S3 storage(optional). PMM Admin defines which Cloud S3 storage is used as a backup storage.

## Personal data collection and processing 

1. Define the purpose of collecting and processing personal data.

    Our [Privacy Policy] (https://www.percona.com/privacy-policy) states that the data collection is conducted in order to provide the services and to improve the products we offer.

    We do not collect/transfer personal data explicitly. However, if query analytics is enabled and query example collection isn't disabled, we gather SQL query examples with real data, and personal data may appear there if it is stored. Data pertaining to QAN is always stored on the PMM server and is never sent elsewhere.

2. In the process of collecting data, how often (frequency), how much (volume), and which fields are processed (example, name, birth date, etc.)?

    If Query Analytics is enabled and SQL query examples are gathered, we do not process personal or confidential information in any special way. The PMM server is unable to understand the meaning of the data contained within the SQL query. It is therefore processed as usual, which involves storing it on the PMM server and making it available to the user upon request. Data is gathered every minute.

    Except for Grafana email addresses, PMM does not directly request or collect PII data. For more information about the collected telemetry data, refer to the [Percona Privacy Policy](http://www.percona.com/privacy-policy/).

### Data processed for other applications/third parties

What applications or third parties can access the data created and processed by the cloud service?

Third parties or other applications are not able to access the data gathered by PMM server.

## Confidential data collection and processing 

1. Define the purpose of collecting and processing confidential data.

    We do not collect/transfer confidential data explicitly. However, if query analytics is enabled and query example collection isn't disabled, we gather SQL query examples with real data, and confidential data may appear there if it is stored. Data pertaining to QAN is always stored on the PMM server and is never sent elsewhere.

2. In the process of collecting data, how often (frequency), how much (volume), and which fields are processed (example, name, birth date, etc.)?

    If Query Analytics is enabled and SQL query examples are gathered, we do not process confidential information in any special way. The PMM server is unable to understand the meaning of the data contained within the SQL query. It is therefore processed as usual, which involves storing it on the PMM server and making it available to the user upon request. Data is gathered every minute.

3. Is confidential data processed for other applications or parties? Should the data that is created and processed in the cloud service be available to other applications or even 3rd parties?

    We do not transmit personal or confidential data to Percona Cloud or third-party services/applications.

4. How safe is the encryption? It's a must to encrypt all connections to and from the cloud including the data in the cloud storage.

    We use TLS for connections between:

    - Database host to PMM Server
    - PMM Server to Percona Cloud
    - PMM Server to remote database or optionally, depending on user configuration
