# Setting up a development environment for DBaaS

## Start PMM server with DBaaS activated

!!! note
    DBaaS does not depend on PMM Client.

1. Start PMM server from a feature branch:

    ```
    docker run --detach --publish 80:80 --name pmm-server --env PERCONA_TEST_DBAAS=1 perconalab/pmm-server-fb:<feature branch ID>
    ```

    !!! note
       Setting the environment variable `PERCONA_TEST_DBAAS=1` enables DBaaS functionality.

3. Change the default administrator credentials:

    ```
    docker exec -t pmm-server bash -c 'ln -s /srv/grafana /usr/share/grafana/data; chown -R grafana:grafana /usr/share/grafana/data; grafana-cli --homepath /usr/share/grafana admin reset-admin-password db445p3rc0n4d3m0'
    ```

## Install Percona operators in minikube

1. Install minikube:

    ```
    curl -Lo /usr/local/sbin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x /usr/local/sbin/minikube
    ln -s /usr/local/sbin/minikube /usr/sbin/minikube
    ```

2. Configure and start minikube:

    ```
    minikube config set cpus 4
    minikube config set memory 4096
    minikube config set kubernetes-version 1.16.8
    minikube start
    ```

3. Deploy the Percona operators configuration in minikube:

    ```
    curl -sSf -m 30 https://raw.githubusercontent.com/percona/percona-xtradb-cluster-operator/release-1.4.0/deploy/bundle.yaml  | minikube kubectl -- apply -f -
    curl -sSf -m 30 https://raw.githubusercontent.com/percona/percona-xtradb-cluster-operator/release-1.4.0/deploy/secrets.yaml | minikube kubectl -- apply -f -
    curl -sSf -m 30 https://raw.githubusercontent.com/percona/percona-server-mongodb-operator/release-1.4.0/deploy/bundle.yaml  | minikube kubectl -- apply -f -
    curl -sSf -m 30 https://raw.githubusercontent.com/percona/percona-server-mongodb-operator/release-1.4.0/deploy/secrets.yaml | minikube kubectl -- apply -f -
    ```

4. Check the operators are deployed:

    ```
    minikube kubectl -- get nodes
    minikube kubectl -- get pods
    minikube kubectl -- wait --for=condition=Available deployment percona-xtradb-cluster-operator
    minikube kubectl -- wait --for=condition=Available deployment percona-server-mongodb-operator
    ```

5. Get your kubeconfig details from minikube (to register your k8s cluster with PMM Server):

    ```
    minikube kubectl -- config view --flatten --minify
    ```

!!! seealso "See also"
    - [DBaaS Dashboard](../platform/dbaas.md)
    - [Install minikube](https://minikube.sigs.k8s.io/docs/start/)


## Installing Percona operators in AWS EKS (k8s)

TODO
