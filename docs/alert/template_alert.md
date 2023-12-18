# Create a Percona templated alert

This topic focuses on creating an alert rule based on PMM templates. For information on working with the other alert types, check the Grafana documentation on [Grafana Labs](https://grafana.com/docs/grafana/latest/alerting/).

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

- **name** (required field): uniquely identifies template. Spaces and special characters are not allowed.
- **version** (required): defines the template format version.
- **summary** (required field): a template description.
- **expr** (required field): a MetricsQL query string with parameter placeholders.
- **params**: contains parameter definitions required for the query. Each parameter has a name, type, and summary. It also may have a unit, available range, and default value.
    - **name** (required): the name of the parameter. Spaces and special characters are not allowed.
    - **summary** (required): a short description of what this parameter represents.
    - **unit** (optional): PMM currently supports either s (seconds) or % (percentage).
    - **type** (required):PMM currently supports the `float` type. `string`, `bool`, and other types will be available in a future release.
    - **range** (optional): defines the boundaries for the value of a  float parameter
   - **value** (optional): default  parameter value. Value strings must not include any of these special characters: `< > ! @ # $ % ^ & * ( ) _ / \ ' + - = (space)`
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

