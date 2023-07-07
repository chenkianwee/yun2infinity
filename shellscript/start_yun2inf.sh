#!/bin/bash
#-----------------------------------------------------------
#Start the masa3db system if installed
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'Starting yun2inf'
echo '------------------------------------------------------'
#DB CONTAINER NAME
echo 'Enter DB Container Name'
read -p "(default=spatempdb): " CONTAINERNAME1
CONTAINERNAME1=${CONTAINERNAME1:-spatempdb}
echo 
echo 'Enter FROST-Server Container Name'
read -p "(default=frost): " CONTAINERNAME2
CONTAINERNAME2=${CONTAINERNAME2:-frost}
echo 
echo 'Enter Grafana Container Name'
read -p "(default=grafana_viz): " CONTAINERNAME3
CONTAINERNAME3=${CONTAINERNAME3:-grafana_viz}
echo 
echo 'Enter yun2inf Container Name'
read -p "(default=yun2inf_proj): " CONTAINERNAME4
CONTAINERNAME4=${CONTAINERNAME4:-yun2inf_proj}
echo 
echo 'Enter bimserver Container Name'
read -p "(default=bimserver): " CONTAINERNAME5
CONTAINERNAME5=${CONTAINERNAME5:-bimserver}
echo 
echo 'Enter nginx Container Name'
read -p "(default=yun2inf_nginx): " CONTAINERNAME6
CONTAINERNAME6=${CONTAINERNAME6:-yun2inf_nginx}
echo 
#PRINT SETTING
echo 'Starting these containers'
echo '---------------------------------'
echo 'Container Name1:' $CONTAINERNAME1
echo 'Container Name2:' $CONTAINERNAME2
echo 'Container Name3:' $CONTAINERNAME3
echo 'Container Name4:' $CONTAINERNAME4
echo 'Container Name5:' $CONTAINERNAME5
echo 'Container Name5:' $CONTAINERNAME6
echo '--------------------------------'

# Starting the containers
echo 'Trying to start db container now...'
docker start "$CONTAINERNAME1"
echo 'Trying to start frost container now ...'
docker start "$CONTAINERNAME2"
echo 'Trying to start grafana container now ...'
docker start "$CONTAINERNAME3"
echo 'Trying to start yun2inf container now ...'
docker start "$CONTAINERNAME4"
echo 'Trying to start bimserver container now ...'
docker start "$CONTAINERNAME5"
echo 'Trying to start nginx container now ...'
docker start "$CONTAINERNAME6"