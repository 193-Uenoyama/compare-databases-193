#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh

function updateUser() {
  loop_count=${1:-1}
  users_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/read`

  will_update_userId=( `echo $users_response | jq '.readed_users[].userId' | xargs` )

  for (( i=0; i<$loop_count; i++  ))
  do
    random_user_index=$(( $RANDOM % ${#will_update_userId[*]} ))
    userId=${will_update_userId[$random_user_index]}
    firstName=`getRandomString` 
    lastName=`getRandomString`
    email=`getRandomString 6`@`getRandomString 3`.com
    introduction=`getRandomString`

    curl -s -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'","firstName":"'$firstName'","lastName":"'$lastName'","email":"'$email'","introduction":"'$introduction'"}' localhost:8000/user/update
  done
}
