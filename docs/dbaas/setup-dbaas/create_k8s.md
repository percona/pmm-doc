# Create a Kubernetes cluster

!!! note alert alert-primary ""
    The DBaaS feature uses Kubernetes clusters to deploy database clusters. You must first create a Kubernetes cluster and then add it to PMM using `kubeconfig` to get a successful setup.

## Minikube

1. Configure and start minikube:

    ```sh
    minikube start --cpus=16 --memory=32G
    ```

2. Get your kubeconfig details from `minikube`. (You need these to register your Kubernetes cluster with PMM Server):

    ```sh
    minikube kubectl -- config view --flatten --minify
    ```

    !!! note alert alert-primary ""
        You will need to copy this output to your clipboard and continue with [adding a Kubernetes cluster to PMM](../dbaas/get-started.md#add-a-kubernetes-cluster).

## Amazon AWS EKS

1. Create your cluster via [`eksctl`](https://github.com/weaveworks/eksctl#installation) or the Amazon AWS interface. For example:

    ```sh
    eksctl create cluster --write-kubeconfig --name=your-cluster-name --zones=us-west-2a,us-west-2b --kubeconfig <PATH_TO_KUBECONFIG>
    ```
2. Copy the resulting kubeconfig and follow these instructions to [register a Kubernetes cluster to PMM](../dbaas/get-started.md#add-a-kubernetes-cluster).

## Google GKE

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
