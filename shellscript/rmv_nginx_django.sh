#!/bin/bash
#-----------------------------------------------------------
#Remove nginx django containers
#-----------------------------------------------------------
echo '------------------------------------------------------'
echo 'This will help you remove your yun2inf django nginx Docker Network'
echo '------------------------------------------------------'
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
echo 'Container Name4:' $CONTAINERNAME4
echo 'Container Name5:' $CONTAINERNAME5
echo 'Network: yun2inf'
echo 'Volume: y2i'
echo '--------------------------------'

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
