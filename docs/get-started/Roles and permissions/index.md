# About Access Control in PMM

!!! caution alert alert-warning "Caution"
    PMM Access Control is currently in [technical preview](../details/glossary.md#technical-preview) and is subject to change. We recommend that early adopters use this feature for testing purposes only.


Access control in PMM allows you to manage who has access to individual Prometheus (Victoria Metics)  metrics based on labels. Thus, access management provides a standardized way of granting, changing, and revoking access to metrics based on the role assigned to the users.

By creating roles, you can specify which data can be queried based on specific label criteria, for instance, allowing the QA team to view data related to test environments.


