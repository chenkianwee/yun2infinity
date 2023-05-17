# Timescale-3DCityDB
At the time of development, I was unable to find a docker image that is installed with the PostgreSQL15, Postgis3.0, latest TimescaleDB 2.10.3 and 3DCityDB 4.1.0. I had to build my own Docker image. This section documents how the Docker image is built.

1. Go to the terminal on your Ubuntu machine. Run this command to download the masa3db package.
    ```
    $ curl -L https://github.com/chenkianwee/masa3db/archive/xxxx.zip > masa3db-xxxx.zip
    ```
2. Unzip the file with this command.
    ```
    $ unzip masa3db-xxxx.zip
    ```
3. Go into the masa3db-xxxx/timescale-3dcitydb folder with this command. You will see these files.
    ```
    $ cd masa3db-0.02/timescale-3dcitydb
    $ ls
    ```
    ```
    create_extension_postgis_ext.sh  Dockerfile
    ```
    a. Below is the Dockerfile for creating the image. The image is based on the timescale image. The 3Dcitydb is downloaded and copied into the container. Lastly, an initialisation script is copied into this image. This scripts will initialise some postgis extension when the container is created as they are placed in the docker-entrypoint-initdb.d folder.
    ```
    FROM timescale/timescaledb-ha:pg15.2-ts2.10.3-all-oss
    MAINTAINER chenkianwee chenkianwee@gmail.com

    USER root
    RUN apt-get update
    RUN apt-get -y upgrade
    RUN apt-get -y install wget
    RUN apt-get -y install unzip
    RUN apt-get -y install nano
    RUN wget https://github.com/3dcitydb/3dcitydb/releases/download/v4.1.0/3dcitydb-4.1.0.zip
    RUN unzip 3dcitydb-4.1.0.zip
    RUN rm 3dcitydb-4.1.0.zip

    COPY create_extension_postgis_ext.sh /docker-entrypoint-initdb.d
    USER postgres
    ```
4. Run this command to build the image. This command will find the Dockerfile in the directory and build the image according to the file. Refer to this [website](https://thenewstack.io/docker-basics-how-to-use-dockerfiles/) for a quick understanding  of the Dockerfile.
    ```
    $ sudo docker build . -t chenkianwee/timescale-3dcitydb:1.7.2-4.0.1
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

## Docker Image for Raspberry Pi (not working)

1. We will use the Debian docker image as base.

2. Install Tomcat in the Debian Docker image. Instruction [here](https://tecadmin.net/install-apache-tomcat-9-on-debian/) and for the init.d [here](https://javabirder.wordpress.com/2016/02/18/install-tomcat-9-ubuntu/).

    ```
    $ apt update
    $ apt install default-jdk
    $ apt install wget https://apache.osuosl.org/tomcat/tomcat-9/v9.0.50/bin/apache-tomcat-9.0.50.tar.gz
    ```
