# Nginx configuration
1. Configure the nginx server with this config file yun2inf.conf, change the container name accordingly to your setup.
    ```
    map \$http_upgrade \$connection_upgrade {
      default upgrade;
      '' close;
    }

    upstream grafana {
      server $CONTAINERNAME3:3000;
    }

    server {
        server_name  localhost;
        listen       80;
        access_log  /var/log/nginx/host.access.log;
        error_log  /var/log/nginx/host.access.log;
        
        location / {
            proxy_pass		   http://$CONTAINERNAME4:8000;
            proxy_set_header   HOST \$host;
        }
        
        location /static {
            autoindex on;
            alias /yun2inf_project/www/static;
        }
        
        location /frost/ {
    	proxy_pass		    http://$CONTAINERNAME2:8080/FROST-Server/;
    	proxy_redirect      http://$CONTAINERNAME2:8080 http://localhost;
        proxy_read_timeout  240;

        proxy_set_header   Host \$host;
        #proxy_set_header   X-Real-IP \$remote_addr;
        #proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        #proxy_set_header   X-Forwarded-Proto \$scheme;
        }
        
        location /grafana/ {
    	proxy_set_header Host \$http_host;
    	proxy_pass http://grafana/;
        }
        
        # Proxy Grafana Live WebSocket connections.
        location /grafana/api/live/ {
    	proxy_http_version 1.1;
    	proxy_set_header Upgrade \$http_host;
    	proxy_set_header Connection \$connection_upgrade;
    	proxy_set_header Host \$http_host;
    	proxy_pass http://grafana/;
    	} 
    }
    ```
2. Copy this .conf file into the nginx docker container /etc/nginx/conf.d/ and delete the default.conf
