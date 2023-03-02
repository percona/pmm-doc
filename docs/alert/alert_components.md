# Alerting components

Alerts are split into four key components: alert rules, contact points, notification policies, and silences. 

## Alert rules

Describe the circumstances under which you want to be alerted. The evaluation criteria that you define determine whether an alert will fire. 

An alert rule consists of one or more queries and expressions, a condition, the frequency of evaluation, and optionally, the duration over which the condition is met.

For example, you might configure an alert to identify and notify you when MongoDB is down.

Provide a simplified framework for configuring complex alert rules. 

PMM includes a set of default templates with common events and expressions for alerting. You can also create your own templates if you need custom expressions on which to base your alert rules.

You can check the  alert templates available for your account under **Alerting > Alert rule templates** tab. PMM lists here the following types of templates:

1. Built-in templates, available out-of-the-box with PMM.
2. Alert templates fetched from Percona Platform, according to the entitlements available for your Percona Account. 
3. Custom templates created or uploaded on the **Alerting page > Alert Templates** Tab. 
4. Custom template files available in your  ``yaml srv/alerting/templates`` directory. PMM loads them during startup.

### Silences
Silences specify periods of time to suppress notifications. During a silence, PMM continues to track metrics and trigger alerts but does not send notifications to the specified contact points. Once the specified silence expires, notifications are resumed.

For example, you can create a silence to suppress trivial notifications during weekends.

### Contact points
Contact points specify how PMM should deliver Grafana-managed alerts. When an alert fires, a notification is sent to the specified contact points. 

Depending on the severity of an alert, you might want to send different alerts to different channels. For example, you can deliver common alerts via Slack channel, but send an email notification for potentially critical issues. 

You can choose from a variety of contact points, including Slack, email, webhooks, PagerDuty, and more. 

### Notification policies
Notification policies determine how Grafana alerts are routed to contact points by setting where, when, and how to send notifications. 

For example, you might specify a limit for the number of times a notification is sent during a certain period. This helps ensure that you don't spam your Slack channel with too many notifications about the same issue.

