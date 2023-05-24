#!/bin/bash
#-----------------------------------------------------------
#Setup Yun2inf with multiple Linked Docker Images Quick Start Script
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'This will help you setup your Yun2inf Docker Network'
echo '5 containers: 1) Database Container 2) FROST-Server Container 3) Grafana Container 4)yun2inf_proj 5)nginx'
echo '------------------------------------------------------'
#DB CONTAINER NAME
echo 'Enter DB Container Name'
read -p "(default=spatempdb): " CONTAINERNAME1
CONTAINERNAME1=${CONTAINERNAME1:-spatempdb}
#DB PORT
echo
echo 'Enter Port to listen to for the DB Container.'
read -p "(default=5432): " DBPORT
DBPORT=${DBPORT:-5432}
#DBUSER
echo
echo 'Enter User for Database'
read -p "(default=postgres): " DBUSER
DBUSER=${DBUSER:-postgres}
#DBPASSWORD
echo
echo 'Enter Password for the Database'
read -p "(default=postgres): " DBPASSWORD
DBPASSWORD=${DBPASSWORD:-postgres}
#DBNAME
echo
echo 'Enter Name for the Database'
read -p "(default=spatempdb): " DBNAME
DBNAME=${DBNAME:-spatempdb}
echo
echo 'Enter FROST-Server Container Name'
read -p "(default=frost): " CONTAINERNAME2
CONTAINERNAME2=${CONTAINERNAME2:-frost}
echo
echo 'Enter HTTP Port for FROST-Server'
read -p "(default=8080): " FSPORT1
FSPORT1=${FSPORT1:-8080}
echo
echo 'Enter MQTT Port for FROST-Server'
read -p "(default=1883): " FSPORT2
FSPORT2=${FSPORT2:-1883}
echo
echo 'Enter Service Root URL'
read -p "(default=http://localhost:8080/FROST-Server): " ROOTURL
ROOTURL=${ROOTURL:-http://localhost:8080/FROST-Server}
echo
echo 'Allow Public to Request for Data with no Password?'
read -p "(default=true): " AUTHREAD
AUTHREAD=${AUTHREAD:-true}
echo
echo 'Enter Grafana Container Name'
read -p "(default=grafana_viz): " CONTAINERNAME3
CONTAINERNAME3=${CONTAINERNAME3:-grafana_viz}
echo
echo 'Enter Port to listen to for the grafana Container.'
read -p "(default=3000): " GPORT
GPORT=${GPORT:-3000}
echo
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
echo 'Container Name1:' $CONTAINERNAME1
echo 'Container Name2:' $CONTAINERNAME2
echo 'Container Name3:' $CONTAINERNAME3
echo 'DBPort: ' $DBPORT
echo 'HTTP FROST-Server: ' $FSPORT1
echo 'MQTT FROST-Server: ' $FSPORT2
echo 'Username: ' $DBUSER
echo 'Password: ' $DBPASSWORD
echo 'Database Name: ' $DBNAME
echo 'Root URL: ' $ROOTURL
echo 'Public can Request Data: ' $AUTHREAD
echo 'GPort: ' $GPORT
echo 'Container Name4:' $CONTAINERNAME4
echo 'Container Name5:' $CONTAINERNAME5
echo 'YPort: ' $YPORT
echo 'NPort: ' $NPORT
echo '--------------------------------'
#=======================================================================
# CONFIGURE THE REVERSE PROXY OF NGINX
#=======================================================================
echo "map \$http_upgrade \$connection_upgrade {
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
}" > yun2inf.conf

#Create docker network
echo 'Creating the user-defined network yun2inf'
docker network create --driver bridge yun2inf

# Create Database Container
echo '------------------------------------------------------'
echo 'Trying to start db container now ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME1"\
   	-h "$CONTAINERNAME1"\
   	--network "yun2inf"\
	-p $DBPORT:5432\
	-e "POSTGRES_USER=$DBUSER"\
	-e "POSTGRES_PASSWORD=$DBPASSWORD"\
	-e "POSTGRES_DB=$DBNAME"\
	-v "spatempdb_volume:/var/lib/postgresql/data"\
	chenkianwee/timescale-3dcitydb:2.10.3-4.1.0
echo '------------------------------------------------------'
echo 'Successfully run DB Container'
echo '------------------------------------------------------'

