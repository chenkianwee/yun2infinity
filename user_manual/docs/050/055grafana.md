# Running Grafana behind a reverse proxy
This is based on instructions from here https://grafana.com/tutorials/run-grafana-behind-a-proxy/

1. Go into the grafana docker container and change the conf/defaults.ini to server grafana in subdomain.
    ```
    [server]
    domain = your_url.com
    root_url = %(protocol)s://%(domain)s:%(http_port)s/grafana/
    serve_from_sub_path = true
    ```
2. For the nginx configuration please refer to {doc}`056nginx`