# Integrating BIMServer
1. The dockerfile used for creating the bimserver docker image
    ```
    FROM tomcat:9.0.76-jdk11-temurin-jammy
    MAINTAINER chenkianwee chenkianwee@gmail.com

    ENV CATALINA_OPTS "-Xms1024M -Xmx4G"
    WORKDIR /usr/local/tomcat/webapps
    RUN wget https://github.com/opensourceBIM/BIMserver/releases/download/v1.5.184/bimserverwar-1.5.184.war -O bimserver.war
    ```
2. Run this command to build the image. This command will find the Dockerfile in the directory and build the image according to the file. Refer to this [website](https://thenewstack.io/docker-basics-how-to-use-dockerfiles/) for a quick understanding  of the Dockerfile.
    ```
    $ sudo docker build . -t chenkianwee/tomcat-bimserver:9.0.76-1.5.184
    ```
3. The image will be built. If successful you will see the "Successfully built" message.

4. Push the image to your docker hub. Once uploaded, you will be able to pull from the repository.
    ```
    $ sudo docker login
    $ sudo docker push yourName/ImageName:tag
    ```
    