#!/bin/bash

# loop_count=$1
loop_count=2

response=`curl -s localhost:8000/user/read`

will_delete_userId=( `echo $response | jq '.readed_users[].userId' | xargs` )

# 減らす配列の数
del_element_count=$(( ${#will_delete_userId[*]} - $loop_count ))

# 必要な数まで要素を削除
for (( i=0; i<$del_element_count; i++ ))
do
  unset_userId=$(( $RANDOM % ${#will_delete_userId[*]} ))
  unset will_delete_userId[$unset_userId]

  # 配列を再定義して減った要素を詰める
  will_delete_userId=(`echo ${will_delete_userId[*]}`)
done


for userId in ${will_delete_userId[*]}
do
  curl -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'"}' localhost:8000/user/delete
done
