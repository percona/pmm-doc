# Run PMM Server as a Docker container for DBaaS

1. Start PMM server from a feature branch:

    ```sh
    docker run --detach --name pmm-server --publish 80:80 --publish 443:443 --env ENABLE_DBAAS=1  percona/pmm-server:2;
    ```

    !!! caution alert alert-warning "Important"
        - Use `--network minikube` if running PMM Server and minikube in the same Docker instance. This way they will share single network and the kubeconfig will work.
        - Use Docker variables `--env PMM_DEBUG=1 --env PMM_TRACE=1` to see extended debug details.

2. Change the default administrator credentials:

    !!! note alert alert-primary ""
        This step is optional, because the same can be done from the web interface of PMM on the first login.

    ```sh
    docker exec -t pmm-server bash -c 'ln -s /srv/grafana /usr/share/grafana/data; chown -R grafana:grafana /usr/share/grafana/data; grafana-cli --homepath /usr/share/grafana admin reset-admin-password <RANDOM_PASS_GOES_IN_HERE>'
    ```

3. Set the public address for PMM Server in PMM settings UI

4. Follow the steps for [Add a Kubernetes cluster](../dbaas/get-started.md#add-a-kubernetes-cluster).

5. Follow the steps for [Add a DB Cluster](../dbaas/get-started.md#add-a-db-cluster).

6. Get the IP address to connect your app/service:

    ```sh
    minikube kubectl get services