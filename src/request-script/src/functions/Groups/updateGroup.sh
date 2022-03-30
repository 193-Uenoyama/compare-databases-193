#!/bin/bash

# loop_count=$1
loop_count=2

response=`curl -s localhost:8000/group/read`

will_update_groupId=( `echo $response | jq '.readed_groups[].groupId' | xargs` )

# 減らす配列の数
del_element_count=$(( ${#will_update_groupId[*]} - $loop_count ))

# 必要な数まで要素を削除
for (( i=0; i<$del_element_count; i++ ))
do
  unset_groupId=$(( $RANDOM % ${#will_update_groupId[*]} ))
  unset will_update_groupId[$unset_groupId]

  # 配列を再定義して減った要素を詰める
  will_update_groupId=(`echo ${will_update_groupId[*]}`)
done


for groupId in ${will_update_groupId[*]}
do
  groupName=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1`

  groupIntroduction=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1`

  curl -X POST -H "Content-Type: application/json" -d '{"groupId":"'$groupId'","groupName":"'$groupName'","groupIntroduction":"'$groupIntroduction'"}' localhost:8000/group/update
done
