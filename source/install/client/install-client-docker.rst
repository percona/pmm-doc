:orphan:

.. include:: /.res/replace.txt

.. _install-client-docker:

######################################################################
Installing PMM Client via Docker
######################################################################

Docker images of PMM Client are stored at the `percona/pmm-client`_
public repository. The host must be able to run Docker 1.12.6 or later,
and have network access.

Make sure that the firewall and routing rules of the host do not constrain
the Docker container. For more information, see :ref:`troubleshoot-connection`.

For more information about using Docker, see the `Docker Docs`_.

**********************************************************************
Setting Up a Docker Container for PMM Client
**********************************************************************

A Docker image is a collection of preinstalled software which lets you
run a selected version of PMM Client.
A Docker image is not run directly.
You use it to create a Docker container for your PMM Client.
When launched, the Docker container gives access to the whole functionality
of PMM Client.

- The setup begins by pulling the required Docker image.
- Next, you create a special container for persistent |pmm| data.
- Finally, you create and launch the PMM Client container.

======================================================================
Pulling the PMM Client Docker Image
======================================================================

To pull the latest version from Docker Hub:

.. code-block:: bash

   docker pull percona/pmm-client:2

======================================================================
Creating a Persistent Data Store for the PMM Client Docker Container
======================================================================

.. TODO

======================================================================
Run the PMM Client Docker Container
======================================================================

.. code-block:: bash

   docker run --rm \
       -e PMM_AGENT_SERVER_ADDRESS=PMMServer:443 \
       -e PMM_AGENT_SERVER_USERNAME=admin \
       -e PMM_AGENT_SERVER_PASSWORD=admin \
       -e PMM_AGENT_SERVER_INSECURE_TLS=1 \
       -e PMM_AGENT_SETUP=1 \
       -e PMM_AGENT_CONFIG_FILE=pmm-agent.yml \
       perconalab/pmm-client:dev-latest


.. rubric:: ENVIRONMENT VARIABLES

``PMM_AGENT_SERVER_ADDRESS``
    PMMServer:443

``PMM_AGENT_SERVER_USERNAME``
    admin

``PMM_AGENT_SERVER_PASSWORD``
    admin

``PMM_AGENT_SERVER_INSECURE_TLS``
    1 

``PMM_AGENT_SETUP``
    If true (1), run ``pmm-agent setup``. Default: false (0).

``PMM_AGENT_CONFIG_FILE``
    pmm-agent.yml



To get help:

.. code-block:: bash

   docker run --rm perconalab/pmm-client:dev-latest --help

   
     
.. _`percona/pmm-client`: https://hub.docker.com/r/percona/pmm-client/tags/
.. _`Docker Docs`: https://docs.docker.com


