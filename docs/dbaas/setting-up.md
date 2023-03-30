# Setting up DBaaS

## Prerequisites

To use Database-as-a-Service (DBaaS) in PMM following are the prerequisites:

- Set up a suitable Kubernetes Cluster.  

  !!! note alert alert-primary ""
      If you already have got a kubernetes cluster you can just [enable DBaaS in PMM](../dbaas/get-started.html).

- If you don't already have a Kubernetes cluster, Percona offers [free K8s](https://www.percona.com/blog/private-dbaas-with-free-kubernetes-cluster/) as an evaluation product, allowing you to test DBaaS for 3 hours before it expires.

- If you are interested in a PMM DBaaS but want to avoid dealing with Kubernetes, Percona DbaaS Infrastructure Creator might be your solution. It creates the infrastructure in an AWS account.
  
  It will help you to choose the right types of instances based on the number of vCPU and the amount of memory and create clusters. It can even deploy the clusters and Kubernetes operators for MySQL, PXC, and MongoDB.

## Install Docker

Following are the ways to install Docker on the various platforms:


=== "Red Hat, CentOS"

      ```sh
      yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
      yum -y install docker-ce
      usermod -a -G docker centos
      systemctl enable docker
      systemctl start docker
      ```
=== "Debian, Ubuntu"

      ```sh
      apt-add-repository https://download.docker.com/linux/centos/docker-ce.repo
      systemctl enable docker
      systemctl start docker
      ```

=== "minikube"

     Follow minikube's [documentation to install](https://minikube.sigs.k8s.io/docs/start/) it.

     **Red Hat, CentOS**

      ```sh
      yum -y install curl
      curl -Lo /usr/local/sbin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
      chmod +x /usr/local/sbin/minikube
      ln -s /usr/local/sbin/minikube /usr/sbin/minikube
      alias kubectl='minikube kubectl --'
      ```

## Start PMM server and activate DBaaS

These are some of the key points worth noting:

!!! note alert alert-primary "Important"
    - Minikube requires 9 vCPUs for a fully-functional 3-node XtraDB cluster composed of 3x HAProxy, 3x PXC, and 6x PMM Client containers (1 vCPU each for HAProxy and PXC, and 0.5 vCPU for PMM-client containers).    
    - DBaaS does not depend on PMM Client.
    - You can pass the environment variable `--env ENABLE_DBAAS=1` to force the DBaaS feature when starting the pmm-server container. If you omit the variable, you can enable the feature later using PMM UI. Follow the link in step 3.    
    -  Add the parameter `--network minikube` if you are running PMM Server and minikube in the same Docker instance, which will share a network.
    -  Add the parameters `-env PMM_DEBUG=1`, `-env PMM_TRACE=`1 if you require extended debugging information.


The following are the steps to start PMM and activate DBaaS:

1. Start PMM server:

    ```sh
    docker run --detach --publish 80:80 --publish 443:443 --name pmm-server percona/pmm-server:2
    ```

2. Change the default administrator credentials from CLI (optional):

    You can be change the default credentails from the PMM UI on first login.

    ```sh
    docker exec -t pmm-server bash -c 'ln -s /srv/grafana /usr/share/grafana/data; chown -R grafana:grafana /usr/share/grafana/data; grafana-cli --homepath /usr/share/grafana admin reset-admin-password <RANDOM_PASS_GOES_IN_HERE>'
    ```

