# About security in PMM


You can improve the security of your PMM installation with:

- [SSL encryption](#ssl-encryption) to secure traffic between client and server;

- [Grafana HTTPS secure cookies](#grafana-https-secure-cookies)

To see which security features are enabled:

```sh
pmm-admin status
```

!!! hint alert alert-success "Tip"
    You can gain an extra level of security by keeping PMM Server isolated from the internet, if possible.