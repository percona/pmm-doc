# Install PMM server

Before installing PMM server, read the [Prerequisites to install PMM server](prerequisites.md).

Install and run at least one PMM Server using one of the following ways:

| Use | <i class="uil uil-thumbs-up"></i> **Benefits** | <i class="uil uil-thumbs-down"></i> **Drawbacks**|
|---|---|---
| [Docker](docker/index.md) | 1. Quick.<br>2. Simple. | 1. Docker installation required.<br>2. Additional network configuration required.
| [Podman](podman.md) | 1. Quick.<br>2. Simple.<br>3. Rootless. | 1. Podman installation required.
| [Helm](helm.md) Technical Preview | 1. Quick.<br>2. Simple.<br>3. Cloud. | 1. Requires running Kubernetes cluster.
| [Virtual appliance](virtual/index.md)  | 1. Easily import into Hypervisor of your choice | 1. More system resources compared to Docker footprint.
| [Amazon AWS](aws/aws.md) | 1. Wizard-driven install. | 1. Non-free solution (infrastructure costs).|



