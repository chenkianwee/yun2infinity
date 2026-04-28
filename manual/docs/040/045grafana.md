# Visualisation with Grafana

## Install LinkSmart SensorThings Plugin
1. Make sure you are logged in as adminstrator. Go to the menu -> Plugins. Search for FROST SensorThings API Plugin. Install the plugin

2. Go to menu -> Data sources. Click on Add data source. Search for FROST SensorThings API Plugin.
3. Fill in the necessary parameters to create the data source. You should get a success msg if you fill in everything correctly.
    ```
    Name: Name of your data source
    URL: http://frost:8080/FROST-Server/v1.1/

    Basic auth
    Basic Auth Details
    User: your user name
    Password: your password
    ```
## Create Dashboards
1. Go to the side bar, Create -> Dashboard -> Add new panel.
2. At the datasource tab, choose the Sensorthing datasource that you have setup.
3. Basic -> Select Entrypoint. You will be able to choose the Things and its datastreams.

## Dual Axis
- https://community.grafana.com/t/secondary-axis-option-vanished/77745

1. Go to overrides -> add a property -> Axis > Placement -> Right
2. add a property ->  Axis > Label 

## Overiddes
1. To change the name of the legend add an overide - fields with name, and add an override property Standard options > Display name. Put in the name you want for your legend. 
