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
    - https://realpython.com/django-nginx-gunicorn/#turning-on-https
    - https://stackoverflow.com/questions/45733444/nginx-docker-forwarding-port-80-443-to-3000
    - https://cheapsslsecurity.com/blog/ssl-certificates-for-subdomains/

- certbot
    - https://geko.cloud/en/nginx-letsencrypt-certbot-docker-alpine/
    - https://certbot.eff.org/instructions?ws=nginx&os=debianbuster&tab=standard
    - https://eff-certbot.readthedocs.io/en/stable/using.html#setting-up-automated-renewal

1. Install certbot in your nginx container. Bash into your container
    ```
    sudo docker exec -it $nginx_container_name(default=yun2inf_nginx) sh
    ```
2. In the container install certbot with this command.
    ```
    apk add certbot certbot-nginx
    ```
3. Apply for the ssl certificate with this command.
    - for subdomains you do not need to specify www.subdomain.domain.com, you can just put subdomain.domain.com
    ```
    certbot --nginx
    ```
4. Configure a crontab for autorenewal with this command 
    ```
    crontab -e
    
    0   12  *   *   *   certbot renew --quiet
    ```
5. uncomment this line in the /etc/nginx/conf.d/nginx.conf file.
    ```
    server_tokens   off;
    ```
5. uncomment these two lines in each location block in the /etc/nginx/conf.d/nginx.conf file.
    ```
    proxy_set_header      X-Forwarded-Proto $scheme;
    proxy_set_header      X-Forwarded-For $proxy_add_x_forwarded_for;
    ```
6. add more security to the /etc/nginx/conf.d/nginx.conf file by including the following commands in both the http and https server block (https://serverfault.com/questions/874936/adding-hsts-to-nginx-config).
    - make changes to the add_header Strict-Transport-Security "max-age=300;" always; increase the max-age=31536000 (a year) in the /etc/nginx/security_header.conf as you feel more confident everything is working.
    ```
    server {
    
        include /etc/nginx/security_header.conf
        
        .... other stuff in the server block ....
    }
    ```
7. backup the certificates. Install zip.
    ```
    apk add zip
    
    cd /etc/letsencrypt
    
    zip -r letsencrypt.zip letsencrypt/
    ```

8. Exit the container and copy the zipfile and config file out. Back it up.
    ```
    sudo docker cp yun2inf_nginx:/etc/letsencrypt.zip .
    
    sudo docker cp yun2inf_nginx:/etc/nginx/conf.d/nginx.conf .
    ```