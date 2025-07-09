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

# install timescaledb (https://docs.tigerdata.com/self-hosted/latest/install/installation-linux/)
# timescaledb tuning tool (https://docs.tigerdata.com/self-hosted/latest/configuration/timescaledb-tune/)
docker exec -u root "$CONTAINERNAME1" bash -c 'echo "deb https://packagecloud.io/timescale/timescaledb/debian/ $(lsb_release -c -s) main" | tee /etc/apt/sources.list.d/timescaledscaledb.list'
docker exec -u root "$CONTAINERNAME1" bash -c 'wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | gpg --dearmor -o /etc/apt/trusted.gpg.d/timescaledb.gpg'
docker exec -it -u root "$CONTAINERNAME1" apt-get update
docker exec -it -u root "$CONTAINERNAME1" apt-get install -y timescaledb-2-oss-postgresql-17=2.21.0~debian12
docker exec -it -u root "$CONTAINERNAME1" timescaledb-tune --quiet --yes
docker exec -u root spatempdb bash -c "echo \"shared_preload_libraries = 'timescaledb,pg_cron'\" >> /etc/postgresql/17/main/postgresql.conf"
docker restart "$CONTAINERNAME1"

TOTAL=30
TIME=0
while [ $TIME -le $TOTAL ]
do
    echo "Configuring database, wait for $TOTAL seconds ... $TIME seconds"
    TIME=$(($TIME + 10))
    sleep 10
done

docker exec -it -u "$DBUSER" "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c 'CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;'
docker exec -it -u "$DBUSER" "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "ALTER TABLE \"OBSERVATIONS\" DROP CONSTRAINT \"OBSERVATIONS_pkey\";"
docker exec -it -u "$DBUSER" "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "SELECT create_hypertable('\"OBSERVATIONS\"','PHENOMENON_TIME_START',chunk_time_interval => interval '7 days');"
docker exec -it -u "$DBUSER" "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "CREATE INDEX \"OBSERVATIONS_pkey\" ON \"OBSERVATIONS\" USING btree(\"ID\");"
docker exec -it -u "$DBUSER" "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "CREATE INDEX \"OBS-DS_ID-PHTIME_SE-O_ID\" on \"OBSERVATIONS\" using btree(\"DATASTREAM_ID\",\"PHENOMENON_TIME_START\" asc, \"PHENOMENON_TIME_END\" asc);"
docker exec -it -u "$DBUSER" "$CONTAINERNAME1" psql -U "$DBUSER" -d "$DBNAME" -c "ALTER TABLE \"OBSERVATIONS\" ADD PRIMARY KEY (\"ID\", \"PHENOMENON_TIME_START\");"
