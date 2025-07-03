# Deploy the Stack to a Server

## Configuration on the Server
1. Download and unzip the latest yun2infinity-x.x.x.zip file from https://github.com/chenkianwee/yun2infinity/releases/  
2. Customize your yun2inf_book app by following the instruction in {doc}`../050/054containerize`. 
    - I will make the necessary changes on my local computer, e.g. generate jupyterbook and add in new information etc. 
    - then zip the folder and push it onto my server instance with the scp command
        ```
        scp -i pem.key /local/path/to/the/xyz.zip user@instance_ip_addr:/path/

        remove the -i command if your server do not require a pem.key
        ``` 
    
7. change the yun2inf/shellscript/setup_yun2inf.sh file. Go to the "# CONFIGURE THE REVERSE PROXY OF NGINX" and change the **server name** to your domain name
    ```
    server {
    server_name  .your_domain_name.com;
    listen       80;
    access_log  /var/log/nginx/host.access.log;
    error_log  /var/log/nginx/host.access.log;
    }

    ```
8. change the yun2inf/shellscript/setup_yun2inf.sh file. Go to the "# CONFIGURE THE REVERSE PROXY OF NGINX" and change the **proxy_redirect** from "http://localhost" to your domain name. Based on this post https://github.com/FraunhoferIOSB/FROST-Server/issues/235
    ```
    location /frost/ {
	proxy_pass		    http://$CONTAINERNAME2:8080/FROST-Server/;
	proxy_redirect      http://$CONTAINERNAME2:8080 http://localhost;
    proxy_read_timeout  240;

    proxy_set_header   Host \$host;
    }
    ```
9. change the yun2inf/grafana/defaults.ini **domain** to your domain name
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
10. change the yun2inf/django/yun2inf_project/yun2inf_project/settings.py and input your domain into the allowed host variable and turn off debg.
    ```
    DEBUG = False
    ALLOWED_HOSTS = [".your_domain_name.com"]
    ```

11. On your server install docker and build the new image. After you have build the new docker image for yun2inf. Make the appropriate changes in the 'setup_yun2inf.sh'.
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
12. cd to the shellscript directory
    ```
    cd shellscript
    ```
13. execute the setup_yun2inf.sh and follow the instructions from the prompt.
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
5. do a renew dry run to make sure renewal will work.
    ```
    certbot renew --dry-run
    ```
6. uncomment this line in the /etc/nginx/conf.d/nginx.conf file.
    ```
    server_tokens   off;
    ```
7. uncomment these two lines in each location block in the /etc/nginx/conf.d/nginx.conf file.
    ```
    proxy_set_header      X-Forwarded-Proto $scheme;
    proxy_set_header      X-Forwarded-For $proxy_add_x_forwarded_for;
    ```
8. add more security to the /etc/nginx/conf.d/nginx.conf file by including the following commands in both the http and https server block (https://serverfault.com/questions/874936/adding-hsts-to-nginx-config).
    - make changes to the add_header Strict-Transport-Security "max-age=300;" always; increase the max-age=31536000 (a year) in the /etc/nginx/security_header.conf as you feel more confident everything is working.
    ```
    server {
    
        include /etc/nginx/security_header.conf;
        
        .... other stuff in the server block ....
    }
    ```

## Troubleshooting
- if yun2inf_project container keeps giving you error e.g. internal server error
- go into the docker container and check the gunicorn /var/log/gunicorn/error.log and figure out the error

## Setting up fail2ban and nginx-limit-req module to prevent DDOS attacks
- Stack Overflow
    - https://serverfault.com/questions/1063352/ec2-relatively-small-network-out-spikes-cause-100-cpu-usage

- fail2ban
    - https://sysopstechnix.com/protect-web-servers-from-ddos-attacks-using-fail2ban/
    - https://www.the-lazy-dev.com/en/install-fail2ban-with-docker/
    - https://seifer.guru/2021/01/2021-01-fail2ban-with-nginx-in-container/
    
1. uncomment these lines from the nginx.conf file. They at the top of the file and in the server block.
    ```
    limit_req_zone $binary_remote_addr zone=myzone:20m rate=5r/s;
    
    limit_req zone=myzone burst=5 nodelay;
    ``` 
2. Install fail2ban
    ```
    sudo apt install fail2ban
    ```
3. copy /etc/fail2ban/jail.conf and create a new file jail.local
    ```
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local 
    ``` 
4. edit /etc/fail2ban/jail.local , look for the the [nginx-limit-req] block and enter the following
    ```
    enabled = true
	filter = nginx-limit-req
	action = iptables-multiport[name=ReqLimit, port="http,https", protocol=tcp]
	logpath = /var/log/nginx/host.error.log
	findtime = 300
	maxretry = 3
	bantime = 3600
    ```
    
5. configure the banaction of fail2ban for a docker setup. Run the following command to make the ban works for a docker setup.
    ```
    cd /etc/fail2ban/action.d
    
    sudo cp iptables-common.conf iptables-common-forward.conf
    sudo sed -i 's/INPUT/FORWARD/g' iptables-common-forward.conf

    sudo cp iptables-multiport.conf iptables-multiport-forward.conf
    sudo sed -i 's/iptables-common.conf/iptables-common-forward.conf/g' iptables-multiport-forward.conf
    ```
6. reconfigure jail.local to use our new banaction
    ```
    [nginx-limit-req]
    ...
    action = iptables-multiport-forward[name=ReqLimit, port="http,https", protocol=tcp]
    ...
    ```
5. restart the fail2ban system and check that its running with these commands.
    ```
    sudo systemctl restart fail2ban.service
    
    sudo systemctl status fail2ban.service
    ```

6. check ip banned list with this command.
    ```
    sudo fail2ban-client status nginx-limit-req
    ```
7. unban ip with this command
    ```
    sudo fail2ban-client set nginx-limit-req unbanip 10.xx.15x.12x
    ```

## Deploy to AWS server with a wix subdomain
- A good tutorial on configuring nginx as web server (https://realpython.com/django-nginx-gunicorn/).
- resizing your AWS as workload changes, from experience you at least need a **t2.small** instance.
    - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-resize.html
    - https://stackoverflow.com/questions/69741113/increase-the-root-volume-hard-disk-of-ec2-linux-running-instance-without-resta
    - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html

1. configure wix subdomain
    - https://support.wix.com/en/article/connecting-a-subdomain-to-a-site-in-your-wix-account#connecting-a-subdomain-to-your-wix-site
    - https://support.wix.com/en/article/connecting-a-subdomain-to-an-external-resource
    - https://support.wix.com/en/article/connecting-a-wix-domain-to-an-external-site
    - https://support.wix.com/article/request-third-party-ssl-certificates
    
2. Setup your account for an ec2 virtual machine. Follow instructions [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html).
3. Connect to your AWS instance. Follow instructions [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html)
4. Associate an Elastic IP for the instance.

### Setting up route53 when website goes down
- https://eladnava.com/monitoring-http-health-email-alerts-aws/

1. It is important to setup healthcheck so that you are informed immediately once the website is down.
