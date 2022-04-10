#!src/request-script/test/testModules/bats-core/bin/bats
source $SDP_ROOT/src/request-script/test/testModules/deleteExistedLogFile.sh
source $SDP_ROOT/src/request-script/src/requestModules/BelongsToGroup/belongsToGroup.sh
source $SDP_ROOT/src/request-script/src/requestModules/BelongsToGroup/leaveGroup.sh
source $SDP_ROOT/src/request-script/src/requestModules/BelongsToGroup/showMembers.sh

setup() {
  load $SDP_ROOT/src/request-script/test/testModules/bats-assert/load.bash
  load $SDP_ROOT/src/request-script/test/testModules/bats-support/load.bash
  deleteExistedLogFile
}

teardown() {
  deleteExistedLogFile
}


# *** belongsToGroup test **************
@test "belongsToGroup: Should write log when request belongsToGroup" {
  belongsToGroup 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 6 ]

  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,GroupMembers,[0-9]*$'
  run echo ${logfile_content[5]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}

@test "belongsToGroup: if loop_count argument exceed the limit(number of userId and groupId combinations) throw error" {
  users_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/read`
  groups_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/read`

  users_id=( `echo $users_response | jq '.readed_users[].userId' | xargs` )
  groups_id=( `echo $groups_response | jq '.readed_groups[].groupId' | xargs` )
  limit=$(( ${#users_id[*]} * ${#groups_id[*]} ))

  run belongsToGroup $(( $limit + 1 ))
  assert_output "loop_count must be specified smaller then the combination of userId and groupId."
}


# *** showMembers test *****************
@test "showMembers: Should write log when request showMembers" {
  showMembers 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 6 ]

  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Groups,[0-9]*$'
  run echo ${logfile_content[5]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** leaveGroup test ******************
@test "leaveGroup: Should write log when request leaveGroup" {
  leaveGroup 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`

  run cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name
  assert_output -e '.*Delete.*Delete.*Delete.*'
  assert_output -e '.*GroupMembers.*GroupMembers.*GroupMembers.*'

  refute_output -e '.*Read.*'
  refute_output -e '.*Groups.*'
  refute_output -e '.*Delete.*Delete.*Delete.*Delete'
}
@test "leaveGroup: when loop_count greater then GroupMembers table rows return error message" {
  groupMembers_rows_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/member/read/rows`
  limit=`echo $groupMembers_rows_response | jq '.group_members_count'`

  run leaveGroup $(( $limit + 1 ))
  assert_output "loop_count must be specified smaller then the GroupMembers table rows."
}
