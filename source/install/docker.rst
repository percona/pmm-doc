.. _backup-container-removing:
.. _container-creating:
.. _container-renaming:
.. _data-container:
.. _image-pulling:
.. _pmm-docker-backup-container-removing:
.. _pmm-docker-previous-version-restoring:
.. _pmm-server-docker-restoring:
.. _pmm.deploying.docker-container.creating:
.. _pmm.deploying.docker-image.pulling:
.. _pmm.deploying.server.docker-container.renaming:
.. _pmm.docker.specific-version:
.. _pmm.server.docker-backing-up:
.. _pmm.server.docker-image.pulling:
.. _pmm.server.docker-setting-up:
.. _run-server-docker:
.. _server-container:
.. _update-server.docker:

#####################
PMM Server via Docker
#####################

************
Introduction
************

PMM Server can run as a container `Docker <https://docs.docker.com>`__ 1.12.6 or later. Images are available at `percona/pmm-server <https://hub.docker.com/r/percona/pmm-server/tags/>`__.

The Docker tags used in this section are for the latest version of PMM 2 (|release|) but you can specify any available tag to use the associated version of PMM Server.

Metrics collection consumes disk space and PMM needs approximately 1GB of storage for each monitored database node with data retention set to one week. (By default, data retention is 30 days.) To reduce the size of the Prometheus database, you can consider disabling table statistics.

Although the minimum amount of memory is 2 GB for one monitored database node, memory usage does not grow in proportion to the number of nodes. For example, 16Gb is adequate for 20 nodes.

.. seealso::

   - :ref:`performance-issues`
   - :ref:`data-retention`

*****************
Running the image
*****************

*1) Pull the latest image; 2) Create a persistent data container; 3) Run the image with the data container mounted on /srv.*

1. Pull the latest PMM 2 image:

   .. code-block:: bash

      docker pull percona/pmm-server:2

2. Create a data container -- PMM Server uses a separate persistent data container for storing metrics.

   .. code-block:: bash

      docker create \
      --volume /srv \
      --name pmm-data \
      percona/pmm-server:2 /bin/true

3. Run the image to start PMM Server.

   .. code-block:: bash

      docker run \
      --detach \
      --restart always \
      --publish 80:80 --publish 443:443 \
      --volumes-from pmm-data \
      --name pmm-server \
      percona/pmm-server:2

.. note::

   - PMM Server expects the data volume (specified with ``-v``) to be ``/srv``.  Using any other value will result in data loss when upgrading.

   - You can prevent updates via the UI by adding ``-e DISABLE_UPDATES=true`` to the ``docker run`` command.

************************
Backing-up and upgrading
************************

*1) Check installed and available versions; 2) Check image and data mount points; 3) Backup: Rename the image and copy persistent data to the filesystem; 4) Pull the latest image.*

1. Check the installed version of PMM Server. Here are two methods.

   .. code-block:: bash

      # Method 1
      docker ps # Shows version as tag in IMAGE column, e.g. pmm-server:2
      # Method 2
      sudo apt install -y jq # Example for Ubuntu
      docker exec -it pmm-server \
      curl -u admin:admin http://localhost/v1/version | jq .version
      # Returns the version as a quoted string

2. Check the data mount points match -- both should return ``"/srv"``.

   .. code-block:: bash

      docker inspect pmm-data | jq '.[].Mounts[].Destination'
      docker inspect pmm-server | jq '.[].Mounts[].Destination'

3. Stop the container and create backups.

   .. code-block:: bash

      docker stop pmm-server
      docker rename pmm-server pmm-server-backup
      mkdir pmm-data-backup && cd $_
      docker cp pmm-data:/srv .

3. Pull and run the latest PMM 2 image.

   .. code-block:: bash

      docker pull percona/pmm-server:2
      docker run \
      --detach \
      --restart always \
      --publish 80:80 --publish 443:443 \
      --volumes-from pmm-data \
      --name pmm-server \
      percona/pmm-server:2

*************************
Downgrading and restoring
*************************

*1) Remove image; 2) Restore backups; 3) Restore persistent data file permissions; 4) Restart.*

1. Stop and remove the running version.

   .. code-block:: bash

      docker stop pmm-server
      docker rm pmm-server

2. Restore backups.

   .. code-block:: bash

      docker rename pmm-server-backup pmm-server
      docker cp pmm-data-backup/srv pmm-data:/

3. Restore permissions.

   .. code-block:: bash

      docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R pmm:pmm /srv/logs
      docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R pmm:pmm /srv/prometheus/
      docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R root:pmm /srv/clickhouse
      docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R grafana:grafana /srv/grafana
      docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R postgres:postgres /srv/logs/postgresql.log
      docker run --rm --volumes-from pmm-data -it percona/pmm-server:2 chown -R postgres:postgres /srv/postgres

3. Start (don't run) the image.

   .. code-block:: bash

      docker start pmm-server
