# Easy-install script

!!! caution alert alert-warning "Caution"
    You can download and check `get-pmm.sh` before running it from our [github]:

## Linux or macOS
Using Curl:
```sh
curl -fsSL https://www.percona.com/get/pmm | /bin/bash
```

Using wget: 
```sh
wget -O - https://www.percona.com/get/pmm | /bin/bash
```

This script:

- Installs Docker if it is not installed.
- If a PMM Server Docker container is running, it is stopped and backed up.
- Pulls and runs the latest PMM Server Docker image.
- this script also has an interactive mode if you'd like to change default settings:
```sh
curl -fsSL https://www.percona.com/get/pmm (or wget https://www.percona.com/get/pmm)
chmod +x pmm
./pmm --interactive
```


[github]: https://github.com/percona/pmm/blob/main/get-pmm.sh
