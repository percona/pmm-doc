# Developing Advisor checks
PMM offers sets of checks that can detect common security threats, performance degradation, data loss and data corruption.
 
As a developer, you can create custom checks to cover additional use cases, relevant to your specific database infrastructure.
 
## Advisor check format version 2
PMM 2.28 upgraded Advisor checks to version 2, to accomodate the following major enhancements introduced in this release: 

- Support for multiple queries
- Support for Victoria Metrics as a data source
- Database **Family** field to specify one of the supported database families: MYSQL, POSTGRESQL, MONGODB.

The enhancements in version 2 enable you to create more intelligent advisor checks, that deliver more value to your connected PMM instances.

If you are creating checks for PMM version 2.28 and newer, see [Advisor checks v.2](checks-v1.md) for information on developing custom checks for PMM 2.28 and later.

## Advisor check format version 1
If you are creating checks for PMM version 2.27 and older, see [Advisor checks v.1](checks-v1.md), for information on creating custom checks for PMM 2.27 and older. 
 
## Submit feedback
 We welcome your feedback on the current process for developing and debugging checks. Send us your comments over [Slack](https://percona.slack.com) or post a question on the [Percona Forums](https://forums.percona.com/).
 