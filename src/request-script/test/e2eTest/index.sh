#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/waitPossibleToCommunication.sh

make db-create-sqlite

# ----- mariadb -----
make up-mariadb
waitPossibleToCommunication
$SDP_ROOT/src/request-script/test/e2eTest/dev_mariadb.bats
make down

# ----- postgresql -----
make up-psql
waitPossibleToCommunication
$SDP_ROOT/src/request-script/test/e2eTest/dev_psql.bats
make down

# ----- sqlite -----
make up-sqlite
waitPossibleToCommunication
$SDP_ROOT/src/request-script/test/e2eTest/dev_sqlite.bats
make down


make db-delete
