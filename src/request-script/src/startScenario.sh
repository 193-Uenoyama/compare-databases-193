#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/extensionManager.sh
source $SDP_ROOT/src/request-script/src/requestModules/waitPossibleToCommunication.sh

scenario=$1
export SDP_SERV_LOG_DIR=`date "+%Y%m%dT%H%M%S"`-`excludeExtension $scenario`

make db-create-sqlite

# ----- mariadb -----
make up-mariadb
waitPossibleToCommunication
make serv-migrate
eval source $SDP_ROOT/src/request-script/src/scenario/`complementExtension $scenario sh`
make down

# ----- postgresql -----
make up-psql
waitPossibleToCommunication
make serv-migrate
eval source $SDP_ROOT/src/request-script/src/scenario/`complementExtension $scenario sh`
make down

# ----- sqlite -----
make up-sqlite
waitPossibleToCommunication
make serv-migrate
eval source $SDP_ROOT/src/request-script/src/scenario/`complementExtension $scenario sh`
make down

