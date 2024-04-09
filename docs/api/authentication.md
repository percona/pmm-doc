# Service accounts authentication

!!! caution alert alert-warning "Deprecation notice"
Starting with version 3, PMM no longer uses API keys as the primary method for controlling access to the PMM Server components and resources. Instead, PMM is now leveraging Grafana service accounts, which have limited scopes and offer enhanced security compared to API keys.

**Automatic migration of API keys**
When you install PMM 3.x, any existing API keys will be seamlessly converted to service accounts with corresponding service tokens.

Service accounts in PMM provide a secure and efficient way to manage access to the PMM Server and its resources. They serve as a replacement for the basic authentication and API keys used in previous versions of PMM (v.2 and earlier).

With service accounts, you can:

- Control access to PMM Server components and resources.
- Define granular permissions for various actions.
- Create and manage multiple access tokens for a single service account.

Creating multiple tokens for the same service account is beneficial in the following scenarios:

- when multiple applications require the same permissions but need to be audited or managed separately. By assigning each application its own token, you can track and control their actions individually.
when a token becomes compromised and needs to be replaced. Instead of revoking the entire service account, you can rotate or replace the affected token without disrupting other applications using the same service account.
- when you want to implement token lifecycle management. You can set expiration dates for individual tokens, ensuring that they are regularly rotated and reducing the risk of unauthorized access.


##  Generate a service account and token 

PMM uses the Grafana service account tokens for authentication. A token is a generated random string that acts as an alternative to a API passwords.

Here's how to generate a service account token:

1. Log into PMM.
2. From the side menu, click **Administration > Users and access**.
3. Click on the **Service accounts** card.
4. Click **Add service account**.
5. Specify a  unique name for your service account, select a role from the drop-down menu, and click **Create** to display your newly created service account. 
    - Select the Role from the drop-down menu.
7. Click **Add service account token**.
8. Provide a name for the new service token, or leave the field empty to generate an automatic name.
9. In same dialog choose also "Expiration" for Service Token. Options are: "No expiration" or "Choose expiration date".
10. Click **Generate Token**. A pop-up window will display the new token, which usually has a  "glsa_" prefix. 
12. Copy your service token to the clipboard and store it securely.
Now you can utilize your new service token for authentication in PMM API calls or in your pmm-agent configuration.

## Authenticate

You can authenticate your request using the HTTPS header.

!!! caution alert alert-warning "Important"
    Use the `-k` or `--insecure` parameter to force cURL to ignore invalid and self-signed SSL certificate errors. The option will skip the SSL verification process, and you can bypass any SSL errors while still having SSL-encrypted communication. However, using the `--insecure`  parameter is not recommended. Although the data transfer is encrypted, it is not entirely secure. For enhanced security of your PMM installation, you need valid SSL certificates. For information on validating SSL certificates, refer to: [SSL certificates](../how-to/secure.md).

```sh
curl -H "Authorization: Bearer <service_token>" https://127.0.0.1/v1/version
```

## Use a service token in basic authentication

You can include the service token as a query parameter in a REST API call using the following format. Replace YOUR_SERVICE_TOKEN with the actual service token you obtained in step 12.


**Example**


```sh
curl -X GET https://service_token:SERVICE_TOKEN@localhost/v1/version
```

## Use a service token in Bearer authentication (HTTP header)
You can also include the service token in the header of an HTTP request for authentication. To do this, replace `SERVICE_TOKEN` with the actual service token you obtained in step 12.

**Example**
```shell
curl -X GET -H 'Authorization: Bearer SERVICE_TOKEN' \
  -H 'Content-Type: application/json' https://127.0.0.1/v1/version
```