# Network


## Ports
All provided ports are TCP port. No UDP needed.

<!--
put ports in table, we'll add commentart later
-->

PMM Part     | Number        | Description
-------------|---------------|----------------------
pmm-server   |   80          | HTTP server, used for web interface
pmm-server   |  443          | HTTPS server, used for web interface
pmm-server   | 7771          | gRPC, used for communication between pmm-agent, pmm-admin
pmm-server   | 7772          | HTTP1 server, used for older links like logs.zip
pmm-server   | 7773          | Debugging
pmm-agent    | 7777          | Default pmm-agent listen port
pmm-agent    | 42000 - 51999 | Default range for pmm-agent connected agents
vm-agent     | 8428          | Victoria metrics port


PMM-Agent:
Default listen port is 7777. This port can be changed in configuration file of pmm-agent, or by flag --listen-port. Default range for agents ports
can be changed by flag --ports-min, --ports-max, or in configuration file.
