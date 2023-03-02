# Silence alerts

Create a silence when you want to stop notifications from one or more alerting rules.

Silences stop notifications from being sent to your specified contact points.

Silenced alerts are still recorded under **Alerting > Fired Alerts** so that you can review them later. Silenced alerts are disabled for as long as it's specified in the Silence Duration or until you remove a silence.

For information on creating silences, see [About alerting silences](https://grafana.com/docs/grafana/latest/alerting/silences/) in the Grafana documentation.

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
  
-  [Requests  library](https://requests.readthedocs.io/en/latest/user/install/#install), which you can install with the following command: ```pip install requests```. 

!!! caution alert alert-warning "Important"
    The script sets all migrated alert rules to Active. Make sure to silence any alerts that should not be firing. 

For more information about the script and advanced migration options, check out the help information embedded in the script.

### Disable Percona Alerting

Percona Alerting is enabled by default in the PMM Settings. This feature adds the **Percona templated alerts** option on the **Alerting** page.

If for some reason you want to disable PMM Alert templates and keep only Grafana-managed alerts:

1. Go to **Configuration > PMM Settings**.
2. Disable the **Alerting** option. The **Alerting** page will now display only Grafana-managed alert rules.