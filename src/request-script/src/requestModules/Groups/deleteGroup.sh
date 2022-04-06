#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh

function deleteGroup() {
  loop_count=${1:-1}
  response=`curl -s localhost:8000/group/read`

  will_delete_groupId=( `echo $response | jq '.readed_groups[].groupId' | xargs` )

  will_delete_groupId=( `cutArrayToRequireNumber $loop_count "${will_delete_groupId[*]}"` )
  for groupId in ${will_delete_groupId[*]}
  do
    echo $groupId
    curl -X POST -H "Content-Type: application/json" -d '{"groupId":"'$groupId'"}' localhost:8000/group/delete
  done
}
