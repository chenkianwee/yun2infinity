# Building the Yun2Infinity Project with Django and Jupyter-Book
This instructions are based on these online tutorials.
- https://realpython.com/django-nginx-gunicorn/
- https://www.w3schools.com/django/index.php

1. Create a virtual environment and install Django. <a href="https://www.djangoproject.com/download/" target="_blank">Official instructions.</a>
    ```
    pip install Django==4.x.x
    ```
2. Go to the directory you want to locate your Django project and create the Yun2Infinity project.
    ```    
    django-admin startproject yun2inf_project
    ```
3. Go to the directory you want to locate your Django app and create the yun2inf_book.
    ```
    py manage.py startapp yun2inf_book
    ```
4. In the yun2inf_book directory create a folder call static.

5. Build a jupyterbook following these <a href="https://chenkianwee.github.io/cheatsheet/docs/013pubbk.html" target="_blank">tutorial.</a> This book interface will serve as the webpage for your yun2inf project. Make all necessary changes to the book to describe your app.

6. Copy and paste all the files in the _build folder into the yun2inf_book/static/ folder

7. In the yun2inf_book directory create a folder call templates. In the templates folder create a file call 'index.html' and paste the following codes.
    ```
    {% load static %}
    <meta http-equiv="Refresh" content="0; url={% static 'yun2inf_book/html/index.html' %}" />
    ```
8. Go to yun2inf_book/views.py and input these codes.
    ```
    from django.shortcuts import render
    
    def book(request):
        return render(request, 'index.html')
    ```
9. Go to yun2inf_book/urls.py and input these codes.
    ```
    from django.urls import path
    from . import views

    urlpatterns = [
        path('', views.book, name='book'),
    ]
    ```
10. Go to yun2inf_project/urls.py and input these codes.
    ```
    from django.contrib import admin
    from django.urls import include, path

    urlpatterns = [
        path('', include('yun2inf_book.urls')),
        path("admin/", admin.site.urls),
    ]
    ```
11. Go to yun2inf_project/settings.py and add the yun2inf_book app.
    ```
    INSTALLED_APPS = [
        "django.contrib.admin",
        "django.contrib.auth",
        "django.contrib.contenttypes",
        "django.contrib.sessions",
        "django.contrib.messages",
        "django.contrib.staticfiles",
        "yun2inf_book"
    ]
    ```
12. Then run this command.
    ```
    python manage.py migrate
    ```
    
13. Configure the static file settings in the yun2inf_project/settings.py. Set the static root.
    - https://docs.djangoproject.com/en/4.2/howto/static-files/
    - https://docs.djangoproject.com/en/4.2/howto/static-files/deployment/
    ```
    STATIC_ROOT = "/var/www/yun2inf/static/"
    ```
    - run this command to collect all the static files into one folder
        ```
        python manage.py collectstatic
        ```

14. Run the server and see the result.
    ```
    python manage.py runserver
    ```
15. Remove the secret key from Django settings.py.
    ```
    SECRET_KEY = "django-insecure-o6w@a46mx..."  # Remove this line
    ```
    - replace it with these codes.
        ```
        try:
            SECRET_KEY = os.environ["SECRET_KEY"]
        except KeyError as e:
            raise RuntimeError("Could not find a SECRET_KEY in environment") from e
        ```
16. Set your key to the environment with OpenSSL.
    ```
    echo "export SECRET_KEY='$(openssl rand -hex 40)'" > .DJANGO_SECRET_KEY
    source .DJANGO_SECRET_KEY
    ```
    
## Serve your Django app with Gunicorn
1. Install gunicorn.
    ```
    pip install gunicorn==20.1.0
    ```

1. Create a **config/gunicorn/dev.py** file in the project in the following structure
    ```
    - yun2inf_project
        - config
            - gunicorn
                - dev.py
        - yun2inf_book
        - yun2inf_project
        - db.sqlite3
        - manage.py
    ```
