# Access roles in PMM

Roles are a vital part of Access Management. Roles provide users with access to specific, role-based metrics. Roles in PMM allow administrators to define what kind of access users have to metrics.

## Enabling access roles in PMM

You can enable access roles in PMM as follows:

**Docker**

To enable access roles in a ``pmm-server`` docker container, pass an additional environment variable ``RBAC_ENABLE=1`` when starting the container.

```sh
docker run … -e RBAC_ENABLE=1
```

For compose an add additional variable:

```
services:
  pmm-server:
    …
    environment:
      …
      ENABLE_RBAC=1
```

## Creating access roles in PMM

To create access roles in PMM, do the following:

1. From the *Main* menu, navigate to *Configuration > Access Roles*. *Access Roles* tab
 opens.

 ![!](../../_images/PMM_access_control_create_role.png)

2. Click *Create*. Create role page opens.


3. Enter the Role name and Role description.

 ![!](../../_images/PMM_access_control_role_name.png)

4. Select the following from the dropdowns for metrics access:
    - Label
    - Operator
    - Value of the label.

 If you want to add more than one label for a role, click *+* and select the values from the dropdown.

5. Click *Create* role.

!!! note alert alert-primary "Note"
    To create roles, you must have admin privileges. For more information, see [Manage users](../../how-to/manage-users.md).

## Managing access roles is PMM

You can manage roles in PMM by editing or deleting a role.

### Editing a role

To edit access roles, do the following:

1. From the *Main* menu, navigate to *Configuration > Access Roles*. The Access Roles tab opens.

2. On the role you want to edit, click the *ellipsis (three vertical dots) > edit role* in the *Options* column. The *Edit* role page opens.

 ![!](../../_images/PMM_access_control_edit_role.png)

3. Make the required changes to the role.

 ![!](../../_images/PMM_access_control_edit_role_changes.png)


4. Click Save Changes.


### Setting a role as default

When a user signs in to PMM for the first time and the user has no role assigned, the user is automatically assigned the *Default* role. For administrators, the default role provides a convenient way to configure default permissions for new users.


To set a role as default, do the following:

1. From the *Main* menu, navigate to *Configuration > Access Roles*. The *Access Roles* tab opens.

2. On the role you want to set as default, click the *ellipsis (three vertical dots) > set as default* in the *Options* column.

 ![!](../../_images/PMM_access_control_default_role_changes.png)


### Removing a role

To remove access roles, do the following:

1. From the *Main* menu, navigate to *Configuration > Access Roles*. The *Access Roles* tab opens.

2. On the role you want to remove, click the *ellipsis (three vertical dots) > Delete* in the *Options* column. Delete role pop-up opens.

 ![!](../../_images/PMM_access_control_delete_role.png)


3. Click *Confirm* and delete the role.

