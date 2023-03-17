# Create or update a database cluster from a DBaaS template


Database clusters can be created from templates using PMM. Templates allow you to customize the creation of database clusters. You can adapt templates to tweak K8s-specific settings such as **liveness probes**, changing **config maps**, or tuning **database engines**. 

## Create template Custom Resource Definition (CRD)

To create a template, do the following:


1. Change the `updateStrategy` and `upgradeOptions` fields as per the [PXC operator documentation](https://docs.percona.com/percona-operator-for-mysql/pxc/update.html#manual-upgrade_1) and [PXC CRD](https://github.com/percona/percona-xtradb-cluster-operator/blob/v1.11.0/deploy/crd.yaml#L8379-L8392).

2. Create a template CRD `pxctpl-crd-upgrade-options.yaml` as follows:

```sh
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  creationTimestamp: null
  name: pxctemplateupgradeoptions.dbaas.percona.com
  labels:
    dbaas.percona.com/template: "yes"
    dbaas.percona.com/engine: "pxc"
spec:
  group: dbaas.percona.com
  names:
    kind: PXCTemplateUpgradeOptions
    listKind: PXCTemplateUpgradeOptionsList
    plural: pxctemplateupgradeoptions
    singular: pxctemplateupgradeoptions
  scope: Namespaced
  versions:
  - name: v1
    schema:
      openAPIV3Schema:
        properties:
          apiVersion:
            type: string
          kind:
            type: string
          metadata:
            type: object
          spec:
            properties:
              updateStrategy:
                type: string
              upgradeOptions:
                properties:
                  apply:
                    type: string
                  schedule:
                    type: string
                  versionServiceEndpoint:
                    type: string
                type: object
            type: object
          status:
            type: object
        type: object
    served: true
    storage: true
```

3. Run the following command:

```sh
$ kubectl apply -f pxctpl-crd-upgrade-options.yaml

customresourcedefinition.apiextensions.k8s.io/pxctemplateupgradeoptions.dbaas.percona.com created
```

## Add Read permissions

To add read permissions for the dbaas-operator to get the PXCTemplateUpgradeOptions CRs
