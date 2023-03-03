# Setting up DBaaS

To use the Database as a Service (DBaaS) solution in PMM there are a few things that need to be setup first including a suitable Kubernetes Cluster. If you've already got a kubernetes cluster you can jump ahead and [enable DBaaS in PMM](../dbaas/get-started.html).

If you don't have a Kubernetes cluster available you can use the [free K8s provided by Percona](https://www.percona.com/blog/private-dbaas-with-free-kubernetes-cluster/) for evaluation which will allow you to play around with DBaaS for 3 hours before the cluster expires.
For a Kubernetes cluster that doesn't expire you can use our "easy script", you can find the instructions [here](https://www.percona.com/blog/dbaas-kubernetes-in-under-20-min/).

In the sections that follow we'll try to outline the steps to create your own Kubernetes cluster in a few popular ways.


## Red Hat, CentOS

```sh
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum -y install docker-ce
usermod -a -G docker centos
systemctl enable docker
systemctl start docker
```

## Debian, Ubuntu

```sh
apt-add-repository https://download.docker.com/linux/centos/docker-ce.repo
systemctl enable docker
systemctl start docker
```

## minikube

Please follow minikube's [documentation to install](https://minikube.sigs.k8s.io/docs/start/) it.

### Red Hat, CentOS

```sh
yum -y install curl
curl -Lo /usr/local/sbin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x /usr/local/sbin/minikube
ln -s /usr/local/sbin/minikube /usr/sbin/minikube
alias kubectl='minikube kubectl --'
```