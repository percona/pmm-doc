# Install PMM with DBaaS

To enable and use the Database as a Service (DBaaS) feature in PMM, see [DBaaS](activate_dbaas.md).

You can use [free K8s provided by Percona](https://www.percona.com/blog/private-dbaas-with-free-kubernetes-cluster/) for evaluation. 
You can also create K8s on AWS using these [instructions](https://www.percona.com/blog/dbaas-kubernetes-in-under-20-min/). 


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









