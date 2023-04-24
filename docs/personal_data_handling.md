# Sensitive data handling

The following questions are being answered related to personal and confidential data handling in PMM:

1. Which type of data is being transmitted (non-personal data, only metrics)?

**From the DB host to PMM**

The following data is collected from the database host to PMM:

- Metrics
- SQL query examples for query analytics (optional).

**From PMM to DB Host**

Th following data is collected from PMM to database host:

DSN and credentials for database access. A separate DB user is used (read-only) to access the database.

**From DB Host to Cloud S3**

Th following data is collected from the database host to Cloud S3:

DB backup (optionally if PMM Admin configures this)

**From PMM Server to Percona Cloud**

Telemetry (the exact data varies from version to version of the PMM Server, but nothing personal/confidential information)


2. Where is the data being transmitted

- As of now, all the data gathered from the DB Host is transmitted to the PMM Server.
- It is possible to transmit DB backups to Cloud S3 storage(optional). PMM Admin defines which Cloud S3 storage is used as a backup storage.

## Personal Data colection and processing 

Define the purpose of collecting and processing personal data.

As per our [Privacy Policy](https://www.percona.com/privacy-policy) the data collection purpose is to provide the services and product enhancements.

We do not collect/transfer personal data explicitly. But in case query analytics is enabled and collecting of query examples are not disabled we gather SQL query examples with real data and personal data may appear there if it is stored in DB.  All QAN data always remains within the PMM server, and is never transmitted anywhere else.

1. How often (frequency), how much (volume and) and which fields are processed? during data collection? For example, name, birth date etc.,.

In case Query Analytics is enabled and SQL query examples are gathered, we don't use any special processing for personal or confidential data. PMM server has no clue about the meaning of the data inside the SQL query. So it is processed as usual, which is to store inside the PMM server and present on the PMM UI by request. Data is gathered each minute.

Other than email addresses for Grafana users, PMM does not directly ask or collect any other PII data. For more information about the telemetry data that is collected, please refer to the [Percona Privacy Policy](http://www.percona.com/privacy-policy/). 

2. Personal Data: Processed for other applications or parties? Should the data that is created and processed in the cloud service be available to other applications or even 3rd parties?

PMM server doesn't pass any gathered data to any third party or other application.

## Confidential data colection and processing 

1. Is confidential data processed? Describe which confidential data is used. Define the purpose of collecting and processing confidential data.

We don't collect/transfer confidential data explicitly. But in case query analytics is enabled we gather SQL query examples with real data and confidential data may appear there if it is stored in the database.

2. How often (frequency), how much (volume and) and which fields are processed during **confidential** data collection? For example, name, birth date etc.,.

In case Query Analytics is enabled and SQL query examples are gathered-  we don't use any special processing for personal or confidential data. PMM server has no clue about the meaning of the data inside the SQL query. So it is processed as usual - store inside the PMM server and present on the PMM UI by request.
Data is gathered each minute.

3. Is confidential data processed for other applications or parties? Should the data that is created and processed in the cloud service be available to other applications or even 3rd parties?

We don't transmit any personal or confidential data to Percona Cloud or third party services/applications.

4. Is the encryption guaranteed? All the connections from and to the cloud must be encrypted. The data in the cloud storage too.

We use TLS for connections between:

- DB Host to PMM Server
- PMM Server to Percona Cloud
- PMM Server to remote DB (optionally, depends on configuration provided by User PMM Admin).

