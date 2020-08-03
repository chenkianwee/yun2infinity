#!/bin/bash
#-----------------------------------------------------------
#Spatempdb Docker Image Quick Start Script
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'This will help you setup your Spatempdb Docker Image'
echo '------------------------------------------------------'
#CONTAINER NAME
echo 'Enter Container Name'
read -p "(default=spatempdb): " CONTAINERNAME
CONTAINERNAME=${CONTAINERNAME:-spatempdb}
#PORT
echo 
echo 'Enter Port to listen to.'
read -p "(default=5432): " PORT
PORT=${PORT:-5432}
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
#PRINT SETTING
echo '---------------------------------'
echo 'Container Name:' $CONTAINERNAME
echo 'Host Port: ' $PORT
echo 'Username: ' $DBUSER
echo 'Password: ' $DBPASSWORD
echo 'Database Name: ' $DBNAME
echo '--------------------------------'
# Create Docker Container 
echo 'Trying to start container now...'
docker run -d --name "$CONTAINERNAME"\
	-p $PORT:5432\
	-e "POSTGRES_USER=$DBUSER"\
	-e "POSTGRES_PASSWORD=$DBPASSWORD"\
	-e "POSTGRES_DB=$DBNAME"\
	chenkianwee/timescale-3dcitydb:1.7.2-4.0.1

sleep 15
echo 'Create timescale extension'
docker exec -it "$CONTAINERNAME" psql -U "$DBUSER" -d "$DBNAME" -c 'CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;'
