#!/bin/bash

function showFollowed() {
  loop_count=${1:-1}
  will_read_userId=( `curl -s localhost:8000/user/read | jq '.readed_users[].userId' | xargs` )

  for (( i=0; i<$loop_count; i++ ))
  do
    random_id=$(( $RANDOM % ${#will_read_userId[*]} ))
    curl -s localhost:8000/user/follow/read/getfollowed/${will_read_userId[$random_id]}
  done
}
