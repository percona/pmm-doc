# Setting up a development environment for DBaaS

!!! caution
    DBaaS functionality is Alpha. The information on this page is subject to change and may be inaccurate.

## Start PMM server with DBaaS activated

!!! note
    DBaaS does not depend on PMM Client.

1. Start PMM server from a feature branch:

    ```
    docker run --detach --publish 80:80 --name pmm-server --env PERCONA_TEST_DBAAS=1 perconalab/pmm-server-fb:<feature branch ID>

    ```

    !!! note
       Setting the environment variable `PERCONA_TEST_DBAAS=1` enables DBaaS functionality.
       Use `--network minikube` if you will run pmm-server and minikube in the same docker instance. This way they will share single network and the kubeconfig will work with no extra steps. You will need to start pmm-server after minikube setup!

    !!! note
       If docker is not installed, you can follow this simple steps to get it running on your CentOS:
       ```
       yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo;
       yum -y install docker-ce;
       usermod -a -G docker centos;
       systemctl enable docker;
       systemctl start docker;

       ```

2. Change the default administrator credentials from CLI:
    !!! note
       This step is not mandatory, because the same can be done from the web interface of PMM on the first login.

    ```
    docker exec -t pmm-server bash -c 'ln -s /srv/grafana /usr/share/grafana/data; chown -R grafana:grafana /usr/share/grafana/data; grafana-cli --homepath /usr/share/grafana admin reset-admin-password <RANDOM_PASS_GOES_IN_HERE>'
    ```

## Install Percona operators in minikube

1. Install minikube:

    ```
    yum -y install curl;
    curl -Lo /usr/local/sbin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x /usr/local/sbin/minikube
    ln -s /usr/local/sbin/minikube /usr/sbin/minikube
    ```

2. Configure and start minikube:

    ```
    minikube config set cpus 4
    minikube config set memory 8192
    minikube config set kubernetes-version 1.16.8
    minikube start
    ```

3. Deploy the Percona operators configuration for PXC and PSMDB in minikube:

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
