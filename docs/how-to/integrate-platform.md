# Integrate PMM with Percona Platform
!!! alert alert-info ""
    Disclaimer: Percona Platform is a Preview release and several functionalities are still under development or subject to change. As such, we recommend connecting PMM to Percona Platform only for testing purposes.

Percona Platform Portal brings together database distributions, support expertise, services, management, and automated insights. 

Connect your PMM servers to Percona Platform to boost the monitoring capabilities of your PMM installations and manage database deployments easier. In addition, you get access to PMM updates, automated insights, advanced advisor checks and more alert rule templates.

### Connect PMM to Percona Platform

To connect to Percona Platform, you need a Percona Account. With a Percona Account you also get access to various Percona services, including Percona Platform, Percona Customer Portal, and Community Forum.

If you don't have a Percona Account, you can create one on the [Percona Account Sign Up](https://id.percona.com/signin/register/) page.

#### Pre-requisites
To ensure that PMM can establish a connection to Percona Platform: 

### Check that you are a member of an existing Platform organization
1. Log in to [Percona Platform](https://portal.percona.com) using your Percona Account.
2. On the *Getting Started page*, check that the *Create organization* step shows an option to view your organization.

If you see an option to create a new organization instead, your Percona Account is not linked to any organization yet. If this is the case, contact your account administrator, or create a new organization for your Percona Account.

### Set the public address of your PMM server 
1. In PMM, go to *Settings > Advanced Settings*.
2. Enter your address/hostname or click *Get from browser* to enable your browser to automatically detect and populate this field.
3. Save the changes.

## Connect PMM to Percona Platform
To connect your PMM server to Percona Platform:

1. In PMM go to *Settings > Percona Platform* tab to fill in the *Connect PMM to Percona Portal* form: ![!image](../docs/_images/PMM_Settings_Percona_Platform_Login.png)

2. The **PMM server ID** field is automatically populated with the ID identified for your PMM instance. Enter the name of your PMM instance and click **Get token** to go to Percona Platform Portal and generate your access token.
3. Log into Percona Platform using your Percona Account (if you don't have an active current session).
4. On the Profile Settings page, copy the code from the **Percona Platform Access Token** field.
5. Back into PMM, paste the Access Token into the **Percona Platform Access Token** field and click  *Connect*.

To confirm that you have successfully connected the server and check the list of all servers currently connected to an organization, go to [Percona Platform](https://portal.percona.com) > **Dashboard** tab and click **View Instances** next to the **Connect your PMM** step. 

## Check Percona Portal entitlements
After connecting to Percona Platform, PMM has access to additional alert templates and registered Advisors checks.

If the Percona Account you used to connect PMM to Percona Platform is linked to a Percona Portal account, you have additional access to paid Advisor checks, which offer more advanced database heath assessments. 

For such accounts PMM displays two new tabs on the main menu: **Entitlements** ![entitlements](../docs/_images/entitlements.png) and ![support_tickets](../docs/_images/support_tickets.png) **Support tickets**, where customers can check all the information available for their accounts.

### Disconnect a PMM instance
 Disconnect a PMM instance when you want to unlink it from your Percona Platform organization or stop monitoring it there. 

To disconnect a PMM server, go to > <i class="uil uil-cog"></i> **Configuration > Settings > Percona Platform** and click **Disconnect**. 

To confirm that the server disconnected successfully, go to Percona Platform >  **Dashboard** tab > **View instances**. This displays the **PMM instances** page where you can check the list of servers currently connected to your Platform organization. 

## Sign into PMM with your Percona Account
Once you've successfully connected your PMM instance to Percona Platform, you can also sign into PMM usig your Percona Account:

1. Log out of your existing PMM session.

2. On the PMM login screen, click *Sign in with Percona Account*. 
 If you have an active Percona Account session on the same browser, PMM will log you in automatically. Otherwise, enter your Percona Account credentials to start a new session.