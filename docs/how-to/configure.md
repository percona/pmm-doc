# Configure

[TOC]

## PMM Settings

The *PMM Settings* page lets you configure a number of PMM options. Open the *PMM Settings* page with one of:

- the main menu: choose *PMM*, *PMM Settings*
- search dashboards by name: type *PMM Settings* and click the search result

On the left of the *PMM Settings* page is a menu list of sections:

- [Metrics resolution](#metrics-resolutions)
- [Advanced settings](#advanced-settings)
- [SSH Key](#ssh-key)
- [Alertmanager Integration](#alertmanager-integration)
- [Percona Platform](#percona-enterprise-platform)

!!! alert alert-success "Tip"
    Click *Apply changes* after making changes in the *PMM Settings* page.

Common to all sections are *Diagnostics*:

PMM can generate a set of diagnostics data which can be examined and/or shared with Percona Support in case of some issue to solve it faster.  You can get collected logs from PMM Server by clicking *Download server diagnostics*.

### Metrics resolution

Metrics are collected at three intervals representing low, medium and high resolutions. Short time intervals are regarded as high resolution metrics, while those at longer time intervals are low resolution.

![image](../_images/PMM_Settings_Metrics_Resolution.jpg)

The *Metrics Resolution* radio button lets you select one of four presets.

- *Rare*, *Standard* and *Frequent* are fixed presets.
- *Custom* is an editable preset.

Each preset is a group of Low, Medium and High metrics resolution values. Low resolution intervals *increases* the time between collection, resulting in low-resolution metrics and lower disk usage. High resolution intervals *decreases* the time between collection, resulting in high-resolution metrics and higher disk usage.

The default values for the fixed presets are:

**Rare**

- Low: 300 seconds
- Medium: 180 seconds
- High: 60 seconds

**Standard**

- Low: 60 seconds
- Medium: 10 seconds
- High: 5 seconds

**Frequent**

- Low: 30 seconds
- Medium: 5 seconds
- High: 1 second

Values for the *Custom* preset can be entered as values, or changed with the arrows.

!!! note

    If there is poor network connectivity between PMM Server and PMM Client, or between PMM Client and the database server it is monitoring, scraping every second may not be possible when the network latency is greater than 1 second.

### Advanced Settings

![](../_images/PMM_Settings_Advanced_Settings.jpg)

**Data Retention**

*Data retention* specifies how long data is stored by PMM Server.

**Telemetry**

The *Telemetry* switch enables gathering and sending basic **anonymous** data to Percona, which helps us to determine where to focus the development and what is the uptake of the various versions of PMM. Specifically, gathering this information helps determine if we need to release patches to legacy versions beyond support, determining when supporting a particular version is no longer necessary, and even understanding how the frequency of release encourages or deters adoption.

Currently, only the following information is gathered:

* PMM Version,
* Installation Method (Docker, AMI, OVF),
* the Server Uptime.

We do not gather anything that would make the system identifiable, but the following two things are to be mentioned:

1. The Country Code is evaluated from the submitting IP address before it is discarded.

2. We do create an "instance ID" - a random string generated using UUID v4.  This instance ID is generated to distinguish new instances from existing ones, for figuring out instance upgrades.

The first telemetry reporting of a new PMM Server instance is delayed by 24 hours to allow sufficient time to disable the service for those that do not wish to share any information.

There is a landing page for this service, available at [check.percona.com](https://check.percona.com), which clearly explains what this service is, what it’s collecting, and how you can turn it off.

Grafana’s [anonymous usage statistics](https://grafana.com/docs/grafana/latest/installation/configuration/#reporting-enabled) is not managed by PMM. To activate it, you must change the PMM Server container configuration after each update.

As well as via the *PMM Settings* page, you can also disable telemetry with the `-e DISABLE_TELEMETRY=1` option in your docker run statement for the PMM Server.

!!! note

    1. If the Security Threat Tool is enabled in PMM Settings, Telemetry is automatically enabled.
    2. Telemetry is sent immediately; the 24-hour grace period is not honored.

**Check for updates**

When active, PMM will automatically check for updates and put a notification in the *Updates* dashboard if any are available.

**Security Threat Tool**

The Security Threat Tool performs a range of security-related checks on a registered instance and reports the findings.

It is disabled by default.

It can be enabled in *PMM > PMM Settings > Settings > Advanced Settings > Security Threat Tool*.

The checks take 24 hours to complete.

The results can be viewed in *PMM > PMM Database Checks*.

**DBaaS**

Shows whether DBaaS features are activated on this server.

!!! note
    DBaaS is a technical preview and requires activation via a server feature flag. See [Setting up a development environment for DBaaS](../setting-up/server/dbaas.md).

**Integrated Alerting**

Enables integrated (built-in) alerting. (See [Alerting](#alerting).)

**Public Address**

Public address for accessing DBaaS features on this server.

### SSH Key Details

This section lets you upload your public SSH key to access the PMM Server via SSH (for example, when accessing PMM Server as a [virtual appliance](../setting-up/server/virtual-appliance.md)).

![image](../_images/PMM_Settings_SSH_Key.jpg)

Enter your **public key** in the *SSH Key* field and click *Apply SSH Key*.

### Alertmanager integration

Alertmanager manages alerts, deduplicating, grouping, and routing them to the appropriate receiver or display component.

This section lets you configure integration of VictoriaMetrics with an external Alertmanager.

* The **Alertmanager URL** field should contain the URL of the Alertmanager which would serve your PMM alerts.

* The **Alerting rules** field is used to specify alerting rules in the YAML configuration format.

![image](../_images/PMM_Settings_Alertmanager_Integration.jpg)

Fill both fields and click the *Apply Alertmanager settings* button to proceed.

### Percona Enterprise Platform

This panel is where you create, and log into and out of your Percona Platform account.

**Logging in**

![image](../_images/PMM_Settings_Percona_Platform.jpg)

If you have a *Percona Platform* account, enter your credentials and click *Login*.

**Logging out**

![image](../_images/PMM_Settings_Sign_Out.jpg)

Click *Sign out* to log out of your Percona Platform account.

**Create an account**

![image](../_images/PMM_Settings_Sign_Up.jpg)

To create a *Percona Platform* account:

- Click *Sign up*
- Enter a valid email address in the *Email* field
- Choose and enter a strong password in the *Password* field
- Select the check box acknowledging our terms of service and privacy policy
- Click *Sign up*

A brief message will confirm the creation of your new account and you may now log in with these credentials.

!!! alert alert-info "Note"
    Your Percona Platform account is separate from your PMM User account.


## Alerting

As well as Alertmanager, PMM has its own built-in *integrated alerting* feature.

!!! alert alert-warning "Warning"
    Integrated alerting is a technical preview and is subject to change.

An *alert rule* is a named set of conditions or criteria.

Rules are defined by *filters*, based on our preset templates or from your own specifications.

When an event matches an alert rule, an *alert* is triggered.

The alert will cause a *notification* via one or more communication channels (e.g. email, slack message).

### Alert Rules

From the left main menu, select <i class="uil uil-bell"></i> *Alerting*, <i class="uil uil-list-ul"></i> *Alert rules*


### Notification channels

*Communication channels* are named configurations representing communication methods used to send alerts.

From the left main menu, select <i class="uil uil-bell"></i> *Alerting*, <i class="uil uil-comment-alt-share"></i> *Notification channels*

1. Click <i class="uil uil-channel-add"></i> *Add Channel*

2. In the section *New Notification Channel*, enter values for:

    - Name:
    - Type: (See below)
    - Default (send on all alerts):
    - Include image:
    - Disable Resolve Message:
    - Send reminders:

3. The next section will provide fields that depend on the value chosen for *Type*.

4. Click *Save*.

5. To test the channel, click *Send test*.





!!! seealso "See also"

    - [Using Integrated Alerting](../using/alerting.md)

    - [Prometheus Alertmanager](https://prometheus.io/docs/alerting/alertmanager/)

    - [Prometheus Alertmanager alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)
