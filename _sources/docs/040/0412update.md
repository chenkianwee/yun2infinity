# Update all the container images

1. Check for new releases for the timescale-3dcitydb image. 
    - ~~Check for latest timescale container image at dockerhub [timescale/timescaledb-ha](https://hub.docker.com/r/timescale/timescaledb-ha/tags)~~
    - Check for latest postgis container image at dockerhub [kartoza/postgis](https://hub.docker.com/r/kartoza/postgis/tags)
    - Check for latest 3dcitydb release [here](https://github.com/3dcitydb/3dcitydb/releases/)
    - build the docker image using the dockerfile in timescale-3dcitydb folder
    - make necessary changes to the parameters and the container name in the setup_yun2inf.sh
    - make necessary changes to the timescaledb versioning in the tsdb4rpi.sh and tsdb4amd64.sh

2. Check for new releases for frost server [here](https://hub.docker.com/r/fraunhoferiosb/frost-server/tags).
    - make necessary changes to the parameters and the container name in the setup_yun2inf.sh 

3. Check for new releases for the grafana container [here](https://hub.docker.com/r/grafana/grafana-oss/tags)
    - make necessary changes to the parameters and the container name in the setup_yun2inf.sh 

3. Check for new releases for the django container yun2inf container. 
    - check the requirments.txt to make sure all the libraries are up to date
    - make necessary changes to the parameters and the container name in the setup_yun2inf.sh

4. Check for new releases for the bimserver [here](https://github.com/opensourceBIM/BIMserver/releases). 
    - if there are new release. Rebuild the bimserver container with the dockerfile.
    - make necessary changes to the parameters and the container name in the setup_yun2inf.sh 

5. Check for new releases for nginx [here](https://nginx.org/en/download.html) and then download the container [here](https://hub.docker.com/_/nginx/tags).
    - make necessary changes to the parameters and the container name in the setup_yun2inf.sh 

## Update the Container Images - FROST-Server Image Update

In this example we will update the FROST-Server image to the latest image.

1. Backup the database before doing any update. Follow the instruction here: {doc}`../040/0411maintain`.

2. Pull the latest image from Docker Hub and run a new container with the new image.

    ```
    $ sudo docker pull fraunhoferiosb/frost-server:latest
    ```
3. Run the remove masa3db script as shown here {doc}`../020/020installation`.

4. Once all the containers are removed. We can then restore them with the restore script. You will need to specify the path of the backup file required for restoring the database.

5. If FROST Server does not load on your browser. While the browser is loading, restart your DB container with docker restart to force the webpage to load.


