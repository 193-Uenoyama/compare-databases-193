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
