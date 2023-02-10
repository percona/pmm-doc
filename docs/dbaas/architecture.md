# Architecture of DBaaS

DBaaS is built on top of PMM and Kubernetes and the highlevel architecture is shown below

![!](../_images/dbaas_arch.jpg)

## PMM

PMM:q


All created database clusters using DBaaS are integrated with PMM monitoring feature and the user interface for managing database clusters is implemented in PMM. It allows the end user to register kubernetes cluster and spin-up a database cluster.

PMM provisions kubernetes cluster using Operator Lifecycle Manager


1. PMM that has UI for registering k8s cluster and manage database clusters
2. PMM-managed which is the backend part for the UI and responsible for the business logic implementation for DBaaS
3. Operator lifecycle manager (OLM) to install and manage lifecycle of operators (installing, updating)
4. PSMDB and PXC operators to run and manage underlying database clusters
5. dbaasDBaaS-operator that simplifies a way of managing underlying database clusters and exposes a simplified APICRD to PMM


PMM-managed will do validation of k8s cluster, check if its already registered and do some manipulations against provided kubeconfig to support the integration with AWS IAM after that the provision process starts and has the following steps

Install OLM to the Kubernetes cluster
Wait for OLM to be ready
Install Percona DBaaS catalog
Install required operators for the DBaaS functionality: psmdboperator, pxc operator, victoriametrics operator, dbaas-operator and configures kube-state-metrics for k8s monitoring

