# Easy-install script

!!! caution alert alert-warning "Caution"
    You can download and check `get-pmm.sh` before running it from our [github]:

## Linux or macOS

```sh
curl -fsSL https://raw.githubusercontent.com/percona/pmm/main/get-pmm.sh | /bin/bash
```

This script:

- installs Docker if not already installed;
- if there is a PMM Server docker container running, it's stopped and backed up;
- pulls and runs the latest PMM Server docker image;


[github]: https://github.com/percona/pmm/blob/main/get-pmm.sh
