FROM tomcat:9.0.76-jdk11-temurin-jammy
MAINTAINER chenkianwee chenkianwee@gmail.com

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install nano
ENV CATALINA_OPTS "-Xms1024M -Xmx4G"
WORKDIR /usr/local/tomcat/webapps
RUN wget https://github.com/opensourceBIM/BIMserver/releases/download/v1.5.184/bimserverwar-1.5.184.war -O bimserver.war