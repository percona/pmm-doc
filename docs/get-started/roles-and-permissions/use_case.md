
# Use Case

This use case demonstrates the following scenario:

The following labels are there as part of this use case:

-  Environments: **prod** and **qa**

-  Projects: **shop** and **bank**

The following roles are created as part of this use case:

- Roles: Admin, Dev and QA

An overview of the infrastructure can be seen in the diagram below. PMM monitors several services. The metrics that are stored in VictoriaMetrics have the appropriate labels.

   ![!](../../_images/PMM_access_control_usecase_metrics.jpg)

 This diagram shows several roles within a company structure that have access to PMM, as well as the permissions they should be granted:

- Admin role - has access to all the metrics
- DBA role - has access to all metrics within **env=prod** only
- QA role - has access to all metrics within **env=qa** only

    ![!](../../_images/PMM_access_control_usecase_roles.jpg)
















