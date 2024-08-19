FROM timescale/timescaledb-ha:pg16.4-ts2.16.1-all-oss
LABEL maintainer="chenkianwee chenkianwee@gmail.com"

USER root
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install wget
RUN apt-get -y install unzip
RUN apt-get -y install nano
RUN wget https://github.com/3dcitydb/3dcitydb/releases/download/v4.4.0/3dcitydb-4.4.0.zip
RUN unzip 3dcitydb-4.4.0.zip
RUN rm 3dcitydb-4.4.0.zip

COPY create_extension_postgis_ext.sh /docker-entrypoint-initdb.d
USER postgres