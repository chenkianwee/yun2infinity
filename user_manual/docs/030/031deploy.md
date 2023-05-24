# Deploy to AWS server
- A good tutorial on configuring nginx as web server https://realpython.com/django-nginx-gunicorn/ .
- wix subdomain
    - https://support.wix.com/en/article/connecting-a-subdomain-to-a-site-in-your-wix-account#connecting-a-subdomain-to-your-wix-site
    - https://support.wix.com/en/article/connecting-a-subdomain-to-an-external-resource
    - https://support.wix.com/en/article/connecting-a-wix-domain-to-an-external-site
    - https://support.wix.com/article/request-third-party-ssl-certificates
    
1. Setup your account for an ec2 virtual machine. Follow instructions [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html).
2. Connect to your AWS instance. Follow instructions [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html)
3. Associate an Elastic IP for the instance.
4. Download and unzip the yun2inf.zip file 
5. change the yun2inf/shellscript/setup_yun2inf.sh file. Go to the "# CONFIGURE THE REVERSE PROXY OF NGINX" and change the server name to your domain name
    ```
    server {
    server_name  .your_domain_name.com;
    listen       80;
    access_log  /var/log/nginx/host.access.log;
    error_log  /var/log/nginx/host.access.log;
    }

    ```
6. change the yun2inf/shellscript/setup_yun2inf.sh file. Go to the "# CONFIGURE THE REVERSE PROXY OF NGINX" and change the frost-server related settings. Based on this post https://github.com/FraunhoferIOSB/FROST-Server/issues/235
    ```
    location /frost/ {
	proxy_pass		       http://$CONTAINERNAME2:8080/FROST-Server;
	proxy_redirect         http://$CONTAINERNAME2:8080 http://your_domain_name.com;
	proxy_read_timeout     240;
	   
	proxy_set_header       HOST \$host;
    }
    ```
7. change the yun2inf/grafana/defaults.ini domain to your domain name
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
8. change the yun2inf/django/settings.py and input your domain into the allowed host variable and turn off debg.
    ```
    DEBUG = False
    ALLOWED_HOSTS = [".your_domain_name.com"]
    ```

9. cd to the shellscript directory
    ```
    cd shellscript
    ```
10. execute the setup_yun2inf.sh and follow the instructions from the prompt.
    ```
    sudo sh setup_yun2inf.sh
    ```
## Accessing your site over HTTPS with SSL/TLS certificate
- ssl certificate
    - https://cheapsslsecurity.com/blog/ssl-certificates-for-subdomains/

1. Install certbot https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
