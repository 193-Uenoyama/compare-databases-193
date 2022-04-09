#!src/request-script/test/testModules/bats-core/bin/bats
source $SDP_ROOT/src/request-script/src/requestModules/Groups/createGroup.sh
source $SDP_ROOT/src/request-script/src/requestModules/Groups/readGroup.sh
source $SDP_ROOT/src/request-script/src/requestModules/Groups/updateGroup.sh
source $SDP_ROOT/src/request-script/src/requestModules/Groups/deleteGroup.sh

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

# *** createGroup test ******************
@test "createGroup: Should write log when request createGroup" {
  createGroup

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 2 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,Groups,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "createGroup: createGroup must loop on the numeric value of the first argument" {
  createGroup 5

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 10 ]

  run echo ${logfile_content[8]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,Groups,[0-9]*$'
  run echo ${logfile_content[9]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** readGroup test ********************
@test "readGroup: Should write log when request readGroup" {
  readGroup

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 2 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Groups,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "readGroup: readGroup must loop on the numeric value of the first argument" {
  readGroup 2

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 4 ]

  run echo ${logfile_content[2]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Groups,[0-9]*$'
  run echo ${logfile_content[3]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** updateGroup test ******************
@test "updateGroup: Should write log when request updateGroup" {
  updateGroup

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 2 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Update,Groups,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "updateGroup: updateGroup must loop on the numeric value of the first argument" {
  updateGroup 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 6 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Update,Groups,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** deleteGroup test ******************
@test "deleteGroup: Should write log when request deleteGroup" {
  deleteGroup

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 2 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Delete,Groups,[0-9]*$'
  run echo ${logfile_content[1]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "deleteGroup: deleteGroup must loop on the numeric value of the first argument" {
  deleteGroup 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 6 ]

  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Delete,Groups,[0-9]*$'
  run echo ${logfile_content[5]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "deleteGroup: when loop_count greater then Groups table rows return error message" {
  groups_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/read`
  groups_id=( `echo $groups_response | jq '.readed_groups[].groupId' | xargs` )
  limit=${#groups_id[*]}

  run deleteGroup $(( $limit + 1 ))
  assert_output "loop_count must be specified smaller then the Groups table rows."
}
