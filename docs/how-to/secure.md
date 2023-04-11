# Secure

By Default, PMM ships with a self-signed certificate to enable usage out of the box.  While this does enable users to have encrypted connections between clients (database clients and web/API clients) and the PMM server, it shouldn't be considered a properly secured connection.  Taking the following precautions will ensure that you are truly secure:

- [SSL encryption with trusted certificates](#ssl-encryption) to secure traffic between clients and server;

- [Grafana HTTPS secure cookies](#grafana-https-secure-cookies)

## SSL encryption

Valid and trusted SSL certificates are needed to encrypt traffic between client and server.  They can be purchased through numerous sources online or some organizations have their own certificate signing practices to generated trusted certificates.  Regardless of which path you choose for enabling maximum security, the process to secure PMM consists of the following components:
1. Staging the files in the proper locations
 * this can be a [direct mount](#mounting-certificates) to a local directory containing the needed certificates or
 * you can [copy the files](#copying-certificates) to the appropriate directory in your Container|AMI|OVF
2. Restarting PMM
3. Ensuring the client(s) trust the certificate issuer


With our Docker, OVF and AMI images, certificates are stored in `/srv/nginx` and our self-signed certificates are staged there by default.

### Mounting certificates

For container based installs, if your own certificates are in a directory called `/etc/pmm-certs` on the container host, you would run the following to mount that directory in the proper location for PMM to find at container start:

```sh
docker run -d -p 443:443 --volumes-from pmm-data \
  --name pmm-server -v /etc/pmm-certs:/srv/nginx \
  --restart always percona/pmm-server:2
```

!!! note alert alert-primary ""
    - All certificates must be owned by root. You can do this with: `chown 0:0 /etc/pmm-certs/*`
    - The mounted certificate directory (`/etc/pmm-certs` in this example) must contain the files named as `certificate.crt`, `certificate.key`, `ca-certs.pem` and `dhparam.pem`.
    - For SSL encryption, the container should publish on port 443 instead of 80.

### Copying certificates

If PMM Server is running as a Docker image, use `docker cp` to copy certificates. This example copies certificate files from the current working directory to a running PMM Server docker container.

```sh
docker cp certificate.crt pmm-server:/srv/nginx/certificate.crt
docker cp certificate.key pmm-server:/srv/nginx/certificate.key
docker cp ca-certs.pem pmm-server:/srv/nginx/ca-certs.pem
docker cp dhparam.pem pmm-server:/srv/nginx/dhparam.pem
```

### Use trusted SSL when connecting PMM Client to PMM Server

At this point a restart of the PMM server (or advanced users can restart just nginx from a shell: `supervisorctl restart nginx`) is all that's needed for the server to start using the new trusted certificates.  

You can now register clients to the PMM Server using the following:
```sh
pmm-admin config --server-url=https://<user>:<password>@<server IP>
```

!!! hint alert alert-success "Remember"
    Your client machine(s) must trust the issuer of the certificate or you will still see "untrusted connections" messages when accessing the web interface and your client will need the `--server-insecure-tls` paramater when running the `pmm-admin config` command.  Follow your operating systems instructions to install the issuer certificate (ca-certs.pem). 

In case of pmm-client running in the container, mount certificates to `etc/pki/tls/certs`:
```sh
PMM_SERVER=X.X.X.X:443
docker run \
--rm \
--name pmm-client \
-e PMM_AGENT_SERVER_ADDRESS=${PMM_SERVER} \
-e PMM_AGENT_SERVER_USERNAME=admin \
-e PMM_AGENT_SERVER_PASSWORD=admin \
-e PMM_AGENT_SETUP=1 \
-e PMM_AGENT_CONFIG_FILE=config/pmm-agent.yaml \
-v /your_directory_with/certs:/etc/pki/tls/certs \
--volumes-from pmm-client-data \
percona/pmm-client:2

## Grafana HTTPS secure cookies

To enable:

1. Start a shell within the Docker container.

    ```sh
    docker exec -it pmm-server bash
    ```

2. Edit `/etc/grafana/grafana.ini`.

3. Enable `cookie_secure` and set the value to `true`.

4. Restart Grafana.

    ```sh
    supervisorctl restart grafana
    ```
