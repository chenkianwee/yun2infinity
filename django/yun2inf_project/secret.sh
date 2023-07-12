#!/bin/bash
echo "export SECRET_KEY='$(openssl rand -hex 40)'" > .DJANGO_SET_KEY