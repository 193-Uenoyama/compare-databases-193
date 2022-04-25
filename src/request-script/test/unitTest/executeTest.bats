#!src/request-script/test/testModules/bats-core/bin/bats

source $SDP_ROOT/src/request-script/src/requestModules/waitPossibleToCommunication.sh

setup() {
  load $SDP_ROOT/src/request-script/test/testModules/bats-assert/load.bash
  load $SDP_ROOT/src/request-script/test/testModules/bats-support/load.bash
}

# loadRequests
@test "loadRequests: When execute 'loadRequests' became executable to 'request scripts'" {
  make db-create-sqlite
  make up-sqlite
  make serv-migrate
  source $SDP_ROOT/src/request-script/test/testModules/deleteExistedLogFile.sh
  source $SDP_ROOT/src/request-script/src/requestModules/loadRequests.sh
  deleteExistedLogFile

  createUser 
  createGroup 
  belongsToGroup 
  followUser 

  readUser 
  readGroup 
  showMembers
  showFollowed
  showFollower

  updateUser 
  updateGroup 

  leaveGroup 
  leaveUser 
  deleteUser 
  deleteGroup 

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name > /tmp/mylog
  assert [ ${#logfile_content[*]} -eq 30 ]
  deleteExistedLogFile
  make down
  make db-delete
}

# waitPossibleToCommunication -> waitPossibleToCommunication
@test "waitPossibleToCommunication: Logs must be output when communication becomes possible." {
  make up-mariadb
  run waitPossibleToCommunication
  assert_output -e "Possible to communication done."
  make down
}

# waitPossibleToCommunication -> waitPossibleToCommunication
@test "waitPossibleToCommunication: If communication is not possible, timeout must be set" {
  make up-mariadb
  docker stop compare-databases-193_db
  run waitPossibleToCommunication
  assert_output -e ".*timeout.*"
}
