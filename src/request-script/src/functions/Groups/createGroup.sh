#!/bin/bash

# loop_count=$1
loop_count=2


for (( i=0; i<$loop_count; i++ ))
do
  groupName=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1`

  groupIntroduction=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1`

  curl -X POST -H "Content-Type: application/json" -d '{"groupName":"'$groupName'","groupIntroduction":"'$groupIntroduction'"}' localhost:8000/group/create
done
