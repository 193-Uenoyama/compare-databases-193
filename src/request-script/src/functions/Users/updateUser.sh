#!/bin/bash

function aa() {
  loop_count=$1
  data_array=$2
}

# loop_count=$1
loop_count=2

response=`curl -s localhost:8000/user/read`

will_update_userId=( `echo $response | jq '.readed_users[].userId' | xargs` )

# 減らす配列の数
del_element_count=$(( ${#will_update_userId[*]} - $loop_count ))

# 必要な数まで要素を削除
for (( i=0; i<$del_element_count; i++ ))
do
  unset_userId=$(( $RANDOM % ${#will_update_userId[*]} ))
  unset will_update_userId[$unset_userId]

  # 配列を再定義して減った要素を詰める
  will_update_userId=(`echo ${will_update_userId[*]}`)
done


for userId in ${will_update_userId[*]}
do
  firstName=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1`

  lastName=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1`

  email=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 6 | head -n 1`@`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 5 | head -n 1`.com

  introduction=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1`

  curl -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'","firstName":"'$firstName'","lastName":"'$lastName'","email":"'$email'","introduction":"'$introduction'"}' localhost:8000/user/update
done
