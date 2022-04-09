#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh

function deleteGroup() {
  loop_count=${1:-1}
  groups_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/read`
  will_delete_groupId=( `echo $groups_response | jq '.readed_groups[].groupId' | xargs` )

  echo $loop_count, ${#will_delete_groupId[*]} > /tmp/mylog
  if [ $loop_count -gt ${#will_delete_groupId[*]} ] ; then
    echo "loop_count must be specified smaller then the Groups table rows."
    exit 1
  fi

  will_delete_groupId=( `cutArrayToRequireNumber $loop_count "${will_delete_groupId[*]}"` )
  for groupId in ${will_delete_groupId[*]}
  do
    echo $groupId
    curl -s -X POST -H "Content-Type: application/json" -d '{"groupId":"'$groupId'"}' localhost:8000/group/delete
  done
}
