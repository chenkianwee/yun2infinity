#!/bin/bash
#-----------------------------------------------------------
#Remove Masa3db with Two Linked Docker Images Quick Start Script
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'This will help you remove your Masa3db Docker Network'
echo '------------------------------------------------------'
#DB CONTAINER NAME
echo 'Enter DB Container Name'
read -p "(default=spatempdb): " CONTAINERNAME1
CONTAINERNAME1=${CONTAINERNAME1:-spatempdb}
echo 'Enter FROST-Server Container Name'
read -p "(default=frost): " CONTAINERNAME2
CONTAINERNAME2=${CONTAINERNAME2:-frost}
echo 
#PRINT SETTING
echo 'Removing these containers, network and volume'
echo '---------------------------------'
echo 'Container Name1:' $CONTAINERNAME1
echo 'Container Name2:' $CONTAINERNAME2
echo 'Network: masa3db'
echo 'Volume: spatempdb_volume'
echo '--------------------------------'

# Remove Database Container  
echo 'Trying to remove db container now...'
docker stop "$CONTAINERNAME1"
docker rm "$CONTAINERNAME1" -v
echo 'Trying to remove frost container now ...'
docker stop "$CONTAINERNAME2"
docker rm "$CONTAINERNAME2" -v
echo 'Trying to remove network now ...'
docker network rm masa3db
echo 'Trying to remove the volume now ...'
docker volume rm spatempdb_volume
