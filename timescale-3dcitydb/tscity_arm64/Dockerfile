FROM kartoza/postgis:17-3.5
LABEL maintainer="chenkianwee chenkianwee@gmail.com"
# the timescaledb-ha docker image is not working for rpi although it is suppose to
# thus i have to build my own image for rpi
USER root
RUN apt-get update
# RUN apt-get -y upgrade
RUN apt-get -y install wget
RUN apt-get -y install unzip
RUN apt-get -y install nano
RUN wget https://github.com/3dcitydb/3dcitydb/releases/download/v5.0.0/3dcitydb-5.0.0.zip
RUN unzip 3dcitydb-5.0.0.zip
RUN rm 3dcitydb-5.0.0.zip
