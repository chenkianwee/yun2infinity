# Deploying Y2I to a RaspberryPi on a local network 

1. [Make sure ssh is is enabled on your RaspberryPi](https://www.raspberrypi.com/documentation/computers/remote-access.html#enable-the-ssh-server). [Then ssh into your RaspberryPi](https://www.raspberrypi.com/documentation/computers/remote-access.html#connect-to-an-ssh-server) with the following command.

    ```
    ssh <username>@<hostname>.local
    ```

2. [Download and unzip Yun2Infinity](01installation.md#download-and-unzip-yun2infinity). Once dowloaded and unzipped return to this tutorial.

3. change the django/yun2inf_project/yun2inf_project/settings.py and input your domain into the allowed host variable and turn off debg.
    ```
    DEBUG = False
    ALLOWED_HOSTS = [".<hostname>.local"]
    ```
4. Go to the directory django/yun2inf_project and build the image with the following command.
    ```
    sudo docker build . -t chenkianwee/yun2inf:<x.x.x>
    ```

5. On your server install docker and build the new image. After you have build the new docker image for yun2inf. Make the appropriate changes in the 'setup_yun2inf.sh'.
    ```
    echo '------------------------------------------------------'
    echo 'Trying to start django container now ...'
    echo '------------------------------------------------------'
    docker run -d --name "$CONTAINERNAME4"\
        -h "$CONTAINERNAME4"\
    	--network "yun2inf"\
        -p $YPORT:8000\
        -v "y2i:/yun2inf_project/www/static/"\
        chenkianwee/yun2inf:0.0.1 !!! change this image name to the new image you have build !!! 
    ``` 

6. [Build the jupyterbook](01installation.md#build-the-jupyter-book-for-the-main-page). Once build return to this tutorial.

7. [Execute the setup script](01installation.md#setup-yun2infinity).

    a. [Install TimscaleDB for improve database performance](01installation.md#install-timescaledb-to-improve-database-performance)

8. You can now excess Y2I by typing in the following in your browser.
    ```
    <hostname>.local
    ```