# Kubernetes monitoring for Percona Operators 

!!! caution alert alert-warning "Important"
    This feature is still in [Technical Preview](https://docs.percona.com/percona-monitoring-and-management/details/glossary.html#technical-preview) and is subject to change. We recommend that early adopters use this feature for testing purposes only.

Monitoring the state of the database is crucial to timely identify and react to performance issues. Percona Monitoring and Management (PMM) solution enables you to do just that.

However, the database state also depends on the state of the Kubernetes cluster itself. Hence it’s important to have metrics that can depict the state of the Kubernetes cluster.

For inforamtion on setting up monitoring for the Kubernetes cluster health, see [documentation](https://docs.percona.com/percona-operator-for-mysql/pxc/monitor-kubernetes.html). 

This setup has been tested with the PMM server as the centralized data storage and the Victoria Metrics Kubernetes monitoring stack as the metrics collector. These steps may also apply if you use another Prometheus-compatible storage.


## New dashboards: Kubernetes monitoring for Percona Operators

Starting with PMM 2.40.0, the following new dashboards have been added:

## Kubernetes overview

The Kubernetes Cluster overview dashboard gives you an overview of Kubernetes health and its objects, including Percona custom resources.

![!image](../../_images/K8s_overview_dashboard_for_operators.png)

## DB clusters managed with Percona Kubernetes Operators

This dashboard displays the primary parameters of DB clusters created by Percona Operators for various databases and helps identify the performance issues.

![!image](../../_images/PMM_DB_clusters_managed_percona_kubernetes_operators.png)


