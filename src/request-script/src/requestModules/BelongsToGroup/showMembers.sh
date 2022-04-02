#!/bin/bash

function showMembers() {
  loop_count=${1:-1}
  will_read_groupId=( `curl -s localhost:8000/group/read | jq '.readed_gorups[].groupId' | xargs` )

  for (( i=0; i<$loop_count; i++ ))
  do
    random_id=$(( $RANDOM % ${#will_read_groupId[*]} ))
    curl -s localhost:8000/group/member/read/${will_read_groupId[$random_id]}
  done
}
