#!/bin/bash
#-----------------------------------------------------------
#Setup Masa3db with Two Linked Docker Images Quick Start Script
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'This will help you setup your Masa3db Docker Network'
echo '3 containers: 1) Database Container 2) FROST-Server Container 3) Grafana Container'
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
read -p "(default=grafana): " CONTAINERNAME3
CONTAINERNAME3=${CONTAINERNAME3:-grafana}

#PRINT SETTING
echo '---------------------------------'
echo 'Container Name1:' $CONTAINERNAME1
echo 'Container Name2:' $CONTAINERNAME2
echo 'Container Name2:' $CONTAINERNAME2
echo 'DBPort: ' $DBPORT
echo 'HTTP FROST-Server: ' $FSPORT1
echo 'MQTT FROST-Server: ' $FSPORT2
echo 'Username: ' $DBUSER
echo 'Password: ' $DBPASSWORD
echo 'Database Name: ' $DBNAME
echo 'Root URL: ' $ROOTURL
echo 'Public can Request Data: ' $AUTHREAD
echo '--------------------------------'
#Create docker network
echo 'Creating the user-defined network yun2inf'
docker network create --driver bridge yun2inf

# Create Database Container
echo '------------------------------------------------------'
echo 'Trying to start db container now ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME1"\
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
    --network "yun2inf"\
    -p 3000:3000\
    grafana/grafana-oss:9.5.2-ubuntu