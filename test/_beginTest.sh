#!/bin/bash

readonly SLEEP=25


# ----- mariadb -----
make up-mariadb

sleep $SLEEP
./test/dev_mariadb.bats

make down
make db-delete


# ----- mariadb -----
make up-psql

sleep $SLEEP
./test/dev_psql.bats

make down
make db-delete


# ----- sqlite -----
make db-create-sqlite
make up-sqlite

sleep $SLEEP
./test/dev_sqlite.bats

make down
make db-delete
