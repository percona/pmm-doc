# Service accounts authentication

!!! caution alert alert-warning "Important"
    API keys are deprecated now. During update to version PMM v3 all of them you be converted into Service Accounts with Service Token. In such case API key persist same, but it is just covnerted into Service Token.

Service accounts are used to control access to the PMM server components and resources. With an API key, you are authenticated to the PMM server, have access to PMM server components and resources, and perform various actions on them. You can use Service accounts as a replacement for basic authentication and API keys.

Service account contains Service Tokens, which is direct replacement for API key.

##  Generate Service Token 

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

## Authenticate

You can authenticate your request using the HTTPS header.

!!! caution alert alert-warning "Important"
    Use the `-k` or `--insecure` parameter to force cURL to ignore invalid and self-signed SSL certificate errors. The option will skip the SSL verification process, and you can bypass any SSL errors while still having SSL-encrypted communication. However, using the `--insecure`  parameter is not recommended. Although the data transfer is encrypted, it is not entirely secure. For enhanced security of your PMM installation, you need valid SSL certificates. For information on validating SSL certificates, refer to: [SSL certificates](../how-to/secure.md).

```sh
curl -H "Authorization: Bearer <service_token>" https://127.0.0.1/v1/version
```

## Use an Service Token in basic auth

You can pass the Service Token into a REST API call as a query parameter in the following format. Replace `SERVICE_TOKEN` with your Service Token.

**Example**


```sh
curl -X GET https://service_token:SERVICE_TOKEN@localhost/v1/version
```

## Use an Service Token in Bearer auth (HTTP header)
You can also pass Service Token into header of HTTP request. Replace `SERVICE_TOKEN` with your Service Token.

**Example**
```shell
curl -X GET -H 'Authorization: Bearer SERVICE_TOKEN' \
  -H 'Content-Type: application/json' https://127.0.0.1/v1/version
```