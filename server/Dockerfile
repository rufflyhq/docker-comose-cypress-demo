FROM node:12.13

ARG PGHOST
ARG PGUSER
ARG PGDATABASE
ARG PGPASSWORD
ARG PGPORT

ENV SERV_ENV=$SERV_ENV \
  PGHOST=$PGHOST \
  PGUSER=$PGUSER \
  PGDATABASE=$PGDATABASE \
  PGPASSWORD=$PGPASSWORD \
  PGPORT=$PGPORT \
  PORT=3000

COPY package*.json /server/

WORKDIR /server

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["node", "./bin/www"]
