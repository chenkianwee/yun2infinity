# Visualisation with Grafana
## Install Grafana

1. If you have not installed Docker. Install Docker {doc}`here <../020/021docker>`.
2. If you have not installed Masa3DB. Install Masa3DB {doc}`here <../020/022setup>`.
3. Run this command to install Grafana.
    ```
    $ sudo docker run -d --network masa3db -p 3000:3000 --name grafana grafana/grafana  
    ```
4. Go to the server where you have installed your Grafana. In my case, I have installed it at http://chaosbox.princeton.edu:3000 (will need to VPN into the local intranet). For the first time, login to Grafana with username:admin and password:admin. Once login change the password and username.
## Install LinkSmart SensorThings Plugin
1. Run this command to get into the grafana container.
    ```
    $ sudo docker exec -u root -it grafana bash
    ```
2. Run this command in the bash to install the SensorThings Plugin.
    ```
    $ grafana-cli plugins install linksmart-sensorthings-datasource
    ```
3. Exit the container by running this command.
    ```
    $ exit
    ```
4. Restart the Grafana container for the plugin to work.
    ```
    $ sudo docker restart grafana
    ```
5. Once installed. Login to Grafana. On the side bar, go to Configuration -> Data Sources - Add data source. Search for sensorthings and you will see
    ```{figure} /_static/046grafana/sensorthings_plugin.png
    :scale: 100%
    :name: sensorthings_plugin

    Select the LinkSmart SensorThings.
    ```
6. Next configure the settings as follows.Remember to substitute your frost server container name below.
    ```
    Name: LinkSmart SensorThings
    URL: http://frost-server-containername:8080/FROST-Server/v1.0
    Access: Server (default)

    Basic auth
    Basic Auth Details
    User: your user name
    Password: your password
    ```
## Create Dashboards
1. Go to the side bar, Create -> Dashboard -> Add new panel.
2. At the datasource tab, choose the Sensorthing datasource that you have setup.
    ```{figure} /_static/046grafana/sensorthings_plugin1.png
    :scale: 100%
    :name: sensorthings_plugin1

    Select the LinkSmart SensorThings as datasource.
    ```
