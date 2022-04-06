#!src/request-script/test/testModules/bats-core/bin/bats
source $SDP_ROOT/src/request-script/src/requestModules/Follows/followUser.sh
source $SDP_ROOT/src/request-script/src/requestModules/Follows/leaveUser.sh
source $SDP_ROOT/src/request-script/src/requestModules/Follows/showFollowed.sh
source $SDP_ROOT/src/request-script/src/requestModules/Follows/showFollower.sh

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


# *** followUser test ******************
@test "followUser: Should write log when request followUser" {
  followUser 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 8 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[4]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,Follows,[0-9]*$'
  run echo ${logfile_content[6]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,Follows,[0-9]*$'
  run echo ${logfile_content[7]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
@test "followUser: if loop_count argument exceed the limit(number of userId and userId combinations) throw error" {
  array_userId=( `curl -s localhost:8000/user/read | jq '.readed_users[].userId' | xargs` )
  limit=$(( ${#array_userId[*]} * ${#array_userId[*]} ))

  run followUser $(( $limit + 1 ))

  assert_output "loop_count must be specified smaller then the combination of userId and userId."
}


# *** showFollowed test ****************
@test "showFollowed: Should write log when request showFollowed" {
  showFollowed 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 8 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[2]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[6]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[7]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}
# *** showFollower test ****************
@test "showFollower: Should write log when request showFollower" {
  showFollower 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`
  logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name | xargs` )
  assert [ ${#logfile_content[*]} -eq 8 ]

  run echo ${logfile_content[0]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[2]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[6]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
  run echo ${logfile_content[7]}
  assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
}


# *** leaveUser test *******************
@test "leaveUser: Should write log when request leaveUser" {
  leaveUser 3

  logfile_name=`ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/`

  # TODO
  cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name > /tmp/mylog
  run cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$logfile_name
  assert_output -e '.*Read.*Read.*Delete.*Delete.*Delete.*'
  assert_output -e '.*Users.*Users.*Follows.*Follows.*Follows.*'
  refute_output -e '.*Read.*Read.*Delete.*Delete.*Delete.*Delete'
}
