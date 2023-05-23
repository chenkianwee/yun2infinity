# Nginx configuration
1. Configure the nginx server with this config file yun2inf.conf, change the container name accordingly to your setup.
    ```
    map $http_upgrade $connection_upgrade {
      default upgrade;
      '' close;
    }

    upstream grafana {
      server localhost:3000;
    }

    server {
        server_name  localhost;
        listen       80;
        
        location / {
            proxy_pass		   http://yun2inf_proj:8000;
        	proxy_set_header   HOST $host;
        }
        
        location /static {
            autoindex on;
            alias /yun2inf/www/static;
        }
        
        location /frost {
        	proxy_pass		   http://frost:8080/FROST-Server;
        	proxy_set_header   HOST $host;
        }
        
        location /grafana {
        	rewrite  ^/grafana/(.*)  /$1 break;
        	proxy_set_header Host $http_host;
        	proxy_pass http://grafana_viz:3000;
        }
        
        # Proxy Grafana Live WebSocket connections.
        location /grafana/api/live {
        	rewrite  ^/grafana/(.*)  /$1 break;
        	proxy_http_version 1.1;
        	proxy_set_header Upgrade $http_upgrade;
        	proxy_set_header Connection $connection_upgrade;
        	proxy_set_header Host $http_host;
        	proxy_pass http://grafana_viz:3000;
    	} 
    }
    ```
2. Copy this .conf file into the nginx docker container /etc/nginx/conf.d/ and delete the default.conf
