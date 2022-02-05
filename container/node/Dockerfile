FROM node:16-alpine3.14@sha256:d5ff6716e21e03983f8522b6e84f15f50a56e183085553e96d2801fc45dc3c74

WORKDIR /home/response-api

RUN apk update && \
    apk add python3=3.9.5-r2 && \
    rm -rf /var/cache/apk/*
