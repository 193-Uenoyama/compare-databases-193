#!src/request-script/test/testModules/bats-core/bin/bats
source $SDP_ROOT/src/request-script/src/requestModules/Users/createUser.sh
source $SDP_ROOT/src/request-script/src/requestModules/Users/readUser.sh
source $SDP_ROOT/src/request-script/src/requestModules/Users/updateUser.sh
source $SDP_ROOT/src/request-script/src/requestModules/Users/deleteUser.sh

setup() {
  load $SDP_ROOT/src/request-script/test/testModules/bats-assert/load.bash
  load $SDP_ROOT/src/request-script/test/testModules/bats-support/load.bash

  existing_files=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  if [ ! $existing_files = "" ] ; then
    rm $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/*
  fi
}

teardown() {
  existing_files=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  if [ ! $existing_files = "" ] ; then
    rm $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/*
  fi
}

# *** createUser test ******************
@test "Should write log when request createUser" {
  createUser

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 2 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,Users,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "createUser must loop on the numeric value of the first argument" {
  createUser 4

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 8 ]

  run echo ${logfile_content[6]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,Users,[0-9]*$'
  run echo ${logfile_content[7]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** readUser test ********************
@test "Should write log when request readUser" {
  readUser

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 2 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "readUser must loop on the numeric value of the first argument" {
  readUser 5

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 10 ]

  run echo ${logfile_content[8]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[9]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** updateUser test ******************
@test "Should write log when request updateUser" {
  updateUser

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 4 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
  run echo ${logfile_content[2]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Update,Users,[0-9]*$'
  run echo ${logfile_content[3]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "updateUser must loop on the numeric value of the first argument" {
  updateUser 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 8 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
  run echo ${logfile_content[6]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Update,Users,[0-9]*$'
  run echo ${logfile_content[7]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** deleteUser test ******************
@test "Should write log when request deleteUser" {
  deleteUser

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 4 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
  run echo ${logfile_content[2]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Delete,Users,[0-9]*$'
  run echo ${logfile_content[3]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "deleteUser must loop on the numeric value of the first argument" {
  deleteUser 2

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 6 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Delete,Users,[0-9]*$'
  run echo ${logfile_content[5]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
