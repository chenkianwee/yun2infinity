# Nginx configuration
## Docker nginx
1. Configure the nginx server with this config file yun2inf.conf, change the container name accordingly to your setup.
    ```
    #server_tokens   off;
    
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
            #proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
            #proxy_set_header   X-Forwarded-Proto \$scheme;
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
        #proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        #proxy_set_header   X-Forwarded-Proto \$scheme;
        }
        
        location /grafana/ {
    	proxy_set_header Host \$http_host;
    	proxy_pass http://grafana/;
    	#proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        #proxy_set_header   X-Forwarded-Proto \$scheme;
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
3. I have also included a security header file to be included when you have ssl certificate.
    ```
    # Security headers
    add_header Strict-Transport-Security "max-age=300;" always;
    # add_header Strict-Transport-Security "max-age=300; includeSubDomains; preload";
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    # add_header Content-Security-Policy "default-src 'self';";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "origin";
    ```
## Basic authentication for NGINX
- for more information refer to the full article here https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/

1. Go into the ngnx docker container after it is installed.
    ```
    sudo docker exec -it yun2inf_nginx sh
    ```
2. Install apache2-utils
    ```
    apk add apache2-utils
    ```
3. Make a apache2 directory
    ```
    mkdir /etc/apache2
    ```
4. Configure the password file. 
    ```
    htpasswd -c /etc/apache2/.htpasswd $username
    ```
5. If you need to add new user, use this command
    ```
    htpasswd /etc/apache2/.htpasswd $new_username
    ```

6. Go to the /etc/nginx/conf.d/nginx.conf and add in the following lines to the directory you want to restrict.
    ```
    location / {
    auth_basic "Restricted Area";
    auth_basic_user_file /etc/apache2/.htpasswd;
    
    }
    ```