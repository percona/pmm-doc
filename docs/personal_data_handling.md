# Personal or sensitive data handling in PMM

Following questions are being answered related to personal data handling in PMM:

1. Which data specifically is being transmitted (non-personal data, only metrics)?

**From the DB host to PMM**

Th following data is collected from database host to PMM:

- Metrics
- SQL query examples for query analytics (optional)

**From PMM to DB Host:**

Th following data is collected from PMM to database host:

- DSN+credentials for accessing database (a separate DB user is used (read-only) for accessing the database)

**From DB Host to Cloud S3**

Th following data is collected from the database host to Cloud S3:

DB backup (optionally if PMM Admin configures this)

**From PMM Server to Percona Cloud**

Telemetry (the exact data varies from version to version of the PMM Server, but nothing personal/confidential information)






DB host PMM collects Metrics ans SQL query examples?

Which data specifically is being transmitted (non-personal data, only metrics?)
A:
DB Host->PMM:
Metrics
SQL query examples for query analytics (optionally)
PMM->DB Host:
DSN+credentials for accessing DB (we use a separate DB user (read-only) for accessing DB)
DB Host->Cloud S3:
DB backup (optionally if PMM Admin configures this)
PMM Server -> Percona Cloud:
Telemetry (the exact data varies from version to version of PMM Server, but nothing personal/confidential)

b) Where are we transmitting data?
A:
Right now all data gathered from DB Host is transmitted to PMM Server.
It is possible to transmit DB backups to Cloud S3 storage(optionally). PMM Admin defines which Cloud S3 storage is used as backup storage.

c) Personal Data: Purpose of collection and processing? Define the purpose of data collection or data processing

As per our Privacy Policy, the data collection purposes are to provide the services and product enhancements.

A: We don't collect/transfer personal data explicitly. But in case query analytics is enabled and collecting of query examples are not disabled we gather SQL query examples with real data and personal data may appear there if it is stored in DB.  All QAN data always remains within the PMM server, and is never transmitted anywhere else

d) Quantity structure of personal data (volume, number, frequency)? How often? How much? Which fields are processed? E.g. Name, Birth Date and so on.

A: In case Query Analytics is enabled and SQL query examples are gathered, we don't use any special processing for personal or confidential data. PMM server has no clue about the meaning of the data inside the SQL query. So it is processed as usual, which is to store inside the PMM server and present on the PMM UI by request.
Data is gathered each minute.
Other than email addresses for Grafana users, PMM does not directly ask or collect any other PII data. For more information about the telemetry data that is collected, please refer to the Percona Privacy Policy. 

e) Personal Data: Processed for other applications or parties? Should the data that is created and processed in the cloud service be available to other applications or even 3rd parties?

A: PMM server doesn't pass any gathered data to any third party or other application.

f) Are confidential data processed? Describe which confidential data are used.
Confidential Data: Purpose of collection and processing? Define the purpose of data collection or data processing

A: We don't collect/transfer confidential data explicitly. But in case query analytics is enabled we gather SQL query examples with real data and confidential data may appear there if it is stored in DB.

g) Quantity structure of confidential data (volume, number, frequency)? How often? How much? Which fields are processed?

A: In case Query Analytics is enabled and SQL query examples are gathered-  we don't use any special processing for personal or confidential data. PMM server has no clue about the meaning of the data inside the SQL query. So it is processed as usual - store inside the PMM server and present on the PMM UI by request.
Data is gathered each minute.

h) Confidential Data: Processed for other applications or parties? Should the data that is created and processed in the cloud service be available to other applications or even 3rd parties?

 A: we don't transmit any personal or confidential data to Percona Cloud or third party services/applications.

i) Is the encryption guaranteed? All connections from and to the cloud must be encrypted. The data in the cloud storage too.

A: we use TLS for connections between:
DB Host -> PMM Server
PMM Server -> Percona Cloud
PMM Server -> remote DB (optionally, depends on configuration provided by User PMM Admin).





