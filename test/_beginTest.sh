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


rm -rf ./logs/*.log
make db-delete
