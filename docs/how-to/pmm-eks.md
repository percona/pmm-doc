# Install PMM instance on Amazon EKS

In this **How To**, we describe how to deploy and configure the EKS cluster and install PMM there.

## Prerequisites

- AWS CLI version 2.8.6 or later.
- eksctl version 0.120.0 or later.
- Route 53 as the DNS service for domain

This manual for empty EKS cluster without any settings.

## Create an IAM OIDC provider for your cluster
1. Retrieve your cluster's OIDC provider ID and store it in a variable.

    ```sh
    oidc_id=$(aws eks describe-cluster --name my-cluster --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
    ```
    Where `my-cluster` is the name of your cluster.

2. Check if you have an existing IAM OIDC provider for your cluster.

    ```sh
    oidc_id=$(aws eks describe-cluster --name my-cluster --query "cluster.identity.oidc.issuer" --output text | cut -d  '/' -f 5)
    ```
    If the output is returned from the previous command, you already have a provider for your cluster and can skip the next step. You must create an IAM OIDC provider for your cluster if no output is returned.

3. Create an IAM OIDC identity provider for your cluster with the following command:
    ```sh
    eksctl utils associate-iam-oidc-provider --cluster my-cluster --approve
    ```
    Where `my-cluster` your own cluster. Also, more details you can read [here](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

## Create Amazon EBS CSI driver IAM role for service accounts

This plugin requires IAM permissions to make calls to AWS APIs on your behalf. When the plugin is deployed, it creates and is configured to use a service account that is named *ebs-csi-controller-sa*. The service account is bound to a Kubernetes *clusterrole* assigned the required Kubernetes permissions.

To create your Amazon EBS CSI plugin IAM role with *eksctl*:

1. Connect to your PMM Server Docker container.

    ```sh
    eksctl create iamserviceaccount \
    --name ebs-csi-controller-sa \
    --namespace kube-system \
    --cluster my-cluster \
    --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
    --approve \
    --role-only \
    --role-name AmazonEKS_EBS_CSI_DriverRole
    ```

    Where `my-cluster` is the name of your cluster. If you use a custom KMS key for encryption on your Amazon EBS volumes, you can see the documentation [here](https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html)

## Add Amazon EBS CSI add-on

1. Run the following command to add the Amazon EBS CSI add-on. Replace `my-cluster` with the name of your cluster, and `111122223333` with your account ID.

    ```sh
    eksctl create addon --name aws-ebs-csi-driver --cluster my-cluster --service-account-role-arn arn:aws:iam::111122223333:role/AmazonEKS_EBS_CSI_DriverRole --force
    ```

For additional details, see [documentation](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html).

## Install AWS Load Balancer Controller add-on

1. Download an IAM policy for the AWS Load Balancer Controller that allows it to make calls to AWS APIs on your behalf:

    ```sh
    curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.4.4/docs/install/iam_policy.json
    ```

    For AWS GovCloud (US-East) or AWS GovCloud (US-West) AWS Regions:

    ```sh
    curl -o iam_policy_us-gov.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.4.4/docs/install/iam_policy_us-gov.json
    ```

2. Create an IAM policy using the policy downloaded in the previous step.

    ```sh
    aws iam create-policy \
    --policy-name AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://iam_policy.json
    ```

    If you downloaded *iam_policy_us-gov.json*, then change *iam_policy.json* to *iam_policy_us-gov.json*.

3. Create an IAM role.

    ```sh
    eksctl create iamserviceaccount \
      --cluster=my-cluster \
      --namespace=kube-system \
      --name=aws-load-balancer-controller \
      --role-name "AmazonEKSLoadBalancerControllerRole" \
      --attach-policy-arn=arn:aws:iam::111122223333:policy/AWSLoadBalancerControllerIAMPolicy \
      --approve
    ```

    Replace `my-cluster` with the name of your cluster, and `111122223333` with your account ID.

4. Add the *eks-charts* repo:

    ```sh
    helm repo add eks https://aws.github.io/eks-charts
    ```

5. Update your local repository:

    ```sh
    helm repo update
    ```

6. Install the AWS Load Balancer Controller using Helm V3:

    ```sh
    helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
      -n kube-system \
      --set clusterName=my-cluster \
      --set serviceAccount.create=false \
      --set serviceAccount.name=aws-load-balancer-controller
    ```

For more details, see [documentation](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html).

## Deploy NGINX ingress controller for Kubernetes

In this option, we will be installing an NGINX ingress controller with TCP on Network Load Balancer.

1. Download the YAML file to deploy the following Kubernetes objects: *namespace*, *serviceaccounts*, *configmap*, *clusterroles*, *clusterrolebindings*, *roles*, *rolebindings*, *services*, *deployments*, *ingressclasses*, and *validatingwebhookconfigurations*.

    ```sh
    wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/aws/deploy.yaml
    ```

2. Edit the file. Then, in the *ingress-nginx-controller* service object section, replace all service.beta.kubernetes.io annotations with following:

    ```sh
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
    service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
    service.beta.kubernetes.io/aws-load-balancer-type: "external"
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "instance"
    service.beta.kubernetes.io/aws-load-balancer-scheme: "internet-facing"
    ```
3. Apply this manifest:

    ```sh
    kubectl apply -f deploy.yaml
    ```

For additional details, see [documentation](https://aws.amazon.com/ru/premiumsupport/knowledge-center/eks-access-kubernetes-services/).

## Deploy cert-manager

1. Add the *eks-charts* repo:

    ```sh
    helm repo add jetstack https://charts.jetstack.io
    ```

2. Update your local repository:

    ```sh
    helm repo update
    ```

3. Install the AWS Load Balancer Controller using Helm V3:

    ```sh
    helm install \
      cert-manager jetstack/cert-manager \
        --namespace cert-manager \
        --create-namespace \
        --version v1.10.1 \
        --set installCRDs=true
    ```

For additional details, see [documentation](https://cert-manager.io/docs/installation/helm/).

## Create an Issuer in Amazon EKS

Issuers and cluster issuers are resources that supply certificates to your cluster. The basic Cert-Manager installation created so far is incapable of issuing certificates. Adding an issuer configured to use **Let’s Encrypt** allows you to acquire new certificates for services in your cluster dynamically.

1. Create issuer.yml manifest:

    ```sh
    apiVersion: cert-manager.io/v1
    kind: ClusterIssuer
    metadata:
      name: letsencrypt-prod
    spec:
      acme:
        server: https://acme-v02.api.letsencrypt.org/directory
        email: your@email
        privateKeySecretRef:
          name: letsencrypt-prod
        solvers:
          - http01:
              ingress:
                class: nginx
    ```

    !!! note alert alert-primary ""
        Where `your@email` is your contact email, this information will be included with your certificates.In the event that **Let's Encrypt** wants to alert you about your certificates, it may do so at this address.

2. Apply this manifest:

    ```sh
    kubectl apply -f issuer.yml
    ```

## Deploy PMM

PMM is deployed with the help of the [Helm chart].

1. Add the *percona-helm-charts* repo:

    ```sh
    helm repo add percona https://percona.github.io/percona-helm-charts/
    ```

2. Update your local repository:

    ```sh
    helm repo update
    ```

3. Define [Parameters](https://github.com/percona/percona-helm-charts/tree/main/charts/pmm#parameters). An ELB load balancer. You can use an Network Load Balancer.

    !!! note alert alert-primary ""
        To use Network Load Balancer you should define this annotations:

        ```sh
        kubernetes.io/ingress.class: nginx
        ```

        For cert-manager define annotation from previous step:

        ```sh
        cert-manager.io/cluster-issuer: letsencrypt-prod
        ```

        The other settings are described in default values.yml.

4. Install the PMM using Helm V3:

    ```sh
      helm install pmm -f values.yaml percona/pmm
    ```

## DNS settings


1. Define load balancer name:

    ```sh
    kubectl get ingress -n default
    ```

2. Open **Route 53**, choose your domain, and create a record for your PMM instance. Turn on the `alias`, choose **Alias Network Load Balancer**, choose your Region, and choose the load balancer with the name from the previous request.


For more details, see [documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html).


## PMM HA

Kubernetes cluster (EKS) provides high availability. Kubernetes clusters have *health* probes mechanism and service discovery that can detect when a pod is failed and reroute traffic to healthy pods. Probes check the health of unhealthy pods and restart them if necessary.

PMM is running as `StatefulSet` and has a persistent volume. Kubernetes can attach a disk from one pod to another replacement pod, but an application would still suffer a temporary outage until the new pod has attached the disk and started up. Outage time is around 1-2 minutes.

!!! caution alert alert-warning "Important"
    EBS volume and instance must be in the same Availability Zone. 

[Helm chart]: ../setting-up/server/helm.md