#!/bin/bash
#-----------------------------------------------------------
#Setup Yun2inf with multiple Linked Docker Images Quick Start Script
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'This will help you setup your yun2inf django and nginx Docker Network'
echo '------------------------------------------------------'
echo 'Enter yun2inf_django_gunicorn Container Name'
read -p "(default=yun2inf_proj): " CONTAINERNAME4
CONTAINERNAME4=${CONTAINERNAME4:-yun2inf_proj}
echo
echo 'Enter Port to listen to for the yun2inf_proj Container.'
read -p "(default=8000): " YPORT
YPORT=${YPORT:-8000}
echo
echo 'Enter nginx Container Name'
read -p "(default=yun2inf_nginx): " CONTAINERNAME5
CONTAINERNAME5=${CONTAINERNAME5:-yun2inf_nginx}
echo
echo 'Enter HTTP Port for nginx'
read -p "(default=80): " NPORT
NPORT=${NPORT:-80}

#PRINT SETTING
echo '---------------------------------'
echo 'Container Name4:' $CONTAINERNAME4
echo 'Container Name5:' $CONTAINERNAME5
echo 'YPort: ' $YBPORT
echo 'NPort: ' $NBPORT
echo '--------------------------------'

# CONFIGURE THE REVERSE PROXY OF NGINX
echo "map \$http_upgrade \$connection_upgrade {
  default upgrade;
  '' close;
}

upstream grafana {
  server localhost:3000;
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
    
    location /frost {
	proxy_pass		   http://localhost:8080/FROST-Server;
	proxy_set_header   HOST \$host;
    }
    
    location /grafana {
	rewrite  ^/grafana/(.*)  / break;	
	proxy_set_header Host \$host;
	proxy_pass http://localhost:3000;
    }
    
    # Proxy Grafana Live WebSocket connections.
    location /grafana/api/live {
	rewrite  ^/grafana/(.*)  / break;
	proxy_http_version 1.1;
	proxy_set_header Upgrade \$http_host;
	proxy_set_header Connection \$connection_upgrade;
	proxy_set_header Host \$http_host;
	proxy_pass http://localhost:3000;
	} 
}" > yun2inf.conf

#Create docker network
echo 'Creating the network yun2inf'
docker network create --driver bridge yun2inf

echo '------------------------------------------------------'
echo 'Trying to start django container now ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME4"\
    -h "$CONTAINERNAME4"\
	--network "yun2inf"\
    -p $YPORT:8000\
    -v "y2i:/yun2inf_project/www/static/"\
    chenkianwee/yun2inf:0.0.1
    
echo '------------------------------------------------------'
echo 'Trying to start nginx container now ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME5"\
    -h "$CONTAINERNAME5"\
	--network "yun2inf"\
    -p $NPORT:80\
    -v "y2i:/yun2inf_project/www/static/"\
    nginx:1.24

docker cp yun2inf.conf "$CONTAINERNAME5":/etc/nginx/conf.d/nginx.conf
docker exec -it "$CONTAINERNAME5" rm /etc/nginx/conf.d/default.conf
docker restart "$CONTAINERNAME5"