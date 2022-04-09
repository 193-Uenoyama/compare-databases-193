#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh

function deleteUser() {
  loop_count=${1:-1}
  users_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/read`

  will_delete_userId=( `echo $users_response | jq '.readed_users[].userId' | xargs` )

  will_delete_userId=( `cutArrayToRequireNumber $loop_count "${will_delete_userId[*]}"` )
  for userId in ${will_delete_userId[*]}
  do
    curl -s -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'"}' localhost:8000/user/delete
  done
}
