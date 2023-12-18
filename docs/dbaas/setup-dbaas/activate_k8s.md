# Start PMM server and activate a DBaaS feature

!!! note alert alert-primary ""
    - To start a fully-working 3 node XtraDB cluster, consisting of sets of 3x HAProxy, 3x PXC and 6x PMM Client containers, you will need at least 9 vCPU available for minikube. (1x vCPU for HAProxy and PXC and 0.5vCPU for each pmm-client containers).
    - DBaaS does not depend on PMM Client.
    - You can pass the environment variable `--env ENABLE_DBAAS=1` to force the DBaaS feature when starting up pmm-server container. **You can omit the variable and enable the feature later using PMM UI**, please follow the link in step 3. below.
    - Add the option `--network minikube` if you run PMM Server and minikube in the same Docker instance. (This will share a single network and the kubeconfig will work.)
    - Add the options `--env PMM_DEBUG=1` and/or `--env PMM_TRACE=1` if you need extended debug details

1. Start PMM server:

    ```sh
    docker run --detach --publish 80:80 --publish 443:443 --name pmm-server percona/pmm-server:2
    ```

2. Change the default administrator credentials from CLI:

    (This step is optional, because the same can be done from the web interface of PMM on first login.)

    ```sh
    docker exec -t pmm-server bash -c 'ln -s /srv/grafana /usr/share/grafana/data; chown -R grafana:grafana /usr/share/grafana/data; grafana-cli --homepath /usr/share/grafana admin reset-admin-password <RANDOM_PASS_GOES_IN_HERE>'
    ```

!!! caution alert alert-warning "Important"
    You must [activate DBaaS](../dbaas/get-started.md#activate-dbaas) using the PMM UI if you omitted `--env ENABLE_DBAAS=1` when starting up the container.