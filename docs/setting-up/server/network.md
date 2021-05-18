# Network

## Ports

This is a list of ports used by the various components of PMM.

For PMM to work correctly, your system's firewall should allow traffic on these ports.

| Destination   | Component     | Protocols | Port/Port Range | Dicertion | Description
|---------------|---------------|-----------|-----------------|-----------|---------------------
| PMM Server    | `pmm-server`  | TCP       |   80            | out       | HTTP server, used for web interface and gRPC over HTTP
| PMM Server    | `pmm-server`  | TCP       |  443            | out       | HTTPS server, used for web interface and gRPC over HTTPS
| PMM Server    | `pmm-server`  | TCP       | 7773            | both      | Debugging (not exposed by default)
| PMM Client    | `pmm-agent`   | TCP       | 42000--51999    | in        | Default range for `pmm-agent` connected agents
