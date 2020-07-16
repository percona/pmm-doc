.. _update-server.docker:

################################
Updating PMM Server Using Docker
################################

To check the version of PMM Server, run ``docker ps`` on the host.

.. tip::

   Run the commands in this section as root or by using the ``sudo`` command.

**Example**

.. code-block:: bash

   $ docker ps
   CONTAINER ID  IMAGE                     COMMAND                CREATED       STATUS             PORTS                                      NAMES
   4bdcc8463e64  percona/pmm-server:2      "/opt/entrypoint.sh"   2 weeks ago   Up About an hour   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   pmm-server

The version number is appended to the image name in the IMAGE column. For a Docker
container created from the image tagged ``2``, the IMAGE column
contains ``2`` and not the specific version number of PMM Server.

To find the installed version of PMM Server, use the ``docker exec`` command with an API request.

**Example**

.. code-block:: bash 

   $ docker exec -it pmm-server curl -u admin:admin http://localhost/v1/version

The output is a JSON string:

.. code-block:: text

   {"version":"2.9.0","server":{"version":"2.9.0","full_version":"2.9.0-37.2007140859.f31f32e.el7","timestamp":"2020-07-14T08:59:38Z"},"managed":{"version":"2.9.0","full_version":"4b39891989e04e1c33f8d78bb3fd674be6705bb7","timestamp":"2020-07-13T15:37:59Z"},"distribution_method":"DOCKER"}%


To check if there is a newer version of PMM Server,
visit `<https://hub.docker.com/r/percona/pmm-server/tags/>`_

.. _pmm.deploying.server.docker-container.renaming:
.. _container-renaming:

************************************************************************
Creating a backup version of the current ``pmm-server`` Docker container
************************************************************************

You need to create a backup version of the current ``pmm-server`` container if
the update procedure does not complete successfully or if you decide not to
upgrade your PMM Server after trying the new version.

The ``docker stop`` command stops the currently running ``pmm-server`` container:

.. code-block:: bash

   $ docker stop pmm-server

The following command simply renames the current ``pmm-server`` container to
avoid name conflicts during the update procedure:

.. code-block:: bash

   $ docker rename pmm-server pmm-server-backup

.. _pmm.deploying.docker-image.pulling:
.. _image-pulling:

**************************
Pulling a new Docker Image
**************************

When pulling a newer image, you may either use a specific version
number, or the ``2`` image which always matches the highest version
number. 

**Examples**

To pull a specific version:

.. code-block:: bash

   $ docker pull percona/pmm-server:2.9.0

To pull the latest PMM 2 version:

.. code-block:: bash

   $ docker pull percona/pmm-server:2


.. _pmm.deploying.docker-container.creating:
.. _container-creating:

******************************************************
Creating a new Docker container based on the new image
******************************************************

After you have pulled a new version of PMM from the Docker repository, you can
use ``docker run`` to create a ``pmm-server`` container using the new image.

.. code-block:: bash

   $ docker run -d -p 80:80 -p 443:443 --volumes-from pmm-data \
      --name pmm-server --restart always percona/pmm-server:2

.. important::

   The ``pmm-server`` container must be stopped before attempting this command.

The ``docker run`` command refers to the pulled image as the last parameter. If
you used a specific version number when running ``docker pull``, replace ``2`` accordingly.

This command uses the ``--volumes-from`` option with the value of ``pmm-data``
so that the new version uses your existing data.

.. caution::

   Do not remove the ``pmm-data`` container when updating, if you want to keep all collected data.

You can also check that the PMM version has been updated in the PMM Server web interface.


.. _pmm/docker/backup-container.removing:
.. _backup-container-removing:

*****************************
Removing the backup container
*****************************

After you have tried the features of the new version, you may decide to
continue using it. The backup container that you have stored
is no longer needed in this case.

To remove this backup container, use the ``docker rm`` command:

.. code-block:: bash

   $ docker rm pmm-server-backup

Here, ``pmm-server-backup`` is the tag name for the backup container.

.. _pmm/docker/previous-version.restoring:

******************************
Restoring the previous version
******************************

If you decide to keep using the old version, you must
stop and remove the new ``pmm-server`` container.

.. code-block:: bash

   $ docker stop pmm-server && docker rm pmm-server

Next, rename ``pmm-server-backup`` to ``pmm-server``
and restart it.

.. code-block:: bash

   $ docker start pmm-server


.. caution::

   Do not use the ``docker run`` command to start the container. The ``docker run``
   command creates and then runs a new container.

   To start a new container, use the ``docker start`` command.
