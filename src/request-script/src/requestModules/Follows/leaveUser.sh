#!/bin/bash

function leaveUser() {
  loop_count=${1:-1}
  will_delete_userId=( `curl -s localhost:8000/user/read | jq '.readed_users[].userId' | xargs` )
  random_index=$(( $RANDOM % ${#will_read_userId[*]} ))
  random_id=${will_read_userId[$random_index]}

  for (( i=0; i<$loop_count; i++ ))
  do
    curl -s localhost:8000/user/follow/delete/
  done

}
