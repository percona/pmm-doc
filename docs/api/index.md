# About PMM API

PMM Server lets you visually interact with API resources representing all objects within PMM. You can browse the API using the [Swagger](https://swagger.io/tools/swagger-ui/) UI, accessible at the `/swagger/` endpoint URL:

![!image](../_images/PMM_Swagger_API_Get_Logs_View.jpg)

Clicking an object lets you examine objects and execute requests on them:

![!image](../_images/PMM_Swagger_API_Get_Logs_Execute.jpg)

The objects visible are nodes, services, and agents:

- A **Node** represents a bare metal server, a virtual machine, a Docker container, or a more specific type such as an Amazon RDS Node. A node runs zero or more Services and Agents, and has zero or more Agents providing insights for it.

- A **Service** represents something useful running on the Node: Amazon Aurora MySQL, MySQL, MongoDB, etc. It runs on zero (Amazon Aurora Serverless), single (MySQL), or several (Percona XtraDB Cluster) Nodes. It also has zero or more Agents providing insights for it.

- An **Agent** represents something that runs on the Node which is not useful in itself but instead provides insights (metrics, query performance data, etc.) about Nodes and/or Services. An agent always runs on the single Node (except External Exporters), and provides insights for zero or more Services and Nodes.

Nodes, Services, and Agents have **Types** which define specific their properties, and their specific logic.

Nodes and Services are external by nature – we do not manage them (create, destroy), but merely maintain a list of them (add to inventory, remove from inventory) in `pmm-managed`. Most Agents are started and stopped by `pmm-agent`. One exception is the External Exporter Type which is started externally.


## Authentication with service accounts

!!! caution alert alert-warning "Important"
Starting with version 3, PMM no longer uses API keys as the primary method for controlling access to the PMM Server components and resources. Instead, PMM is now leveraging Grafana service accounts, which have limited scopes and offer enhanced security compared to API keys.

**Automatic migration of API keys**
When you install PMM 3.x, any existing API keys will be seamlessly converted to service accounts with corresponding service tokens.
	```

Service accounts are used to control access to the PMM server components and resources. With an API key, you are authenticated to the PMM server, have access to PMM server components and resources, and perform various actions on them. You can use Service accounts as a replacement for basic authentication and API keys.

Service account contains Service Tokens, which is direct replacement for API key.

### Generate Service Token 

PMM uses the Grafana Service Token for authentication. Following are the steps to generate the Service Token:

1. Login to PMM.
2. From the side menu, click *Administration → Users and access*.
3. On the next page, click *Service accounts*.
4. *Add Service Account* dialog box opens.
5. Enter  the following to generate an Service account:
    - Service Account name (you can give any desired name)
    - Select the Role from the drop-down 
    - Click Add.
6. *Service Account Updated* window displays your newly created Service Account.
7. Click *Add Service Account Token*.
8. Enter name for Service Token, or left input empty to generate name.
9. In same dialog choose also "Expiration" for Service Token. Options are: "No expiration" or "Choose expiration date".
10. Once you are done click on "Generate Token".
11. Your Service Token hash just prompt up on your screen. It usually has prefix: "glsa_".
12. Copy your Service Token to clipboard and save it on secure place.
13. Now you can use your new Service Token for authentication in PMM API calls (or in your PMM agent config).

### Authenticate

You can authenticate your request using the HTTPS header.

!!! caution alert alert-warning "Important"
    Use the `-k` or `--insecure` parameter to force cURL to ignore invalid and self-signed SSL certificate errors. The option will skip the SSL verification process, and you can bypass any SSL errors while still having SSL-encrypted communication. However, using the `--insecure`  parameter is not recommended. Although the data transfer is encrypted, it is not entirely secure. For enhanced security of your PMM installation, you need valid SSL certificates. For information on validating SSL certificates, refer to: [SSL certificates](../how-to/secure.md).

```sh
curl -H "Authorization: Bearer <service_token>" https://127.0.0.1/v1/version
```

### Use an Service Token in basic auth

You can pass the Service Token into a REST API call as a query parameter in the following format. Replace `SERVICE_TOKEN` with your Service Token.

**Example**


```sh
curl -X GET https://service_token:SERVICE_TOKEN@localhost/v1/version
```
