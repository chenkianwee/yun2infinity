# Install Web Feature Service (WFS)

By installing the WFS, you will be able to have fine grained access to the cityGML database. More details [here](https://www.ogc.org/standards/wfs).

1. Install the Docker image of 3DcityDB-WFS. The instructions are based on this [post](https://github.com/tum-gis/3dcitydb-wfs-docker/).
    ```
    sudo docker run --name "citydb-wfs" -d -p 8765:8080 \
    --network "masa3db"\
    -e "CITYDB_CONNECTION_TYPE=PostGIS" \
    -e "CITYDB_CONNECTION_SERVER=$container_name_hosting3dcitydb" \
    -e "CITYDB_CONNECTION_PORT=5432" \
    -e "CITYDB_CONNECTION_SID=spatempdb" \
    -e "CITYDB_CONNECTION_USER=$username" \
    -e "CITYDB_CONNECTION_PASSWORD=$password" \
    tumgis/3dcitydb-wfs
    ```
2. Test the installation by going to a web browser. If it return an XML, the service is up and running.
    ```
    http://my-docker-host:8765/citydb-wfs/wfs?SERVICE=WFS&REQUEST=GetCapabilities
    ```
