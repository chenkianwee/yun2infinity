#!/bin/bash
echo '------------------------------------------------------'
echo 'Configuring the database container ... '
echo '------------------------------------------------------'
echo
echo 'Enter DB Container Name'
read -p "(default=spatempdb): " CONTAINERNAME1
CONTAINERNAME1=${CONTAINERNAME1:-spatempdb}
#DBUSER
echo
echo 'Enter User for Database'
read -p "(default=postgres): " DBUSER
DBUSER=${DBUSER:-postgres}
#DBNAME
echo
echo 'Enter Name for the Database'
read -p "(default=spatempdb): " DBNAME
DBNAME=${DBNAME:-spatempdb}

docker exec -it -u root "$CONTAINERNAME1" apt-get install -y wget
docker exec -it -u root "$CONTAINERNAME1" apt-get install -y unzip
docker exec -it -u root "$CONTAINERNAME1" apt-get install -y nano
docker exec -it -u root "$CONTAINERNAME1" wget https://github.com/3dcitydb/3dcitydb/releases/download/v5.0.0/3dcitydb-5.0.0.zip
docker exec -it -u root "$CONTAINERNAME1" unzip 3dcitydb-5.0.0.zip
docker exec -it -u root "$CONTAINERNAME1" rm 3dcitydb-5.0.0.zip

docker exec -it -u "$DBUSER" "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c 'CREATE EXTENSION IF NOT EXISTS postgis_raster CASCADE;'
docker exec -it -u "$DBUSER" "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c 'CREATE EXTENSION IF NOT EXISTS postgis_sfcgal CASCADE;'