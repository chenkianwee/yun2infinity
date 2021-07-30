FROM postgres:13-buster
LABEL maintainer=chenkianwee

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install apt-utils
RUN apt-get -y install libdbix-safe-perl
RUN apt-get -y install libcgi-pm-perl
RUN apt-get -y install libdbd-pg-perl
RUN apt-get -y install libencode-locale-perl
RUN apt-get -y install postgresql-plperl-13
RUN apt-get -y install build-essential
RUN apt-get -y install curl

RUN curl -L https://bucardo.org/downloads/Bucardo-5.6.0.tar.gz > Bucardo-5.6.0.tar.gz
RUN tar xzf Bucardo-5.6.0.tar.gz
RUN cd Bucardo-5.6.0 && perl Makefile.PL && make && make install

RUN mkdir /etc/postgresql/13
RUN mkdir /etc/postgresql/13/main

COPY etc/pg_hba.conf /etc/postgresql/13/main/
COPY etc/bucardorc /etc/bucardorc

RUN chown postgres /etc/postgresql/13/main/pg_hba.conf
RUN chown postgres /etc/bucardorc
RUN mkdir -p /var/log/bucardo
RUN touch /var/log/bucardo/log.bucardo
RUN chown postgres /var/log/bucardo/log.bucardo
RUN mkdir /var/run/bucardo && chown postgres /var/run/bucardo
RUN groupadd bucardo
RUN usermod -aG bucardo postgres

COPY etc/bucardorc2 /etc/bucardorc2
RUN chown postgres /etc/bucardorc2
