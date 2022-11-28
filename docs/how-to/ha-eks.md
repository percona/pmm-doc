# Install High Available PMM instance in EKS

**Prerequisites**
- AWS CLI version 2.8.6 or later.
- eksctl version 0.120.0 or later.
- Route 53 as the DNS service for domain

This manual for empty EKS cluster without any settings.

## Creating an IAM OIDC provider for your cluster
1. Retrieve your cluster's OIDC provider ID and store it in a variable.

    ```sh
    oidc_id=$(aws eks describe-cluster --name my-cluster --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
    ```
    Where `my-cluster` your own cluster.

2. Determine whether an IAM OIDC provider with your cluster's ID is already in your account.

    ```sh
    oidc_id=$(aws eks describe-cluster --name my-cluster --query "cluster.identity.oidc.issuer" --output text | cut -d  '/' -f 5)
    ```
    If output is returned from the previous command, then you already have a provider for your cluster and you can skip the next step. If no output is returned, then you must create an IAM OIDC provider for your cluster.

3. Create an IAM OIDC identity provider for your cluster with the following command:
    ```sh
    eksctl utils associate-iam-oidc-provider --cluster my-cluster --approve
    ```
    Where `my-cluster` your own cluster. Also, more details you can read [here](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

## Creating the Amazon EBS CSI driver IAM role for service accounts

This plugin requires IAM permissions to make calls to AWS APIs on your behalf. When the plugin is deployed, it creates and is configured to use a service account that's named *ebs-csi-controller-sa*. The service account is bound to a Kubernetes *clusterrole* that's assigned the required Kubernetes permissions.

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

    Where `my-cluster` your own cluster. If you use a custom KMS key for encryption on your Amazon EBS volumes you can get manual [here](https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html)

## Adding the Amazon EBS CSI add-on

1. Run the following command to add the Amazon EBS CSI add-on. Replace `my-cluster` with the name of your cluster, `111122223333` with your account ID.

    ```sh
    eksctl create addon --name aws-ebs-csi-driver --cluster my-cluster --service-account-role-arn arn:aws:iam::111122223333:role/AmazonEKS_EBS_CSI_DriverRole --force
    ```

More details you can read [here](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html).

## Installing the AWS Load Balancer Controller add-on

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

    If you downloaded *iam_policy_us-gov.json*, than change *iam_policy.json* to *iam_policy_us-gov.json*.

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

    Replace `my-cluster` with the name of your cluster, `111122223333` with your account ID.

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

More details you can read [here](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html).

## Deploy the NGINX ingress controller for Kubernetes

At this option installing NGINX ingress controller with TCP on Network Load Balancer.

1. Download YAML file to deploy the following Kubernetes objects: *namespace*, *serviceaccounts*, *configmap*, *clusterroles*, *clusterrolebindings*, *roles*, *rolebindings*, *services*, *deployments*, *ingressclasses*, and *validatingwebhookconfigurations*.

    ```sh
    wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/aws/deploy.yaml
    ```

2. Edit the file. Then, in the *ingress-nginx-controller* service object section replace all service.beta.kubernetes.io annotations with following:

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

More details you can read [here](https://aws.amazon.com/ru/premiumsupport/knowledge-center/eks-access-kubernetes-services/).

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

More details you can read [here](https://cert-manager.io/docs/installation/helm/).

## Create an Issuer in Amazon EKS

Issuers and cluster issuers are resources that supply certificates to your cluster. The basic Cert-Manager installation created so far is incapable of issuing certificates. Adding an issuer that’s configured to use Let’s Encrypt lets you dynamically acquire new certificates for services in your cluster.

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

Where `your@email` your own contact email, this information will be included with your certificates. Let’s Encrypt may also alert you at the address if it needs to send you alerts about your certificates.

2. Apply this manifest:

    ```sh
    kubectl apply -f issuer.yml
    ```

## Deploy HA PMM

1. Add the *percona-helm-charts* repo:

    ```sh
    helm repo add percona https://percona.github.io/percona-helm-charts/
    ```

2. Update your local repository:

    ```sh
    helm repo update
    ```

3. Define [Parameters](https://github.com/percona/percona-helm-charts/tree/main/charts/pmm#parameters). An ELB load balancer. You can use an Network Load Balancer.

To use Network Load Balancer you should define this annotations:

    ```sh
    kubernetes.io/ingress.class: nginx
    ```

For cert-manager define annotation from previous step:

    ```sh
    cert-manager.io/cluster-issuer: letsencrypt-prod
    ```

Other settings described in default values.yml.

4. Install the PMM using Helm V3:

    ```sh
      helm install pmm -f values.yaml percona/pmm
    ```

## DNS settings



1. Define load balancer name:

    ```sh
    kubectl get ingress -n default
    ```

2. Open **Route 53**, choose your domain and create record for your PMM instance. Turn on "alias" choose "Alias Network Load Balancer", choose your Region and choose load balancer with name from previous request.


More detailes available [here](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html)
