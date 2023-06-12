# Percona Alerting

!!! alert alert-info ""
    Percona Alerting is the new Alerting feature introduced in PMM 2.31. This replaces the Integrated Alerting feature available in previous versions.  
    
Alerting notifies of important or unusual activity in your database environments so that you can identify and resolve problems quickly. When something needs your attention, PMM automatically sends you an alert through your specified contact points.

## Alert types
Percona Alerting is powered by Grafana infrastructure. PMM leverages Grafana's advanced alerting capabilities and adds an extra layer of alert templates that simplifies complex alert rules.

Depending on the datasources that you want to query, and the complexity of your required evaluation criteria, PMM enables you to create the following types of alerts:

- **Percona templated alerts**: alerts based on a set of default templates with common events and expressions for alerting.
If you need custom expressions on which to base your alert rules, you can also create your own templates.
- **Grafana managed alerts**: alerts that handle complex conditions and can span multiple different data sources like SQL, Prometheus, InfluxDB, etc. These alerts are stored and executed by Grafana.
<!--- we dont use support these for now so commenting them out

- **Mimir or Loki alerts**: alerts that consist of one single query, written in PromQL or LogQL. The alert rules are stored and executed on the Mimir or Loki ruler and are completely decoupled from the PMM and Grafana runtime.
- **Mimir or Loki recording rules**: precompute the result of expensive queries and execute alerts faster.
With Mimir and Loki alert rules, you can run alert expressions closer to your data and at massive scale, managed by Grafana.

-->

## Alerting components
Alerts are split into four key components: alert rules, contact points, notification policies, and silences.

### Alert rules
Describe the circumstances under which you want to be alerted. The evaluation criteria that you define determine whether an alert will fire.

An alert rule consists of one or more queries and expressions, a condition, the frequency of evaluation, and the duration over which the condition is met.

For example, you might configure an alert to identify and notify you when MongoDB is down.

Provide a simplified framework for configuring complex alert rules.

PMM includes a set of default templates with common events and expressions for alerting. You can also create your own templates if you need custom expressions on which to base your alert rules.

You can check the alert templates available for your account under **Alerting > Alert rule templates** tab. PMM lists here the following types of templates:

1. Built-in templates, available out-of-the-box with PMM.
2. Custom templates created or uploaded on the **Alerting page > Alert Templates** tab.
3. Custom template files available in your ``yaml srv/alerting/templates`` directory. PMM loads them during startup.

### Notification policies

Notification policies determine how Grafana alerts are routed to contact points by setting where, when, and how to send notifications.

For example, you might specify a limit for the number of times a notification is sent during a certain period. This helps ensure that you don't spam your Slack channel with too many notifications about the same issue.

#### Configure Email (SMTP) server settings
Percona Alerting comes pre-configured with a Notification Root Policy, which is the default notification policy that PMM applies to ALL alerts that don’t have a custom notification policy assigned to them. This root notification policy is called **grafana-default-email** and uses Email as the default contact point.

