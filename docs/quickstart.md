# Quickstart Guide


This guide covers how you can quickly get started using PMM.


## Prerequisites

The following are the prerequisites for using PMM:

- Install [Docker](https://docs.docker.com/engine/install/) 1.12.6 or higher version.

- Docker compatible *nix based systems


You can use the [easy installation](https://docs.percona.com/percona-monitoring-and-management/setting-up/server/easy-install.html) script that will verify and install any missing software and dependencies. To use it, run the command with sudo privileges or as root.


## Install PMM



You can install PMM server using CuRL and wget as follows:


=== "cURL"

    ```sh
    curl -fsSL https://www.percona.com/get/pmm | /bin/bash
    ```

=== "wget"

    ```sh
    wget -qO - https://www.percona.com/get/pmm | /bin/bash    
    ```