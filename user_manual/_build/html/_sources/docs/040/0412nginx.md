# Reverse proxy using nginx

1. Install nginx following [these instructions](https://nginx.org/en/linux_packages.html#Ubuntu)

2. Configure the grafana.ini file in the grafana docker container following [these instructions](https://grafana.com/tutorials/run-grafana-behind-a-proxy/).

3. Configure the config file of the nginx server (/etc/nginx/conf.d/default.config).
    ```
    map $http_upgrade $connection_upgrade {
      default upgrade;
      '' close;
    }

    upstream grafana {
      server localhost:3000;
    }

    server {
        listen       80;
        server_name  localhost;
        root /usr/share/nginx/www;
        index index.html index.htm;
        #access_log  /var/log/nginx/host.access.log  main;
        location /frost {
            #root   /usr/share/nginx/html;
            #index  index.html index.htm;
    	proxy_pass		http://localhost:8080/FROST-Server;
    	proxy_set_header	HOST $host;
        }
        
        location /grafana {
    	rewrite  ^/grafana/(.*)  /$1 break;
    	proxy_set_header Host $http_host;
    	proxy_pass http://localhost:3000;
        }
        
        # Proxy Grafana Live WebSocket connections.
        location /grafana/api/live {
    	rewrite  ^/grafana/(.*)  /$1 break;
    	proxy_http_version 1.1;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection $connection_upgrade;
    	proxy_set_header Host $http_host;
    	proxy_pass http://localhost:3000;
    	} 
    }   
    ```