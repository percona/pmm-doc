# Network

## Ports

This is a list of ports used by the various components of PMM.

For PMM to work correctly, your system's firewall should allow TCP traffic on these ports (UDP is not needed).

PMM component | TCP port      | Dicertion     | Description
--------------|---------------|----------------------
`pmm-server`  |   80          | out           |HTTP server, used for web interface
`pmm-server`  |  443          | out           |HTTPS server, used for web interface
`pmm-server`  | 7771          | both          |gRPC, used for communication between `pmm-agent`, `pmm-admin`
`pmm-server`  | 7772          | out           |HTTP1 server, used for older links like `logs.zip`
`pmm-server`  | 7773          | both          |Debugging
`pmm-agent`   | 7777          | both          |Default `pmm-agent` listen port
`pmm-agent`   | 42000 - 51999 | in            |Default range for `pmm-agent` connected agents
`vm-agent`    | 8428          | both          |Victoria metrics port

> Notes
>
> For `pmm-agent`, the default listen port is 7777. This can be changed in the `pmm-agent.yml` configuration file or with the `pmm-agent` flag `--listen-port`. The default range for agents ports can be changed with the flag `--ports-min` and  `--ports-max`, or in the configuration file.
