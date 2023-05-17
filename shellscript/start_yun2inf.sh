#!/bin/bash
#-----------------------------------------------------------
#Start the masa3db system if installed
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'Starting masa3db'
echo '------------------------------------------------------'
#DB CONTAINER NAME
echo 'Enter DB Container Name'
read -p "(default=spatempdb): " CONTAINERNAME1
CONTAINERNAME1=${CONTAINERNAME1:-spatempdb}
echo 'Enter FROST-Server Container Name'
read -p "(default=frost): " CONTAINERNAME2
CONTAINERNAME2=${CONTAINERNAME2:-frost}
echo 'Enter Grafana Container Name'
read -p "(default=grafana): " CONTAINERNAME3
CONTAINERNAME3=${CONTAINERNAME3:-grafana}
echo 
#PRINT SETTING
echo 'Starting these containers'
echo '---------------------------------'
echo 'Container Name1:' $CONTAINERNAME1
echo 'Container Name2:' $CONTAINERNAME2
echo 'Container Name3:' $CONTAINERNAME3
echo '--------------------------------'

# Starting the containers
echo 'Trying to start nginx ...'
systemctl start nginx
echo 'Trying to start db container now...'
docker start "$CONTAINERNAME1"
echo 'Trying to start frost container now ...'
docker start "$CONTAINERNAME2"
echo 'Trying to start grafana container now ...'
docker start "$CONTAINERNAME3"
