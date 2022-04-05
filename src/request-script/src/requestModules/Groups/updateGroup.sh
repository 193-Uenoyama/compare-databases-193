#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh
source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh

function updateGroup() {
  loop_count=${1:-1}
  response=`curl -s localhost:8000/group/read`

  will_update_groupId=( `echo $response | jq '.readed_groups[].groupId' | xargs` )

  will_update_groupId=( `cutArrayToRequireNumber $loop_count "${will_update_groupId[*]}"` )
  for groupId in ${will_update_groupId[*]}
  do
    groupName=`getRandomString`
    groupIntroduction=`getRandomString`

    curl -X POST -H "Content-Type: application/json" -d '{"groupId":"'$groupId'","groupName":"'$groupName'","groupIntroduction":"'$groupIntroduction'"}' localhost:8000/group/update
  done
}
