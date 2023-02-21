# Configure access control in PMM

Roles are a vital part of Access control. Roles provide users with access to specific, role-based metrics.

You can configure access roles in PMM as follows:

## Configure access control using Docker

To configure access roles in a ``pmm-server`` docker container, pass an additional environment variable ``ENABLE_RBAC=1`` when starting the container.

```sh
docker run … -e ENABLE_RBAC=1
```

For compose add an additional variable:

```
services:
  pmm-server:
    …
    environment:
      …
      ENABLE_RBAC=1
```

## Configure access control from the UI

To configure access control from the UI, do the following:

From the main menu, navigate to <i class="uil uil-cog"></i> *Configuration* → <i class="uil uil-setting"></i> *Settings* → *Advanced Settings* → *Access Control* and click <i class="uil uil-toggle-off"></i> toggle.

















