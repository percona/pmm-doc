# Network

## Ports

This is a list of ports used by the various components of PMM.

For PMM to work correctly, your system's firewall should allow traffic on these ports.

| Destination   | Component     | Protocols | Port/Port Range | Description
|---------------|---------------|-----------|-----------------|----------------------
| PMM Server    | `pmm-server`  | TCP       |   80            | HTTP server, used for web interface
| PMM Server    | `pmm-server`  | TCP       |  443            | HTTPS server, used for web interface
| PMM Server    | `pmm-server`  | TCP       | 7771            | gRPC, used for communication between `pmm-agent`, `pmm-admin`
| PMM Server    | `pmm-server`  | TCP       | 7772            | HTTP1 server, used for older links like `logs.zip`
| PMM Server    | `pmm-server`  | TCP       | 7773            | Debugging
| PMM Client    | `pmm-agent`   | TCP       | 7777            | Default `pmm-agent` listen port
| PMM Client    | `pmm-agent`   | TCP       | 42000--51999    | Default range for `pmm-agent` connected agents
| PMM Client    | `vm-agent`    | TCP       | 8428            | Victoria metrics port

> Notes
>
> For `pmm-agent`, the default listen port is 7777. This can be changed in the `pmm-agent.yml` configuration file or with the `pmm-agent` flag `--listen-port`. The default range for agents ports can be changed with the flag `--ports-min` and  `--ports-max`, or in the configuration file.
