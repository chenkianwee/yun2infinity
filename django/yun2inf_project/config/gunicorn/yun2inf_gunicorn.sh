#!/bin/bash
export SECRET_KEY='(openssl rand -hex 40)' > /yun2inf_project/.DJANGO_SET_KEY
mkdir -pv /var/log/gunicorn/
mkdir -pv /var/run/gunicorn/
python manage.py collectstatic --noinput
source /yun2inf_project/.DJANGO_SET_KEY
exec gunicorn -c config/gunicorn/prod.py