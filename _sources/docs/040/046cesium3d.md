# Install 3DcityDB Web Map Client

By installing the Web Map Client, you will be able to visualise the cityGML data in CesiumJS. More details [here](https://www.3dcitydb.org/3dcitydb/3dwebclient/).

1. Install the Docker image of 3DcityDB-Web-Map-Client. The instructions are based on this [post](https://github.com/tum-gis/3dcitydb-web-map-docker).
    ```
    $ docker run -d --name 3dwebmap -p 8000:8000 \
    -v /home/chaos/3dcitydata/:/var/www/data/ \
    tumgis/3dcitydb-web-map
    ```
