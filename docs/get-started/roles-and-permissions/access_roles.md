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

### Creating access roles in PMM

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

