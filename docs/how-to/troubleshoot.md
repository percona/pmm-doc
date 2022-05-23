# Troubleshoot

## Update

If PMM server wasn't updated properly, or if you have concerns about the release, you can force the update process in 2 ways:

1. From the UI - Home panel: click with the Alt key on the reload icon in the Update panel to make the Update Button visible even if you are on the same version as available for update. Pressing this button will force the system to rerun the update so that any broken or not installed components can be installed. In this case, you'll go through the usual update process with update logs and successful messages at the end.

2. By  API  call (if UI not available): You can call the Update API directly with:

    ```sh
    curl --user admin:admin --request POST 'http://PMM_SERVER/v1/Updates/Start'
    ```

    Replace `admin:admin` with your username/password, and replace `PMM_SERVER` with your server address.

    !!! note alert alert-primary ""
        You will not see the logs using this method.

Refresh The Home page in 2-5 minutes and you should see that PMM was updated.

## Client-server connections

There are many causes of broken network connectivity.

When [using Docker](../setting-up/server/docker.md) the container is constrained by the host-level routing and firewall rules. For example, your hosting provider might have default `iptables` rules on their hosts that block communication between PMM Server and PMM Client, resulting in *DOWN* targets in VictoriaMetrics. If this happens, check the firewall and routing settings on the Docker host.

PMM is also able to generate diagnostics data which can be examined and/or shared with our support team to help solve an issue. You can get collected logs from PMM Client using the `pmm-admin summary` command.

Logs obtained in this way includes PMM Client logs and logs which were received from the PMM Server, stored separately in the `client` and `server` folders. The `server` folder also contains its own `client` subfolder with the self-monitoring client information collected on the PMM Server.

Beginning with [PMM 2.4.0](../release-notes/2.4.0.md), there is a flag that enables the fetching of [`pprof`](https://github.com/google/pprof) debug profiles and adds them to the diagnostics data. To enable, run `pmm-admin summary --pprof`.

You can get PMM Server logs with either of these methods:

### Direct download

In a browser, visit `https://<address-of-your-pmm-server>/logs.zip`.

### From Help menu

1. Select <i class="uil uil-question-circle"></i> *Help* → <i class="uil uil-download-alt"></i> *PMM Logs*.

2. Click *PMM Logs* to retrieve PMM diagnostics data which can be examined and shared with our support team should you need help.

## Connection difficulties

### Passwords

When adding a service, the host might not be detected if the password contains special symbols (e.g. `@`, `%`, etc.).

In such cases, you should convert any password, replacing special characters with their escape sequence equivalents.

One way to do this is to use the [`encodeURIComponent`][ENCODE_URI] JavaScript function in your browser's web console (commonly found under a *Development Tools* menu). Run the function with your password as the parameter. For example:

```js
> encodeURIComponent("s3cR#tpa$$worD")
```

will give:

```txt
"s3cR%23tpa%24%24worD"
```

### Password change

When adding clients to the PMM server, you use the `admin` user. However, if you change the password for the admin user from the PMM UI, then the clients will not be able to access PMM due to authentication issues. Also, due to multiple unsuccessful login attempts, Grafana will lock out the admin user.

In such a scenario, use [API key](../../details/api.md#api-keys-and-authentication) for authentication. You can use API keys as a replacement for basic authentication.

## Integrated Alerting

### No <i class="uil uil-bell"></i> Integrated Alerting icon

You are not logged in as a privileged user. You need either Admin or Editor roles to work with Integrated Alerting.

### <i class="uil uil-bell"></i> Integrated Alerting icon but no submenu

Integrated Alerting isn't activated.

1. Go to <i class="uil uil-cog"></i> *Configuration* → <i class="uil uil-setting"></i> *Settings* → *Advanced Settings*.
2. Enable *Integrated Alerting*.

### Unreachable external IP addresses

**When I get an email or page from my system the IP is not reachable from outside my organization how do I fix this?**

To configure your PMM Server’s Public Address, select <i class="uil uil-cog"></i> *Configuration* → <i class="uil uil-setting"></i> *Settings* → *Advanced Settings*, and supply an address to use in your alert notifications.

### What is 'Alertmanager integration'?

**There’s already an Alertmanager integration tab without me turning it on, I know because I was using your existing Alertmanager integration.**

This will continue to work but will be renamed *External Alertmanager*.

### Notification channels not working

**I tried to setup a Slack/Email channel but nothing happened.**

Before you can use a notification channel you must provide your connection details.

1. Go to *PMM* → *PMM Settings* → *Communication*.
2. Define your SMTP server or Slack incoming webhook URL.

For PagerDuty you can configure in the notification channel tab of Integrated Alerting by supplying your server/routing key.

### What's the difference: Username/Password vs Identity/Secret

**In configuring my email server I’m being asked for a Username and Password as well as Identity and Secret. What is the difference between these and which do I use or do I need both?**

It depends on what kind of authentication your system uses:

- `LOGIN`: Use Username/Password.
- `PLAIN`: Use either Username or Identity and Password.
- `CRAM-MD5`: Use Username and Secret.

### Alert Rule Templates is disabled

Built-In alerts are not editable, but you can copy them and edit the copies. (In [PMM 2.14.0](../release-notes/2.14.0.md) and above).

If you create a custom alert rule template you will have access to edit.

### Creating rules

**I'm ready to create my first rule! I've chosen a template and given it a name...what is the format of the fields?**

- Threshold - float value, it has different meanings depending on what template is used.

- Duration - The duration the condition must be satisfied in seconds.

- Filters - A Key, Evaluator, and Value. E.g. `service_name=ps5.7`

    - Key must be an exact match. You can find a complete list of keys by using the <i class="uil uil-compass"></i> *Explore* main menu item in PMM.

    - Evaluator can be: `=` `=~`.

    - Value is an exact match or when used with a ‘fuzzy’ evaluator (`=~`) can be a regular expression. E.g. `service_name=~ps.*`

### Variables in Templates

**The concept of *template* implies features like variable substitutions...where can I use these? Where can I find a complete list of them?**

Here is a guide to creating templates for Alertmanager: <https://prometheus.io/docs/prometheus/latest/configuration/template_examples/>

## Missing data

**Why don't I see the whole query?**

To reduce space usage, long query examples and fingerprints can be truncated to 1024 symbols. In this case, the query explains section will not work.

[ENCODE_URI]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent



