#!/bin/bash

users=`curl -s localhost:8000/user/read`

value=`echo $users | jq '.users[0].userId'`
echo value is : $value

if [ $value = "null" ] ; then
  echo "null"
else
  echo "not null"
fi

convertArrayFromResponse() {
  response_data=$1

  # condition ... 条件
  condition_head=$2
  condition_tail=$3

  # TODOsample=`echo $response_data | jq .$condition_head$i$condition_tail`
  echo $1
  echo $2
  echo $3
  echo .$condition_head$i$condition_tail
  # echo $TODOsample
  # i=0
  # while []
  # do
  #   i=$((++i))
  # done
}

convertArrayFromResponse $users .users[ ].userId

# curl localhost:8000/user/read >> $SDP_LOG_PATH &
# curl localhost:8000/group/read >> $SDP_LOG_PATH &

