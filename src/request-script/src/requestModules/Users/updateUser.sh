#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh
source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh

function updateUser() {
  loop_count=${1:-1}
  users_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/read`

  will_update_userId=( `echo $users_response | jq '.readed_users[].userId' | xargs` )

  will_update_userId=( `cutArrayToRequireNumber $loop_count "${will_update_userId[*]}"` )
  for userId in ${will_update_userId[*]}
  do
    firstName=`getRandomString` 
    lastName=`getRandomString`
    email=`getRandomString 6`@`getRandomString 3`.com
    introduction=`getRandomString`

    curl -s -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'","firstName":"'$firstName'","lastName":"'$lastName'","email":"'$email'","introduction":"'$introduction'"}' localhost:8000/user/update
  done
}
