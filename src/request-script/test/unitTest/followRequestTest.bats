#!src/request-script/test/testModules/bats-core/bin/bats
source $SDP_ROOT/src/request-script/test/testModules/deleteExistedLogFile.sh
source $SDP_ROOT/src/request-script/src/requestModules/Follows/followUser.sh
source $SDP_ROOT/src/request-script/src/requestModules/Follows/leaveUser.sh
source $SDP_ROOT/src/request-script/src/requestModules/Follows/showFollowed.sh
source $SDP_ROOT/src/request-script/src/requestModules/Follows/showFollower.sh

setup() {
  load $SDP_ROOT/src/request-script/test/testModules/bats-assert/load.bash
  load $SDP_ROOT/src/request-script/test/testModules/bats-support/load.bash
  deleteExistedLogFile
}

teardown() {
  deleteExistedLogFile
}


# *** followUser test ******************
@test "followUser: Should write log when request followUser" {
  followUser 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 6 ]

  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,Follows,[0-9]*$'
  run echo ${logfile_content[5]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "followUser: if loop_count argument exceed the limit(number of userId and userId combinations) throw error" {
  users_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/read`
  users_id=( `echo $users_response | jq '.readed_users[].userId' | xargs` )

  limit=$(( ${#users_id[*]} * ${#users_id[*]} ))

  run followUser $(( $limit + 1 ))

  assert_output "loop_count must be specified smaller then the combination of userId and userId."
}


# *** showFollowed test ****************
@test "showFollowed: Should write log when request showFollowed" {
  showFollowed 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 6 ]

  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[5]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
# *** showFollower test ****************
@test "showFollower: Should write log when request showFollower" {
  showFollower 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 6 ]

  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[5]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** leaveUser test *******************
@test "leaveUser: Should write log when request leaveUser" {
  leaveUser 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`

  run cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name
  assert_output -e '.*Delete.*Delete.*Delete.*'
  assert_output -e '.*Follows.*Follows.*Follows.*'

  refute_output -e '.*Read.*'
  refute_output -e '.*Users.*'
  refute_output -e '.*Delete.*Delete.*Delete.*Delete'
}
@test "leaveUser: when loop_count greater then Follows table rows return error message" {
  follows_rows_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/follow/read/rows`
  limit=`echo $follows_rows_response | jq '.follows_count'`

  run leaveUser $(( $limit + 1 ))
  assert_output "loop_count must be specified smaller then the Follows table rows."
}
