#!src/request-script/test/testModules/bats-core/bin/bats
source $SDP_ROOT/src/request-script/src/requestModules/BelongsToGroup/belongsToGroup.sh
source $SDP_ROOT/src/request-script/src/requestModules/BelongsToGroup/leaveGroup.sh
source $SDP_ROOT/src/request-script/src/requestModules/BelongsToGroup/showMembers.sh

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


# *** belongsToGroup test **************
@test "belongsToGroup: Should write log when request belongsToGroup" {
  belongsToGroup 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 10 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[2]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Groups,[0-9]*$'
  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,GroupMembers,[0-9]*$'
  run echo ${logfile_content[5]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
  run echo ${logfile_content[8]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,GroupMembers,[0-9]*$'
}

@test "belongsToGroup: if loop_count argument exceed the limit(number of userId and groupId combinations) throw error" {
  array_userId=( `curl -s localhost:8000/user/read | jq '.readed_users[].userId' | xargs` )
  array_groupId=( `curl -s localhost:8000/group/read | jq '.readed_groups[].groupId' | xargs` )
  limit=$(( ${#array_userId[*]} * ${#array_groupId[*]} ))

  run belongsToGroup $(( $limit + 4 ))

  assert_output "loop_count must be specified smaller then the combination of userId and groupId."
}


# *** showMembers test *****************
@test "showMembers: Should write log when request showMembers" {
  showMembers 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 8 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Groups,[0-9]*$'
  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Groups,[0-9]*$'
  run echo ${logfile_content[6]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Groups,[0-9]*$'
  run echo ${logfile_content[7]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** leaveGroup test ******************
@test "leaveGroup: Should write log when request leaveGroup" {
  leaveGroup 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`

  cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name > /tmp/mylog
  run cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name
  assert_output -e '.*Read.*Delete.*Delete.*Delete.*'
}
