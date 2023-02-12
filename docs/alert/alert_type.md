# Alert types

Percona Alerting is powered by Grafana infrastructure. PMM leverages Grafana's advanced alerting capabilities and adds an extra layer of alert templates that simplifies complex alert rules.

Depending on the datasources that you want to query, and the complexity of your required evaluation criteria, PMM enables you to create the following types of alerts: 

- **Percona templated alerts**: alerts based on a set of default templates with common events and expressions for alerting. 
If you need custom expressions on which to base your alert rules, you can also create your own templates. 
- **Grafana managed alerts**: alerts that handle complex conditions and can span multiple different data sources like SQL, Prometheus, InfluxDB, etc. These alerts are stored and executed by Grafana.
- **Mimir or Loki alerts**: alerts that consist of one single query, written in PromQL or LogQL. The alert rules are stored and executed on the Mimir or Loki ruler and are completely decoupled from the PMM and Grafana runtime.
- **Mimir or Loki recording rules**: precompute the result of expensive queries and execute alerts faster. 
With Mimir and Loki alert rules, you can run alert expressions closer to your data and at massive scale, managed by the Grafana. 