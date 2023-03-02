# Deleting clusters

!!! note alert alert-primary ""
    If a Public Address is set in PMM Settings, for each DB cluster an API Key is created which can be found on the page `/graph/org/apikeys`. You should not delete them (for now, until [issue PMM-8045](https://jira.percona.com/browse/PMM-8045) is fixed) -- once a DB cluster is removed from DBaaS, the related API Key is also removed.

For example, if you only run `eksctl delete cluster` to delete an Amazon EKS cluster without cleaning up the cluster first, there will be a lot of orphaned resources such as Cloud Formations, Load Balancers, EC2 instances, Network interfaces, etc. The same applies for Google GKE clusters.

## Cleaning up Kubernetes cluster

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

