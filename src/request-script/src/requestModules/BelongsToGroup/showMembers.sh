#!/bin/bash

function showMembers() {
  loop_count=${1:-1}
  groups_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/read`
  will_read_groupId=( `echo $groups_response | jq '.readed_groups[].groupId' | xargs` )

  # TODO groupが空っぽ(0)の場合のエラー処理とテスト(0除算が出てしまう)

  for (( i=0; i<$loop_count; i++ ))
  do
    random_id=$(( $RANDOM % ${#will_read_groupId[*]} ))
    curl -s -X POST  -H "Content-Type: application/json" -d '{"groupId":'${will_read_groupId[$random_id]}'}' localhost:8000/group/member/read
  done
}
