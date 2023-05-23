# Installation
I am using [Docker](https://www.docker.com/) for running the database. So you will have to install Docker on your machine. Refer to the next section to install Docker. Once Docker is installed, I have written a shellscript to automatically fetch all the necessary Docker containers to get the database up and running. Currently, the shellscript has only been tested with an Ubuntu machine. In summary:
1. Install Docker
2. Install Yun2Infinity
3. Install Nginx

## Docker
- Install docker based on instruction from the [Docker official site](https://docs.docker.com/engine/install/ubuntu/#installation-methods).
- Uninstall docker based on instruction from [here](https://docs.docker.com/engine/install/ubuntu/#uninstall-docker-engine)

## Setup Yun2Infinity 
- Only tested on Ubuntu 22.04

1. Go to the terminal on your Ubuntu machine. Run this command to download the masa3db package.
    ```
    $ curl -L https://github.com/chenkianwee/yun2infinity/archive/xxxx.zip > yun2infinity-xxxx.zip
    ```
    a. If curl is not installed on your machine. Install it with this command.
    ```
    $ sudo apt-get install curl
    ```
2. Unzip the file with this command.
    ```
    $ unzip masa3db-xxxx.zip
    ```
    a. If unzip is not installed on your machine. Install it with this command.
    ```
    $ sudo apt-get install unzip
    ```
3. Go into the masa3db-xxxx folder with this command. You will be able to see the following folders and files.
    ```
    $ cd masa3db-xxxx

    LICENSE  README.md  shellscript  timescale-3dcitydb
    ```
4. Execute this command to install Masa3DB.
    ```
    $ cd masa3db-0.05/shellscript

    $ sudo sh setup_masa3db.sh
    ```
5. The script will ask you to enter a series of parameters. Most of the parameters you can just accept the defaults. Remember the passwords and username you entered here as you will need it later.
    ```{figure} /_static/023setup/setup_parm2.png
    :name: setup_parm2

    The series of parameters to fill, in pay attention to the two parameters as stated below.
    ```
    a. Pay attention to the Service Root URL. If you already have a domain name for your server enter that as the Service Root URL. In this example our domain name is http://chaosbox.princeton.edu.
    <br/><br/>
    b. The other parameter to pay attention to is if you want to allow the public to request for data from your database without the need of a password. If you want to set a password set the parameter to “false”.
    ```{figure} /_static/023setup/setup_parm.png
    :name: setup_parm

    Two parameters to pay attention.
    ```
    c. If the installation is successful you will see these messages.
    ```{figure} /_static/023setup/setup_success.png
    :name: setup_success

    A successful setup.
    ```
6. We will check if the database has been successfully installed. Type in this command.
    ```
    $ sudo docker ps
    ```
    a. One container is running the postgresql database (container name: spatempdb) and the other is running the FROST-Server (Sensorthings API server) (container name: frost). All the data is stored in the spatempdb container while the frost container enables the sensorthings api to access the database.
    ```{figure} /_static/023setup/docker_containers.png
    :name: docker_containers

    Two containers will be running spatempdb and frost if you have accepted the default naming of containers.
    ```
7. Go to http://you_public_ip_address:8080/FROST-Server you will be able to see this landing page. This means that your sensorthings API is setup.
    ```{figure} /_static/023setup/sensorthings_landing.png
    :name: sensorthings_landing

    The landing page of the FROST-Server (Sensorthings API).
    ```
    a. Click on the Database Status and Update. You will be prompted to key in your username and password. The default username and passwords are admin. We can change it later.
    <br/><br/>
    b. Once you enter the page click on do update. Once successfully update this message will be shown.
    ```{figure} /_static/023setup/sensorthings_update.png
    :name: sensorthings_update

    Successfully updated the FROST-Server settings.
    ```
8. Congratulation you have successfully installed Masa3DB.

### Increase Paging of FROST-server for Improvement of Performance
1. Increase the value of the maxTop parameter to 10000 in the conf/context.xml file to improve the performance making request.
    ```
    #copy the file out of the container and edit it with nano
    $ sudo docker cp frost:/usr/local/tomcat/webapps/FROST-Server/META-INF/context.xml .
    $ sudo chmod o=rw context.xml
    $ nano context.xml

    # after making the edit and saving it change the write permission back to its original
    $ sudo chmod o=rw context.xml
    $ sudo docker cp context.xml frost:/usr/local/tomcat/webapps/FROST-Server/META-INF/context.xml
    ```

### Uninstall Yun2Infinity
1. Execute this command to uninstall Masa3DB.
    ```
    !!!This will remove the database with all its data!!!
    ```
    ```
    $ cd masa3db-0.02/shellscript

    $ sudo sh rmv_masa3db.sh
    ```
    
<del>Non Docker Installation (Not Maintained and Not Recommended)<del>
1. <del>Install PostgreSQL 12 with PostGIS.<del>
2. <del>Install 3DCityDB.<del>
3. <del>Install the FROST server for Sensorthings API<del>
4. <del>Install [Tomcat](https://tomcat.apache.org/download-90.cgi)<del>
5. <del>Install the [FROST-Server](https://github.com/FraunhoferIOSB/FROST-Server)<del>
6. <del>Installation procedure of FROST-Server can be found [here](https://fraunhoferiosb.github.io/FROST-Server/deployment/postgresql.html ).<del>

    <del>a. Put the ware file in the webapp folder<del>

7. <del>If you create a new schema remember to add the new schema to the search_path with this command.<del>
    ```
    alter database chaos_sim set search_path to sensorthings,citydb,citydb_pkg,“$user”,public;
    ```
8. <del>Set authentication according to this [instructions](https://fraunhoferiosb.github.io/FROST-Server/settings/auth.html).<del>

## Install nginx
- A good tutorial on configuring nginx as web server [here](https://realpython.com/django-nginx-gunicorn/).
- Configure your nginx to serve applications with subdomaims [here](https://stackoverflow.com/questions/9905378/nginx-subdomain-configuration)
- How to run grafana behind a reverse proxy [here](https://grafana.com/tutorials/run-grafana-behind-a-proxy/)

1. Install nginx following [these instructions](https://nginx.org/en/linux_packages.html#Ubuntu)

2. Configure the grafana.ini file in the grafana docker container following [these instructions](https://grafana.com/tutorials/run-grafana-behind-a-proxy/).

3. Configure the config file of the nginx server (/etc/nginx/conf.d/default.config).
    ```
    map $http_upgrade $connection_upgrade {
      default upgrade;
      '' close;
    }

    upstream grafana {
      server localhost:3000;
    }

    server {
        listen       80;
        server_name  localhost;
        root /usr/share/nginx/www;
        index index.html index.htm;
        #access_log  /var/log/nginx/host.access.log  main;
        location /frost {
            #root   /usr/share/nginx/html;
            #index  index.html index.htm;
    	proxy_pass		http://localhost:8080/FROST-Server;
    	proxy_set_header	HOST $host;
        }
        
        location /grafana {
    	rewrite  ^/grafana/(.*)  /$1 break;
    	proxy_set_header Host $http_host;
    	proxy_pass http://localhost:3000;
        }
        
        # Proxy Grafana Live WebSocket connections.
        location /grafana/api/live {
    	rewrite  ^/grafana/(.*)  /$1 break;
    	proxy_http_version 1.1;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection $connection_upgrade;
    	proxy_set_header Host $http_host;
    	proxy_pass http://localhost:3000;
    	} 
    }   
    ```