2. Cut and paste these codes into the dev.py file.
    ```
    """Gunicorn *development* config file"""

    # Django WSGI application path in pattern MODULE_NAME:VARIABLE_NAME
    wsgi_app = "yun2inf_project.wsgi:application"
    # The granularity of Error log outputs
    loglevel = "debug"
    # The number of worker processes for handling requests
    workers = 2
    # The socket to bind
    bind = "0.0.0.0:8000"
    # Restart workers when code changes (development only!)
    reload = True
    # Write access and error info to /var/log
    accesslog = errorlog = "/var/log/gunicorn/dev.log"
    # Redirect stdout/stderr to log file
    capture_output = True
    # PID file so you can easily fetch process ID
    pidfile = "/var/run/gunicorn/dev.pid"
    # Daemonize the Gunicorn process (detach & enter background)
    daemon = True
    ```
3. Create the log and run file as specified in your config dev.py file. Change the permission to ensure you have access to the files. You can use ls -l path/to/file to get know the owner and group of the file.
    ```
    sudo mkdir -pv /var/log/gunicorn/
    sudo chown -cR owner:group /var/log/gunicorn/
    
    sudo mkdir -pv /var/run/gunicorn/
    sudo chown -cR owner:group /var/run/gunicorn/
    ```
4. Run Gunicorn with this command
    ```
    gunicorn -c config/gunicorn/dev.py
    ```
5. Check on the status with this command.
    ```
    tail -f /var/log/gunicorn/dev.log
    ```
6. To kill gunicorn
    ```
    pkill gunicorn
    ```
7. There will be an issue with serving static file with gunicorn. This will be resolved when a webserver like nginx is used for serving the Django and Gunicorn application.

## Containerize your Django App and Gunicorn
These instructions are based on these online tutorials.
- https://dockerize.io/guides/python-django-guide

1. Create yun2inf_project/config/gunicorn/yun2inf_init.sh 
    ```
    #!/bin/bash
    export SECRET_KEY='(openssl rand -hex 40)' > /code/.DJANGO_SET_KEY
    mkdir -pv /var/log/gunicorn/
    mkdir -pv /var/run/gunicorn/
    
    source /code/.DJANGO_SET_KEY
    # gunicorn -c /code/config/gunicorn/dev.py
    exec gunicorn --log-level=info \
    --workers=2 \
    --bind=0.0.0.0:8000 \
    --access-logfile=/var/log/gunicorn/dev.log \
    --error-logfile=/var/log/gunicorn/dev.log \
    --capture-output \
    --pid=/var/log/gunicorn/dev.pid \
    yun2inf_project.wsgi:application
    ```
    
2. Create a Dockerfile in the yun2inf_project folder.
    ```
    FROM python:3.11.3-alpine

    # Set environment varibles
    ENV PYTHONDONTWRITEBYTECODE 1
    ENV PYTHONUNBUFFERED 1

    RUN apk add --update --no-cache openssl

    RUN mkdir docker-entrypoint-initdb.d
    COPY config/gunicorn/yun2inf_gunicorn.sh docker-entrypoint-initdb.d/yun2inf_gunicorn.sh
    RUN chmod a+x docker-entrypoint-initdb.d/yun2inf_gunicorn.sh

    # Mounts the application code to the image
    COPY . yun2inf_project
    WORKDIR /yun2inf_project

    COPY requirements.txt requirements.txt
    RUN pip install --no-cache-dir -r requirements.txt

    EXPOSE 8000

    ENTRYPOINT ["/bin/sh", "/docker-entrypoint-initdb.d/yun2inf_gunicorn.sh"]
    ```
3. Run this command to build the image. This command will find the Dockerfile in the directory and build the image according to the file. Refer to this [website](https://thenewstack.io/docker-basics-how-to-use-dockerfiles/) for a quick understanding  of the Dockerfile.
    ```
    sudo docker build . -t chenkianwee/yun2inf_django_gunicorn:x.x.x
    ```
4. Run the docker image with the -v command to create a volume that can be used by another nginx container.
    ```
    # to create the network 
    docker network create --driver bridge yun2inf
    ```
    ```
    sudo docker run -d --name yun2inf_project -h yun2inf_project --network "yun2inf" -p 8000:8000 -v y2i:/yun2inf_project/www/static/ chenkianwee/yun2inf:x.x.x
    ```
5. Push the image to your docker hub. Once uploaded, you will be able to pull from the repository.
    ```
    $ sudo docker login
    $ sudo docker push yourName/ImageName:tag 