# Architecture of DBaaS

DBaaS is built on top of PMM and Kubernetes and the highlevel architecture is shown below

![!](../_images/dbaas_arch.jpg)

## PMM

Areas of responsibility of PMM:

1. Expose Public REST API
2. Provision Kubernetes cluster and install the following operators:
    1. Install OLM (Operator Lifecycle Manager)
    2. Percona Operator for MongoDB
    3. Percona Operator for MySQL
    4. DBaaS operator

## Operator Lifecycle Manager (OLM)

DBaaS uses [OLM](https://olm.operatorframework.io/docs/) to install and update operators. PMM installs OLM and Operator Catalog during the registration of the Kubernetes cluster.

An Operator catalog is a repository of metadata that Operator Lifecycle Manager (OLM) can query to discover and install Operators and their dependencies on a cluster. OLM always installs Operators from the latest version of a catalog. DBaaS uses its own catalog for OLM that has the following operators:

1. DBaaS operator
2. PXC operator
3. PSMDB operator
4. Victoria Metrics operator

![!](../_images/dbaas_catalog.jpg)

Percona Catalog is an OLM catalog that stores ClusterServiceVersionss and CustomResourceDefinitions for creation in a cluster, and stores metadata about packages and channels. It's a source of truth about available versions of operators ready to use in DBaaS

The installation of operators looks the following way

![!](../_images/olm_install.jpg)

## DBaaS operator

DBaaS operator is responsible for creating and managing databases [following operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) and depends on underlying operators for running psmdb and pxc clusters. It provides a simplified API to the end user and allows to use of one API to manage database clusters via `kubectl`.


