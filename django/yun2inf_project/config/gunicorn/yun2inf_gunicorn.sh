#!/bin/bash
export SECRET_KEY='(openssl rand -hex 40)' > /yun2inf_project/.DJANGO_SET_KEY
mkdir -pv /var/log/gunicorn/
mkdir -pv /var/run/gunicorn/
python manage.py collectstatic
source /yun2inf_project/.DJANGO_SET_KEY
exec gunicorn -c config/gunicorn/prod.py

#exec gunicorn --log-level=info \
#--workers=2 \
#--bind=0.0.0.0:8000 \
#--access-logfile=/var/log/gunicorn/dev.log \
#--error-logfile=/var/log/gunicorn/dev.log \
#--capture-output \
#--pid=/var/log/gunicorn/dev.pid \
#yun2inf_project.wsgi:application
