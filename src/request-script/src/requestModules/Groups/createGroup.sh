#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh

function createGroup() {
  loop_count=${1:-1}

  for (( i=0; i<$loop_count; i++ ))
  do
    groupName=`getRandomString`
    groupIntroduction=`getRandomString`

    curl -s -X POST -H "Content-Type: application/json" -d '{"groupName":"'$groupName'","groupIntroduction":"'$groupIntroduction'"}' localhost:8000/group/create
  done
}

