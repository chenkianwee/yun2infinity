#!/bin/bash
#-----------------------------------------------------------
#Remove Masa3db with Two Linked Docker Images Quick Start Script
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'This will help you remove your yun2inf Docker Network'
echo '------------------------------------------------------'
#DB CONTAINER NAME
echo 'Enter DB Container Name'
read -p "(default=spatempdb): " CONTAINERNAME1
CONTAINERNAME1=${CONTAINERNAME1:-spatempdb}
echo 'Enter FROST-Server Container Name'
read -p "(default=frost): " CONTAINERNAME2
CONTAINERNAME2=${CONTAINERNAME2:-frost}
echo 'Enter Grafana Container Name'
read -p "(default=grafana_viz): " CONTAINERNAME3
CONTAINERNAME3=${CONTAINERNAME3:-grafana_viz}
echo 'Enter yun2inf_proj Container Name'
read -p "(default=yun2inf_proj): " CONTAINERNAME4
CONTAINERNAME4=${CONTAINERNAME4:-yun2inf_proj}
echo 'Enter nginx Container Name'
read -p "(default=yun2inf_nginx): " CONTAINERNAME5
CONTAINERNAME5=${CONTAINERNAME5:-yun2inf_nginx}
echo 
#PRINT SETTING
echo 'Removing these containers, network and volume'
echo '---------------------------------'
echo 'Container Name1:' $CONTAINERNAME1
echo 'Container Name2:' $CONTAINERNAME2
echo 'Container Name3:' $CONTAINERNAME3
echo 'Container Name4:' $CONTAINERNAME4
echo 'Container Name5:' $CONTAINERNAME5
echo 'Network: yun2inf'
echo 'Volume1: spatempdb_volume'
echo 'Volume2: y2i'
echo '--------------------------------'

# Remove Database Container  
echo 'Trying to remove db container now...'
docker stop "$CONTAINERNAME1"
docker rm "$CONTAINERNAME1" -v
echo 'Trying to remove frost container now ...'
docker stop "$CONTAINERNAME2"
docker rm "$CONTAINERNAME2" -v
echo 'Trying to remove grafana container now ...'
docker stop "$CONTAINERNAME3"
docker rm "$CONTAINERNAME3" -v
echo 'Trying to remove yun2inf_proj container now...'
docker stop "$CONTAINERNAME4"
docker rm "$CONTAINERNAME4" -v
echo 'Trying to remove nginx container now ...'
docker stop "$CONTAINERNAME5"
docker rm "$CONTAINERNAME5" -v
echo 'Trying to remove network now ...'
docker network rm yun2inf
echo 'Trying to remove the volume now ...'
docker volume rm y2i
echo 'Trying to remove the volume now ...'
docker volume rm spatempdb_volume
