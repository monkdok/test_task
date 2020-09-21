#!/usr/bin/env sh

set -e

python3 manage.py collectstatic --noinput

uwsgi --socket : 8000 --master --enable-threads --moudle app.wsgi

