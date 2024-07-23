# Manage PMM dashboards

PMM offers various types of dashboards for monitoring and managing the performance of your databases:

1. **Standard dashboards**: include database overviews, database-specific dashboards, system-level metrics, replication, and high availability dashboards. These offer comprehensive insights into various aspects of your database environment.
2. **Experimental dashboards**: newer, or less stable dashboards that usually introduce new metrics or visualizations or monitoring approaches.
3. **Custom dashboards**: user-created dashboards tailored to specific metrics or needs, allowing you to combine data from different sources for customized monitoring and analysis.

Standard and experimental dashboards are "provisioned dashboards", meaning they are:

- created by PMM out of the box based on predefined configurations to ensure consistency across deployments.
- protected from editing through the UI to prevent accidental modifications. Trying to modify these dashboards via the UI will result in a `Cannot save provisioned dashboard` error.
- replaced during PMM upgrades, to ensure they are always up-to-date with the latest version. Any manual changes made by setting `allowUIUpdates: true` in `/usr/share/grafana/conf/provisioning/dashboards/default.yml` will be overwritten.

Remember:

- Always work with cloned copies of PMM dashboards
- Changes to original PMM dashboards will be lost during updates
- Experimental dashboards may change more frequently, therefore consider re-cloning them after upgrades.

## Create dashboard folders

Folders help you organize and group PMM dashboards, especially useful for numerous dashboards and multiple teams using the same PMM instance.

To create a dashboard folder (requires **Admin** privileges):

1. On the PMM dashboards page, from the side menu, go to <i class="uil uil-plus"></i> **Dashboards > New folder**.

2. Enter a unique name for your folder and click **Create**.

## Manage dashboard folders

### Delete multiple dashboards

To delete multiple dashboards at once:

1. From the side menu, go to <i class="uil uil-apps"></i> **Dashboards > Browse**.
2. Select the dashboards that you want to delete, and click **Delete**.

### Move dashboards between folders

To move dashboards from one folder to another (requires **Editor** rights):

#### Method 1

1.  Go to **Dashboards > Browse**.
2.  Select the dashboards that you want to move and click **Move**.

    ![!image](../../_images/PMM_Move_dashboards.png)

3. On the **Choose Dashboard Folder** dialog box select the dashboards that you want to move from the drop-down. Click **Move**.

#### Method 2

The other way of moving dashboards from one folder to another is:

1. Open the dashboard that you want to move to another folder.
2. Click on {{icon.configuration}} icon to open **Dashboard Settings**.
3. On the **General** page, under **Folder** select the folder name that you want to move from the drop-down menu.

    ![!image](../../_images/PMM_Move_dashboards-way2.png)

4. Click **Save Dashboard** on the left.

### Navigate to a dashboard folder page to assign folder permissions

1. From the side menu, go to <i class="uil uil-apps"></i> **Dashboards > Browse** and hover over the dashboard folder whose permissions you want to set. 
2. Click **Go to Folder**.
3. Go to the **Permissions** tab and select the requisite permission from the drop-down for the various roles.

    ![!image](../../_images/PMM_Permissions_dashboards_folder.png)

## Edit dashboards

You cannot directly edit provisioned dashboards. Instead, clone the dashboard and edit or move the cloned dashboard freely: 

1. Open the dashboard.
2. Click the settings icon.
3. Select **Save as** to create a copy.
4. Name your copy and choose where to save it.

## Setting a custom Home dashboard

The Home dashboard you set is the dashboard all the users will see after logging in to PMM UI. You can set the home dashboard for a server, an organization, a team, or your user account.

### For your organization 

Organization Admins can set the home dashboard for their organization. For information on managing users in an organization, see [Manage Users](../../how-to/manage-users.md).

1. Navigate to the dashboard that you want to set as the home dashboard.
2. Click the <i class="uil uil-star"></i> star next to the dashboard title to mark the dashboard as a favorite.
3. Hover your cursor over {{icon.configuration}} **Configuration**.
4. Click **Preferences**.
5. In the **Home Dashboard** field, select the dashboard that you want to set as your home dashboard.
6. Click **Save**.

#### For a team

Organization and team Admins can set the home dashboard for their team:

1. Navigate to the dashboard that you want to set as your home dashboard.
2. Click <i class="uil uil-star"></i> star next to the dashboard to mark the dashboard as a favorite.
3. On the main menu, hover your cursor over {{icon.configuration}} **Configuration**. 
4. Click **Teams**. Grafana displays the team list.
5. Click on the team for whom you want to set the home dashboard and then navigate to the **Settings** tab.
6. In the **Home Dashboard** field, select the dashboard that you want to use for your home dashboard.
7. Click **Save**.

### Set your personal Home dashboard

1. From the main menu, go to <i class="uil uil-apps"></i> **Dashboards > Browse** and select the dashboard you want to set as your home dashboard.
2. Click the <i class="uil uil-star"></i> star next to the dashboard title to mark it as a favorite.
3. From the side menu go to {{icon.configuration}} **Configuration > Preferences**. In the **Home Dashboard** field, select the dashboard that you want to set as your home dashboard.

    ![!image](../../_images/PMM_set_home_dashboard.png)

4. Click **Save**.