# Deploy to AWS server with a wix subdomain
- A good tutorial on configuring nginx as web server https://realpython.com/django-nginx-gunicorn/ .
1. configure wix subdomain
    - https://support.wix.com/en/article/connecting-a-subdomain-to-a-site-in-your-wix-account#connecting-a-subdomain-to-your-wix-site
    - https://support.wix.com/en/article/connecting-a-subdomain-to-an-external-resource
    - https://support.wix.com/en/article/connecting-a-wix-domain-to-an-external-site
    - https://support.wix.com/article/request-third-party-ssl-certificates
    
2. Setup your account for an ec2 virtual machine. Follow instructions [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html).
3. Connect to your AWS instance. Follow instructions [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html)
4. Associate an Elastic IP for the instance.
5. Download and unzip the latest yun2infinity-x.x.x.zip file from https://github.com/chenkianwee/yun2infinity/releases/  
6. Customize your yun2inf_book app by following the instruction in {doc}`../050/054containerize`. 
    - I will make the necessary changes on my local computer, e.g. generate jupyterbook and add in new information etc. 
    - then zip the folder and push it onto my AWS instance with the scp command
        ```
        scp -i pem,key user@instance_ip_add
        ``` 
    - On the AWS install docker and build the new image. After you have build the new docker image for yun2inf. Make the appropriate changes in the 'setup_yun2inf.sh'.
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
6. change the yun2inf/shellscript/setup_yun2inf.sh file. Go to the "# CONFIGURE THE REVERSE PROXY OF NGINX" and change the server name to your domain name
    ```
    server {
    server_name  .your_domain_name.com;
    listen       80;
    access_log  /var/log/nginx/host.access.log;
    error_log  /var/log/nginx/host.access.log;
    }

    ```
7. change the yun2inf/shellscript/setup_yun2inf.sh file. Go to the "# CONFIGURE THE REVERSE PROXY OF NGINX" and change the proxy_redirect to your domain name. Based on this post https://github.com/FraunhoferIOSB/FROST-Server/issues/235
    ```
    location /frost/ {
	proxy_pass		    http://$CONTAINERNAME2:8080/FROST-Server/;
	proxy_redirect      http://$CONTAINERNAME2:8080 http://localhost;
    proxy_read_timeout  240;

    proxy_set_header   Host \$host;
    }
    ```
8. change the yun2inf/grafana/defaults.ini domain to your domain name
    ```
    [server]
    # Protocol (http, https, h2, socket)
    protocol = http

    # The ip address to bind to, empty will bind to all interfaces
    http_addr =

    # The http port to use
    http_port = 3000

    # The public facing domain name used to access grafana from a browser
    domain = your_domain_name.com

    # Redirect to correct domain if host header does not match domain
    # Prevents DNS rebinding attacks
    enforce_domain = false
    ```
9. change the yun2inf/django/settings.py and input your domain into the allowed host variable and turn off debg.
    ```
    DEBUG = False
    ALLOWED_HOSTS = [".your_domain_name.com"]
    ```

10. cd to the shellscript directory
    ```
    cd shellscript
    ```
11. execute the setup_yun2inf.sh and follow the instructions from the prompt.
    ```
    sudo sh setup_yun2inf.sh
    ```
## Accessing your site over HTTPS with SSL/TLS certificate
- ssl certificate
    - https://cheapsslsecurity.com/blog/ssl-certificates-for-subdomains/

1. Install certbot https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
