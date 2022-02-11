#!/bin/bash

readonly SLEEP=30
make db-create-sqlite
./test/modules/installChromedriver.sh
chromedriver &


# ----- mariadb -----
make up-mariadb
sleep $SLEEP
./test/dev_mariadb.bats
make down

# ----- mariadb -----
make up-psql
sleep $SLEEP
./test/dev_psql.bats
make down

# ----- sqlite -----
make up-sqlite
sleep $SLEEP
./test/dev_sqlite.bats
make down


driverJob=`echo jobs | grep chromedriver | sed -E 's/\[([0-9]*)\].*/\1/g'`
kill %$driverJob
make db-delete
