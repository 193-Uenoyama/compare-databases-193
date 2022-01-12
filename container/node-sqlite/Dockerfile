FROM node:17.3

WORKDIR /home/app/perfomance-api

ENV PATH $PATH:/home/app/perfomance-api/node_modules/.bin/

RUN apt update && \
    apt install sqlite3

CMD npm start
