# Setting up a development environment for DBaaS

> **CAUTION**
> DBaaS functionality is Alpha. The information on this page is subject to change and may be inaccurate.

## Prerequirements

### Docker

To install Docker on CentOS:

    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo;
    yum -y install docker-ce;
    usermod -a -G docker centos;
    systemctl enable docker;
    systemctl start docker;


### minikube:

To install minikube:

    yum -y install curl;
    curl -Lo /usr/local/sbin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64  && chmod +x /usr/local/sbin/minikube
    ln -s /usr/local/sbin/minikube /usr/sbin/minikube

## Start PMM server with DBaaS activated

> **Notes**
> - DBaaS does not depend on PMM Client.
> - Setting the environment variable `PERCONA_TEST_DBAAS=1` enables DBaaS functionality.
> - Add the option `--network minikube` if you run PMM Server and minikube in the same Docker instance. (This will share a single network and the kubeconfig will work.)

1. Start PMM server from a feature branch:

       docker run --detach --publish 80:80 --name pmm-server --env PERCONA_TEST_DBAAS=1 perconalab/pmm-server-fb:<feature branch ID>


2. Change the default administrator credentials from CLI:

   (This step is not mandatory, because the same can be done from the web interface of PMM on first login.)

       docker exec -t pmm-server bash -c 'ln -s /srv/grafana /usr/share/grafana/data; chown -R grafana:grafana /usr/share/grafana/data; grafana-cli --homepath /usr/share/grafana admin reset-admin-password <RANDOM_PASS_GOES_IN_HERE>'

## Install Percona operators in minikube

1. Configure and start minikube:

        minikube config set cpus 4
        minikube config set memory 8192
        minikube config set kubernetes-version 1.16.8
        minikube start

3. Deploy the Percona operators configuration for PXC and PSMDB in minikube:

       curl -sSf -m 30 https://raw.githubusercontent.com/percona/percona-xtradb-cluster-operator/release-1.4.0/deploy/bundle.yaml  | minikube kubectl -- apply -f -
       curl -sSf -m 30 https://raw.githubusercontent.com/percona/percona-xtradb-cluster-operator/release-1.4.0/deploy/secrets.yaml | minikube kubectl -- apply -f -
       curl -sSf -m 30 https://raw.githubusercontent.com/percona/percona-server-mongodb-operator/release-1.4.0/deploy/bundle.yaml  | minikube kubectl -- apply -f -
       curl -sSf -m 30 https://raw.githubusercontent.com/percona/percona-server-mongodb-operator/release-1.4.0/deploy/secrets.yaml | minikube kubectl -- apply -f -

4. Check the operators are deployed:

       minikube kubectl -- get nodes
       minikube kubectl -- get pods
       minikube kubectl -- wait --for=condition=Available deployment percona-xtradb-cluster-operator
       minikube kubectl -- wait --for=condition=Available deployment percona-server-mongodb-operator

5. Get your kubeconfig details from minikube (to register your k8s cluster with PMM Server):

       minikube kubectl -- config view --flatten --minify

> **See also**
> - [DBaaS Dashboard](../platform/dbaas.md)
> - [Install minikube](https://minikube.sigs.k8s.io/docs/start/)

## Installing Percona operators in AWS EKS (k8s)

TODO