3. [Activate DBaaS](../dbaas/get-started.md#activate-dbaas) using the PMM UI if you omitted the parameter `--env ENABLE_DBAAS=1` when starting up the container.

## Create a Kubernetes cluster

The DBaaS feature uses Kubernetes clusters to deploy database clusters. To set up PMM successfully, you must first create a Kubernetes cluster and then add it using `Kubeconfig`.

You can create a Kubernetes cluster as follows:

=== "**Minikube**"

      1. Configure and start minikube:

          ```sh
          minikube start --cpus=16 --memory=32G
          ```

      2. Obtain a `Kubeconfig` for your minikube cluster and register it in PMM to make it functional.

          ```sh
          minikube kubectl -- config view --flatten --minify
          ```
      Take this output and copy it to your clipboard. Then, proceed to [add a Kubernetes cluster to PMM](../dbaas/get-started.md#add-a-kubernetes-cluster).



=== "**Amazon AWS EKS**"

    1. Create your cluster via [`eksctl`](https://github.com/weaveworks/eksctl#installation) or the Amazon AWS interface. 

      **Example**

          ```sh
          eksctl create cluster --write-kubeconfig --name=your-cluster-name --zones=us-west-2a,us-west-2b --kubeconfig <PATH_TO_KUBECONFIG>
          ```
    2. Copy the resulting kubeconfig and follow these instructions to [register a Kubernetes cluster to PMM](../dbaas/get-started.md#add-a-kubernetes-cluster).

### Google GKE

1. Create your cluster either with [Google Cloud Console](https://console.cloud.google.com/) or [`gcloud` command line tool](https://cloud.google.com/sdk/gcloud):

    The command below assumes that your `gcloud` command line tool is properly configured and your user authenticated and authorized to manage GKE Clusters. This example creates a minimal zonal cluster using preemptive node machines, ideal for testing the DBaaS functionality.

    ```sh
    gcloud container clusters create --zone europe-west3-c pmm-dbaas-cluster --cluster-version 1.19 --machine-type e2-standard-4 --preemptible --num-nodes=3
    gcloud container clusters get-credentials pmm-dbaas-cluster --zone=europe-west3-c
    kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=<<your_user@your_company.com>>
    ```

2. Create `ServiceAccount`, `ClusterRole` and `RoleBindings` (required Roles are deployed automatically when PMM deploys Operators) using the following command:

    ```sh
    cat <<EOF | kubectl apply -f -
    ---
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: percona-dbaas-cluster-operator
    ---
    kind: RoleBinding
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
      name: service-account-percona-server-dbaas-xtradb-operator
    subjects:
    - kind: ServiceAccount
      name: percona-dbaas-cluster-operator
    roleRef:
      kind: Role
      name: percona-xtradb-cluster-operator
      apiGroup: rbac.authorization.k8s.io
    ---
    kind: RoleBinding
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
      name: service-account-percona-server-dbaas-psmdb-operator
    subjects:
    - kind: ServiceAccount
      name: percona-dbaas-cluster-operator
    roleRef:
      kind: Role
      name: percona-server-mongodb-operator
      apiGroup: rbac.authorization.k8s.io
    ---
    apiVersion: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRole
    metadata:
      name: service-account-percona-server-dbaas-admin
    rules:
    - apiGroups: ["*"]
      resources: ["*"]
      verbs: ["*"]
    ---
    apiVersion: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRoleBinding
    metadata:
      name: service-account-percona-server-dbaas-operator-admin
    subjects:
    - kind: ServiceAccount
      name: percona-dbaas-cluster-operator
      namespace: default
    roleRef:
      kind: ClusterRole
      name: service-account-percona-server-dbaas-admin
      apiGroup: rbac.authorization.k8s.io
    EOF
    ```

3. Extract variables required to generate a kubeconfig:

    ```sh
    name=`kubectl get serviceAccounts percona-dbaas-cluster-operator -o json | jq  -r '.secrets[].name'`
    certificate=`kubectl get secret $name -o json | jq -r  '.data."ca.crt"'`
    token=`kubectl get secret $name -o json | jq -r  '.data.token' | base64 -d`
    server=`kubectl cluster-info | grep 'Kubernetes control plane' | cut -d ' ' -f 7`
    ```

4. Generate your kubeconfig file (copy the output):

    ```sh
    echo "
    apiVersion: v1
    kind: Config
    users:
    - name: percona-dbaas-cluster-operator
      user:
        token: $token
    clusters:
    - cluster:
        certificate-authority-data: $certificate
        server: $server
      name: self-hosted-cluster
    contexts:
    - context:
        cluster: self-hosted-cluster
        user: percona-dbaas-cluster-operator
      name: svcs-acct-context
    current-context: svcs-acct-context
    "
    ```

5. Follow the instructions on [How to add a Kubernetes cluster](../dbaas/get-started.md#add-a-kubernetes-cluster) with kubeconfig from the previous step.

## Deleting clusters

!!! note alert alert-primary ""
    If a Public Address is set in PMM Settings, for each DB cluster an API Key is created which can be found on the page `/graph/org/apikeys`. You should not delete them (for now, until [issue PMM-8045](https://jira.percona.com/browse/PMM-8045) is fixed) -- once a DB cluster is removed from DBaaS, the related API Key is also removed.

For example, if you only run `eksctl delete cluster` to delete an Amazon EKS cluster without cleaning up the cluster first, there will be a lot of orphaned resources such as Cloud Formations, Load Balancers, EC2 instances, Network interfaces, etc. The same applies for Google GKE clusters.

### Cleaning up Kubernetes cluster

1. You should delete all database clusters, backups and restores.

    ```sh
    kubectl delete perconaxtradbclusterbackups.pxc.percona.com --all
    kubectl delete perconaxtradbclusters.pxc.percona.com --all
    kubectl delete perconaxtradbclusterrestores.pxc.percona.com --all

    kubectl delete perconaservermongodbbackups.psmdb.percona.com --all
    kubectl delete perconaservermongodbs.psmdb.percona.com --all
    kubectl delete perconaservermongodbrestores.psmdb.percona.com --all
    ```

2. In the `dbaas-controller` repository, in the deploy directory there are manifests we use to deploy operators. Use them to delete operators and related resources from the cluster.

    !!! caution alert alert-warning "Important"
        - Do NOT execute this step before all database clusters, backups and restores are deleted in the previous step. It may result in not being able to delete the namespace DBaaS lives in.
        - Also be careful with this step if you are running DBaaS in more than one namespace as it deletes cluster level CustomResourceDefinitions needed to run DBaaS. This would break DBaaS in other namespaces. Delete just operators deployments in that case.

    ```sh
    # Delete the PXC operator and related resources.
    curl https://raw.githubusercontent.com/percona-platform/dbaas-controller/7a5fff023994cecf6bde15705365114004b50b41/deploy/pxc-operator.yaml | kubectl delete -f -

    # Delete the PSMDB operator and related resources.
    curl https://raw.githubusercontent.com/percona-platform/dbaas-controller/7a5fff023994cecf6bde15705365114004b50b41/deploy/psmdb-operator.yaml | kubectl delete -f -
    ```

3. Delete the name space where the DBaaS is running, this will delete all remaining name space level resources if any are left.

    ```sh
    kubectl delete namespace <your-namespace>
    ```

4. Delete the Kubernetes cluster. The method depends on your cloud provider:
    - [Delete GKE cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster).
    - [Delete Amazon EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/delete-cluster.html).

## Run PMM Server as a Docker container for DBaaS

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
    ```

## Exposing PSMDB and XtraDB clusters for access by external clients

To make services visible externally, you create a LoadBalancer service or manually run commands to expose ports:

```sh
kubectl expose deployment hello-world --type=NodePort.
```

!!! seealso alert alert-info "See also"
    - [DBaaS Dashboard](../dbaas/get-started.md)
    - [Install minikube](https://minikube.sigs.k8s.io/docs/start/)
    - [Setting up a Standalone MYSQL Instance on Kubernetes & exposing it using Nginx Ingress Controller][STANDALONE_MYSQL_K8S]
    - [Use a Service to Access an Application in a Cluster][KUBERNETES_ACCESS_APP]
    - [Exposing applications using services][GOOGLE_EXPOSING_APPS]

[ALPHA]: https://en.wikipedia.org/wiki/Software_release_life_cycle#Alpha
[GOOGLE_EXPOSING_APPS]: https://cloud.google.com/kubernetes-engine/docs/how-to/exposing-apps
[KUBERNETES_ACCESS_APP]: https://kubernetes.io/docs/tasks/access-application-cluster/service-access-application-cluster/
[STANDALONE_MYSQL_K8S]: https://medium.com/@chrisedrego/setting-up-a-standalone-mysql-instance-on-kubernetes-exposing-it-using-nginx-ingress-controller-262fc7af593a

