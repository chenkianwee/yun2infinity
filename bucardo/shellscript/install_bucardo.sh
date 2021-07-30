#!/bin/bash

#DB CONTAINER NAME
echo 'Enter DB Container Name'
read -p "(default=bucardo): " CONTAINERNAME
CONTAINERNAME=${CONTAINERNAME:-bucardo}
echo
echo 'Enter Port to listen to for the DB Container.'
read -p "(default=5432): " DBPORT
DBPORT=${DBPORT:-5432}
echo
echo '------------------------------------------------------'
echo 'Trying to start Bucardo Container ...'
echo '------------------------------------------------------'
docker run -d --name "$CONTAINERNAME"\
	-p $DBPORT:5432\
	-e "POSTGRES_USER=postgres"\
	-e "POSTGRES_PASSWORD=postgres"\
	-e "POSTGRES_DB=postgres"\
	-v "bucardo_volume:/var/lib/postgresql/data"\
	chenkianwee/bucardo_ready:5.6.0

echo '------------------------------------------------------'
echo 'Successfully run Container. Installing Bucardo ...'
echo '------------------------------------------------------'
#wait for abit before installing Bucardo
TOTAL=120
TIME=0
while [ $TIME -le 120 ]
do
	echo "Installing Bucardo, wait for 120 seconds ... $TIME seconds"
	TIME=$(($TIME + 10))
	sleep 10
done

docker exec -it "$CONTAINERNAME" su - postgres -c "bucardo install --batch && bucardo set log_level=debug"
docker exec -it "$CONTAINERNAME" mv /etc/bucardorc2 /etc/bucardorc
