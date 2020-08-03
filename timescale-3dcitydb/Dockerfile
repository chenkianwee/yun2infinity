FROM postgis/postgis:12-3.0
MAINTAINER chenkianwee chenkianwee@gmail.com

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install lsb-release
RUN apt-get -y install wget
RUN apt-get -y install procps
RUN apt-get -y install unzip
RUN apt-get -y install vim 
RUN sh -c "echo 'deb https://packagecloud.io/timescale/timescaledb/debian/ `lsb_release -c -s` main' > /etc/apt/sources.list.d/timescaledb.list"
RUN wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | apt-key add -
RUN apt-get -y update
RUN apt-get -y install timescaledb-postgresql-12
RUN wget https://www.3dcitydb.org/3dcitydb/fileadmin/downloaddata/3DCityDB-4.0.1.zip
RUN unzip 3DCityDB-4.0.1.zip
RUN rm 3DCityDB-4.0.1.zip
RUN rm -r 3DCityDB-4.0.1/Documentation
RUN rm -r 3DCityDB-4.0.1/Oracle
RUN rm -r 3DCityDB-4.0.1/PostgreSQL/ShellScripts/Windows 

COPY 000_install_timescaledb.sh /docker-entrypoint-initdb.d
COPY 001_reenable_auth.sh /docker-entrypoint-initdb.d
COPY 002_timescaledb_tune.sh /docker-entrypoint-initdb.d
COPY create_extension_postgis_ext.sh /docker-entrypoint-initdb.d

