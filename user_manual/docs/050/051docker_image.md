# Timescale-3DCityDB
At the time of development, I was unable to find a docker image that is installed with the PostgreSQL12, Postgis3.0, latest TimescaleDB 1.7.2 and 3DCityDB 4.0.1. I had to build my own Docker image. This section documents how the Docker image is built.

1. Go to the terminal on your Ubuntu machine. Run this command to download the masa3db package.
    ```
    $ curl -L https://github.com/chenkianwee/masa3db/archive/0.02.zip > masa3db-0.02.zip
    ```
2. Unzip the file with this command.
    ```
    $ unzip masa3db-0.02.zip
    ```
3. Go into the masa3db-0.02/timescale-3dcitydb folder with this command. You will see these files.
    ```
    $ cd masa3db-0.02/timescale-3dcitydb
    $ ls
    ```
    ```
    000_install_timescaledb.sh  001_reenable_auth.sh  002_timescaledb_tune.sh  create_extension_postgis_ext.sh  Dockerfile
    ```
    a. Below is the Dockerfile for creating the image. The image is based on the postgis image. The 3Dcitydb is downloaded and copied into the container. TimescaleDB is installed using the apt-get store. Lastly, a series of initialisation script taken from the TimescaleDB Docker image is copied into this image. These scripts will initialise TimescaleDB when the container is created as they are placed in the docker-entrypoint-initdb.d folder.
    ```
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
    ```
4. Run this command to build the image. This command will find the Dockerfile in the directory and build the image according to the file. Refer to this [website](https://thenewstack.io/docker-basics-how-to-use-dockerfiles/) for a quick understanding  of the Dockerfile.
    ```
    $ sudo docker build -t chenkianwee/timescale-3dcitydb:1.7.2-4.0.1
    ```
5. The image will be built. If successful you will see the "Successfully built" message.
    ```{figure} /_static/051docker_image/build_success.png
    :scale: 100%
    :name: build_success

    Built success message.
    ```
6. Push the image to your docker hub. Once uploaded, you will be able to pull from the repository.
    ```
    $ sudo docker login
    $ sudo docker push yourName/ImageName:tag
    ```
