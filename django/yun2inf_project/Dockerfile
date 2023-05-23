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
