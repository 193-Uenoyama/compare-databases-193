#!/bin/bash

readonly SLEEP=30

make db-create-sqlite


# ----- mariadb -----
make up-mariadb
sleep $SLEEP
$SDP_ROOT/src/request-script/test/e2eTest/dev_mariadb.bats
make down

# ----- postgresql -----
make up-psql
sleep $SLEEP
$SDP_ROOT/src/request-script/test/e2eTest/dev_psql.bats
make down

# ----- sqlite -----
make up-sqlite
sleep $SLEEP
$SDP_ROOT/src/request-script/test/e2eTest/dev_sqlite.bats
make down


make db-delete