To configure Email notifications for the root policy or any custom Email policies, edit the PMM’s **grafana.ini** file. This holds the settings for [Grafana’s Alertmanager](https://grafana.com/docs/grafana/latest/alerting/manage-notifications/alertmanager/) which routes notifications to contact points.

To use SMTP with a PMM Docker installation:

1. Create an `.env` file and populate it with your SMTP credentials (and other environment variables) as follows:

        ```
        GF_SMTP_ENABLED=true  
        GF_SMTP_HOST=smtp.gmail.com:587
        GF_SMTP_USER=email@domain.com
        GF_SMTP_PASSWORD=<YOUR_SMTP_PASSWORD>
        GF_SMTP_SKIP_VERIFY=false
        GF_SMTP_FROM_ADDRESS=email@domain.com
        GF_SMTP_FROM_NAME=Percona Alerting
        ```

2. Pass in the `.env` file to Docker run using the `--env-file` flag: ```docker run --env-file=.env -p 443:443 -p 80:80 percona/pmm-server:2```.

#### Restore SMTP settings following an upgrade

Upgrading PMM will overwrite the **grafana.ini** file with a newer version. If you configured PMM to use SMTP settings via environment variables, you do not need to do anything after an upgrade as your settings will be transferred.

If the SMTP settings were configured directly in the **grafana.ini** file, make sure to manually back up the .ini file and copy your SMTP settings after the upgrade. This is because upgrading PMM will overwrite the grafana.ini file.

PMM's root notification policy,**grafana-default-email**, uses Email as the default contact point. To use this default contact, configure it with your email user account information so PMM can out PMM will show a **No Attempts** status next to this contact point.

To edit the root notification policy:
1. Click the Edit button in the **Actions** column.
2. Enter the email addresses of the recipients for the alert notifications.
3. Fill in any relevant optional email settings. For example, you could choose to send one single email to all the recepients, or include an optional message. 
6. If you do not want to be notified when an alert resolves, expand **Notification settings**, and tick the **Disable Resolved Message** checkbox.
7. Click the **Save** button then click **Test** to send a test email and make sure your contact point works as expected.


### Contact points

Contact points specify how PMM should deliver Grafana-managed alerts. When an alert fires, PMM sends a notification to the specified contact points.

Depending on the severity of an alert, you might want to send different alerts to different channels. For example, you can deliver common alerts via Slack channel, but send an email notification for potentially critical issues.  

#### Create a new contact point

To create a new contact point:
1. Go to **Alerting > Contact points** and click **New Contact Point**.
2. Enter a name and choose the contact point type from the drop-down list. You can choose from a variety of contact points, including Slack, email, webhooks, PagerDuty, and more.
3. Fill out the mandatory fields. For example, for Slack, PMM requires the recipient information, the API token and the webhook URL, which you can get from your Slack administrator.
4. Expand **Optional settings** and fill in any other relevant settings.
5. If you do not want to be notified when an alert resolves, expand **Notification settings**, and tick the **Disable Resolved Message** checkbox.
6. If you want your contact point to notify via multiple channels, for example both via Email and Teams, click **New contact point type** and fill out additional contact point type details.
7. Click **Save contact point** button at the bottom of the page. Your new contact point is now listed under **Alerting > Contact points**.


#### Add new notification policy
After setting up a contact point, you can use it to create new notification policies. 
Open the **Notifications** tab and edit the default Root policy or click **New specific policy** to create a custom one.

### Root policy fields
- **Default contact point **- The contact point to send notifications to that did not match any specific policy.
- **Group by** - Defines how alert rules are processed into notifications. If multiple alerts are matched for this policy, they will be grouped based on these labels and a notification will be sent per group. Mandatory for root policy, optional for nested specific policies. If a specific policy does not specify own grouping, root policy grouping will be used instead.
- **Group timing options**- defines how notification wait times are processed. These are short pauses the system can take to efficiently process multiple sets of alerts for notifications.
- **Group wait** - How long to wait to buffer alerts of the same group before sending a notification initially. Default is 30 seconds.
- **Group interval** - Default is to wait 5 minutes to send a batch of new alerts after the first notification was sent.
**Repeat interval** - Default is to wait four hours to resend an alert after being successfully sent and no new alerts were added to the group. 

### Specific policy fields
- **Contact point**- The contact point to send notification to if alert matched this specific policy but did not match any of it’s nested policies, or there were no nested specific policies.
- **Matching labels** - define the rules for matching alert labels. A policy will match an alert if alert’s labels match all of the matching labels specified on the policy. If there are no matchers, the policy will handle ALL ALERT INSTANCES. 
- **Continue matching subsequent sibling nodes** - If not enabled and an alert matches this policy but not any of it’s nested policies, matching will stop and a notification will be sent to the contact point defined on this policy. If enabled, notification will be sent but alert will continue matching subsequent siblings of this policy, thus sending more than one notification. Use this if for example you want to send notification to a catch-all contact point as well as to one of more specific contact points handled by subsequent policies.
- **Override grouping** - Toggle if you want to override grouping for this policy. If toggled, you will be able to specify grouping same as for root policy described above. If not toggled, root policy grouping will be used. 
Toggle if you want to override group timings for this policy. If toggled, you will be able to specify group timings same as for root policy described above. If not toggled, root policy group timings will be used.
- **Mute Timings**: This stops notifications from being sent out to contact points. 
IMPORTANT: Time specified in mute timing must be in UTC and military format i.e. 14:00 not 2:00 PM.


## Create a Percona templated alert
This section focuses on creating an alert rule based on PMM templates. For information on working with the other alert types, check the Grafana documentation on [Grafana Labs](https://grafana.com/docs/grafana/latest/alerting/).

### Provision alert resources
Before creating PMM alert rules, configure the required alert resources:

1. Go to **Configuration > PMM Settings** and ensure that the **Alerting** option is enabled. This is enabled by default starting with PMM 2.31. However, if you have disabled it, the **Alerting** page displays only Grafana-managed alert rules. This means that you will not be able to create alerts based on PMM templates.
2. Go to **Dashboards > Browse** and check the folders available for storing alert rules. If none of the available folders are relevant for your future alert rules, click **New > New Folder** and create a custom one.
3. Go to **Alerting > Alert Rule Templates** and check the default PMM templates. If none of the templates include a relevant expression for the type of alerts that you want to create, click **Add** to create a custom template instead.

#### Configure alert templates
Alerts templates are YAML files that provide the source framework for alert rules.
Alert templates contain general template details and an alert expression defined in [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html). This query language is backward compatible with Prometheus QL.

#### Create custom templates

If none of the default PMM templates contain a relevant expression for the alert rule that you need, you can create a custom template instead.

You can base multiple alert rules on the same template. For example, you can create a `pmm_node_high_cpu_load` template that can be used as the source for alert rules for production versus staging, warning versus critical, etc.

#### Template format
When creating custom templates, make sure to use the required template format below:

- **name** (required): uniquely identifies template. Spaces and special characters are not allowed.
- **version** (required): defines the template format version.
- **summary** (required): a template description.
- **expr** (required): a MetricsQL query string with parameter placeholders.
- **params**: contains parameter definitions required for the query. Each parameter has a name, type, and summary. It also may have a unit, available range, and default value.
    - **name** (required): the name of the parameter. Spaces and special characters are not allowed.
    - **summary** (required): a short description of what this parameter represents.
    - **unit** (optional): PMM currently supports either s (seconds) or % (percentage).
    - **type** (required): PMM currently supports the `float` type. `string`, `bool`, and other types will be available in a future release.
    - **range** (optional): defines the boundaries for the value of a  float parameter
   - **value** (optional): default parameter value. Value strings must not include any of these special characters: `< > ! @ # $ % ^ & * ( ) _ / \ ' + - = (space)`
- **for** (required): specifies the duration of time that the expression must be met before the alert will be fired
- **severity** (required): specifies default alert severity level
 - **labels** (optional): are additional labels to be added to generated alerts

- **annotations** (optional): are additional annotations to be added to generated alerts.

#### Template example

```yaml
{% raw %}
---
templates:
 - name: pmm_mongodb_high_memory_usage
   version: 1
   summary: Memory used by MongoDB
   expr: |-
      sum by (node_name) (mongodb_ss_mem_resident * 1024 * 1024)
      / on (node_name) (node_memory_MemTotal_bytes)
       * 100
       > [[ .threshold ]]
   params:
     - name: threshold
       summary: A percentage from configured maximum
       unit: "%"
       type: float
       range: [0, 100]
       value: 80
   for: 5m
   severity: warning
   labels:
      custom_label: demo
   annotations:
      summary: MongoDB high memory usage ({{ $labels.service_name }})
      description: |-
         {{ $value }}% of memory (more than [[ .threshold ]]%) is used
         by {{ $labels.service_name }} on {{ $labels.node_name }}.
{% endraw %}
```

## Test alert expressions
If you want to create custom templates, you can test the MetricsQL expressions for your custom template in the **Explore** section of PMM. Here you can also query any PMM internal database.

To test expressions for custom templates:

1. On the side menu in PMM, choose **Explore > Metrics**.
2. Enter your expression in the **Metrics** field and click **Run query**.

For example, to validate that a MongoDB instance is down, shut down a member of a three-node replica set, then check that the expression `{service_type="mongodb"}` returns **0** in **Explore > Metrics**.

### Add an alert rule
After provisioning the resources required for creating Percona templated alerts, you are now ready to create your alert:

1. Go to **Alerting > Alert Rules**, and click **New alert rule**.
2. On the **Create alert rule** page, select the **Percona templated alert** option. If you want to learn about creating Grafana alerts instead, check our [Grafana's documentation](https://grafana.com/docs/grafana/latest/alerting/).
3. In the **Template details** section, choose the template on which you want to base the new alert rule. This automatically populates the **Name**, **Duration**, and **Severity** fields with information from the template. You can change these values if you want to override the default specifications in the template.
4. In the **Filters** field, specify if you want the alert rule to apply only to specific services or nodes. For example `service_name'`, Operator:`MATCH`, VALUE: `ps5.7`.
5. From the **Folder** drop-down menu, select the location where you want to store the rule.
6. Click **Save and Exit** to close the page and go to the **Alert Rules** tab where you can review, edit and silence your new alert.

## Silence alerts
Create a silence when you want to stop notifications from one or more alerting rules.

 During a silence, PMM continues to track metrics but does not trigger alerts or send notifications to any specified contact points. Once the silence expires alerts and notifications will resume.

 For example, you can create a silence to suppress trivial notifications during a specific weekend.

Silenced alerts are still recorded under **Alerting > Fired Alerts** so that you can review them later. Silenced alerts are disabled for as long as it's specified in the Silence Duration or until you remove a silence.

#### Add a silences

You can easily silence an alert from the **Fired alerts** page or from the **Alert rules** page.

You can also create a silence from the **Silences** page, but here you would also need to define labels that match the alert to you want to silence.
To create a new silence from the **Silences** page:

1. Click the **New Silence** button.
2. Select the start and end date to indicate when the silence should go into effect and expire.
3. Optionally, update the duration to alter the time for the end of silence in the previous step to correspond to the start plus the duration.
4. Enter one or more matching labels by filling out the **Name** and **Value** fields. Matchers determine which rules the silence will apply to.
5. Enter a comment.
6. Review the affected alert intstances that will be silenced.
7. Click **Sumbit** to create the silence.
 

For more information on working with silences, see [About alerting silences](https://grafana.com/docs/grafana/latest/alerting/manage-notifications/create-silence/) in the Grafana documentation.

## Deprecated alerting options
 PMM 2.31 introduced Percona Alerting which replaces the old Integrated Alerting in previous PMM versions. In addition to full feature parity, Percona Alerting includes additional benefits like Grafana-based alert rules and a unified, easy-to-use alerting command center on the **Alerting** page.

### Alerting compatibility

#### Template compatibility with previous PMM versions

If you have used Integrated Alerting in previous PMM versions, your custom alert rule templates will be automatically migrated to PMM 2.31. After upgrading to this new version, you will find all your alert templates under **Alerting > Alert Templates**.

If you have any templates available in the  ``/srv/ia/templates`` folder, make sure to transfer them to ``/srv/alerting/templates`` as PMM 2.31 and later will look for custom templates in this location.

If you are upgrading from PMM 2.25 and earlier, alert templates will not be automatically migrated. This is because PMM 2.26.0 introduced significant changes to the core structure of rule templates.

In this scenario, you will need to manually recreate any custom rule templates that you want to transfer to PMM 2.26.0 or later.

#### Template compatibility with other alerting tools

If you have existing YAML alert templates that you want to leverage in Percona Alerting:

1. Go to **Alerting > Alert Rule Templates** tab and click **Add** at the top right-hand side of the table.
2. Click **Add** and upload a local .yaml file from your computer.

#### Migrate alert rules
Alert rules created with Integrated Alerting in PMM 2.30 and earlier are not automatically migrated to Percona Alerting.

After upgrading to PMM 2.31, make sure to manually migrate any alert rules that you want to transfer to PMM 2.31 using the [Integrated Alerting Migration Script](https://github.com/percona/pmm/blob/main/ia_migration.py).

##### Script commands
The default command for migrating rules is:
```yaml 
*python ia_migration.py -u admin -p admin*
```
To see all the available options, check the scrip help using `ia_migration.py -h`

##### Script prerequisites
- Python version 3.x, which you can download from [Python Downloads centre](https://www.python.org/downloads/).
- [Requests  library](https://requests.readthedocs.io/en/latest/user/install/#install), which you can install with the following command: ```pip install requests```.

!!! caution alert alert-warning "Important"
    The script sets all migrated alert rules to Active. Make sure to silence any alerts that should not be firing.

For more information about the script and advanced migration options, check out the help information embedded in the script.

### Disable Percona Alerting
Percona Alerting is enabled by default in the PMM Settings. This feature adds the **Percona templated alerts** option on the **Alerting** page.

If for some reason you want to disable PMM Alert templates and keep only Grafana-managed alerts:

1. Go to **Configuration > PMM Settings**.
2. Disable the **Alerting** option. The **Alerting** page will now display only Grafana-managed alert rules.
