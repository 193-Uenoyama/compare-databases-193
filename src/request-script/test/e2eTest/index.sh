#!/bin/bash

readonly SLEEP=30

make db-create-sqlite


# ----- mariadb -----
make up-mariadb
sleep $SLEEP
./src/request-script/test/dev_mariadb.bats
make down

# ----- postgresql -----
make up-psql
sleep $SLEEP
./src/request-script/test/dev_psql.bats
make down

# ----- sqlite -----
make up-sqlite
sleep $SLEEP
./src/request-script/test/dev_sqlite.bats
make down


make db-delete
