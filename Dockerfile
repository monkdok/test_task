#
#FROM python:3.8-alpine
#
#ENV PATH="/scripts:${PATH}"
#
#COPY ./requirements.txt /requirements.txt
#RUN apk add --update --no-cache --virtual .tmp gcc libc-dev linux-headers
#RUN pip install -r /requirements.txt
#RUN apk del .tmp
#
#RUN mkdir /app
#COPY . /app/
#WORKDIR /app
#COPY ./scripts /scripts
#
#RUN chmod +x /scripts/*
#
#RUN mkdir -p /vol/web/media
#RUN mkdir -p /vol/web/static
#RUN adduser -D user
#RUN chown -R user:user /vol
#RUN chmod -R 755 /vol/web
#USER user
#
#CMD ["entrypoint.sh"]

# pull official base image
FROM python:3.8.3-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .