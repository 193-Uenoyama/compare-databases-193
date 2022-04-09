#!/bin/bash

function showFollower() {
  loop_count=${1:-1}
  users_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/read`
  will_read_userId=( `echo $users_response | jq '.readed_users[].userId' | xargs` )

  for (( i=0; i<$loop_count; i++ ))
  do
    random_index=$(( $RANDOM % ${#will_read_userId[*]} ))
    curl -s -X POST -H "Content-Type: application/json" -d '{"followedUserId":"'${will_read_userId[$random_index]}'"}' localhost:8000/user/follow/read/getfollower
  done
}
