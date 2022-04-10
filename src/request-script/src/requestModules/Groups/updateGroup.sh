#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh

function updateGroup() {
  loop_count=${1:-1}
  groups_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/read`

  will_update_groupId=( `echo $groups_response | jq '.readed_groups[].groupId' | xargs` )

  for (( i=0; i<$loop_count; i++  ))
  do
    random_group_index=$(( $RANDOM % ${#will_update_groupId[*]} ))
    groupId=${will_update_groupId[$random_group_index]}
    groupName=`getRandomString`
    groupIntroduction=`getRandomString`
    curl -s -X POST -H "Content-Type: application/json" -d '{"groupId":"'$groupId'","groupName":"'$groupName'","groupIntroduction":"'$groupIntroduction'"}' localhost:8000/group/update
  done
}