echo '------------------------------------------------------'
echo 'Trying to start FROST-Server Container ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME2"\
	-h "$CONTAINERNAME2"\
	--network "yun2inf"\
	-p $FSPORT1:8080\
	-p $FSPORT2:1883\
	-e "serviceRootUrl=$ROOTURL"\
    -e "maxTop=10000"\
	-e "http_cors_enable=true"\
	-e "http_cors_allowed.origins=*"\
	-e "persistence_db_driver=org.postgresql.Driver"\
	-e "persistence_db_url=jdbc:postgresql://$CONTAINERNAME1:5432/$DBNAME"\
	-e "persistence_db_username=$DBUSER"\
	-e "persistence_db_password=$DBPASSWORD"\
	-e "persistence_autoUpdateDatabase=true"\
	-e "persistence_queryTimeout=240"\
	-e "auth_provider=de.fraunhofer.iosb.ilt.frostserver.auth.basic.BasicAuthProvider"\
	-e "auth_allowAnonymousRead=$AUTHREAD"\
	-e "auth_autoUpdateDatabase=true"\
	-e "auth_realmName=AuthWin"\
	-e "auth_db_jndi_datasource=jdbc/$DBNAME"\
	-e "auth_db_driver=org.postgresql.Driver"\
	-e "auth_db_url=jdbc:postgresql://$CONTAINERNAME1:5432/$DBNAME"\
	-e "auth_db_username=$DBUSER"\
	-e "auth_db_password=$DBPASSWORD"\
	-e "auth_db_conn_max=20"\
	-e "auth_db_conn_idle_max=10"\
	-e "auth_db_conn_idle_min=-1"\
	fraunhoferiosb/frost-server:2.1.2

#wait for abit before reconfiguring the FROST-server
echo '------------------------------------------------------'
echo 'Configuring the database container ... '
echo '------------------------------------------------------'
TOTAL=30
TIME=0
while [ $TIME -le $TOTAL ]
do
	echo "Configuring database, wait for $TOTAL seconds ... $TIME seconds"
	TIME=$(($TIME + 10))
	sleep 10
done

#docker exec -it "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c 'CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;'
docker exec -it "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "ALTER TABLE \"OBSERVATIONS\" DROP CONSTRAINT \"OBSERVATIONS_pkey\";"
docker exec -it "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "SELECT create_hypertable('\"OBSERVATIONS\"','PHENOMENON_TIME_START',chunk_time_interval => interval '7 days');"
docker exec -it "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "CREATE INDEX \"OBSERVATIONS_pkey\" ON \"OBSERVATIONS\" USING btree(\"ID\");"
docker exec -it "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "CREATE INDEX \"OBS-DS_ID-PHTIME_SE-O_ID\" on \"OBSERVATIONS\" using btree(\"DATASTREAM_ID\",\"PHENOMENON_TIME_START\" asc, \"PHENOMENON_TIME_END\" asc);"
docker exec -it "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "ALTER TABLE \"OBSERVATIONS\" ADD PRIMARY KEY (\"ID\", \"PHENOMENON_TIME_START\");"

echo '------------------------------------------------------'
echo 'Trying to start grafana container now ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME3"\
    -h "$CONTAINERNAME3"\
	--network "yun2inf"\
    -p $GPORT:3000\
    grafana/grafana-oss:9.5.2-ubuntu

docker cp ../grafana/defaults.ini "$CONTAINERNAME3":/usr/share/grafana/conf/defaults.ini
docker restart "$CONTAINERNAME3"
echo '------------------------------------------------------'
echo 'Trying to start django container now ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME4"\
    -h "$CONTAINERNAME4"\
	--network "yun2inf"\
    -p $YPORT:8000\
    -v "y2i:/yun2inf_project/www/static/"\
    chenkianwee/yun2inf:0.0.1

docker cp ../django/settings.py "$CONTAINERNAME4":/yun2inf_project/yun2inf_project/settings.py
docker restart "$CONTAINERNAME4"
echo '------------------------------------------------------'
echo 'Trying to start nginx container now ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME5"\
    -h "$CONTAINERNAME5"\
	--network "yun2inf"\
    -p $NPORT:80\
    -p 443:443\
    -v "y2i:/yun2inf_project/www/static/"\
    -v "letsencrypt:/etc/letsencrypt"\
    nginx:1.24-alpine3.17-slim

docker cp yun2inf.conf "$CONTAINERNAME5":/etc/nginx/conf.d/nginx.conf
docker exec -it "$CONTAINERNAME5" rm /etc/nginx/conf.d/default.conf
docker restart "$CONTAINERNAME5"
mv yun2inf.conf ../nginx/yun2inf.conf
echo '------------------------------------------------------'
echo 'Successfully installed yun2infinity'
echo '------------------------------------------------------'
