#!/bin/bash
export SECRET_KEY='(openssl rand -hex 40)' > .DJANGO_SET_KEY
source .DJANGO_SET_KEY