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

1. Go to the terminal on your Ubuntu machine. Run this command to download the yun2infinity package.
    ```
    $ curl -L https://github.com/chenkianwee/yun2infinity/archive/xxxx.zip > yun2infinity-xxxx.zip
    ```
    a. If curl is not installed on your machine. Install it with this command.
    ```
    $ sudo apt-get install curl
    ```
2. Unzip the file with this command.
    ```
    $ unzip yun2infinity-xxxx.zip
    ```
    a. If unzip is not installed on your machine. Install it with this command.
    ```
    $ sudo apt-get install unzip
    ```
3. Go into the yun2infinity-xxxx folder with this command. You will be able to see the following folders and files.
    ```
    $ cd yun2infinity-xxxx
    ```
4. Execute this command to install yun2infinity.
    ```
    $ cd masa3db-xxx/shellscript

    $ sudo sh setup_yun2inf.sh
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
6. We will check if the database has been successfully installed. Type in this command. You should see 5 containers running.
    ```
    $ sudo docker ps
    ```
### Check if FROST-Server is successfully configured
1. Go to http://your_ip_address/frost you will be able to see this landing page. This means that your sensorthings API is setup.
    ```{figure} /_static/023setup/sensorthings_landing.png
    :width: 80%
    :name: sensorthings_landing

    The landing page of the FROST-Server (Sensorthings API).
    ```
    a. Click on the Database Status and Update. You will be prompted to key in your username and password. The default username and passwords are admin. We can change it later.
    <br/><br/>
    b. Once you enter the page click on do update. Once successfully update this message will be shown.
    ```{figure} /_static/023setup/sensorthings_update.png
    :width: 80%
    :name: sensorthings_update
    

    Successfully updated the FROST-Server settings.
    ```
2. Congratulation you have successfully installed yun2infinity.

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