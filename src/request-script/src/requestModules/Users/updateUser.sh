#!/bin/bash
$SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh
$SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh

function updateUser() {
  loop_count=${1:-1}

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
    firstName=`getRandomString` 
    lastName=`getRandomString`
    email=`getRandomString 6`@`getRandomString 3`.com
    introduction=`getRandomString`

    curl -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'","firstName":"'$firstName'","lastName":"'$lastName'","email":"'$email'","introduction":"'$introduction'"}' localhost:8000/user/update
  done
}
