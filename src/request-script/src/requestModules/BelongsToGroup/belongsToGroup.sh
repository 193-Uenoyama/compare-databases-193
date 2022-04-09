#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/confirmExceededLimit.sh

function belongsToGroup() {
  loop_count=${1:-1}
  users_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/read`
  groups_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/read`

  will_create_userId=( `echo $users_response | jq '.readed_users[].userId' | xargs` )
  will_create_groupId=( `echo $groups_response | jq '.readed_groups[].groupId' | xargs` )

  conbination_of_num=$(( ${#will_create_userId[*]} * ${#will_create_groupId[*]} ))
  if [ $loop_count -gt $conbination_of_num ] ; then
    echo loop_count must be specified smaller then the combination of userId and groupId.
    exit 1
  fi

  # groupごとのリクエスト回数を記憶する配列を初期化
  request_cnt_each_group=()
  for (( i=0; i<${#will_create_groupId[*]}; i++ ))
  do
    request_cnt_each_group[$i]=0
  done

  # groupごとのリクエスト回数をインクリメント
  for (( i=0; i<$loop_count; i++ ))
  do
    request_index=$(( $RANDOM % ${#will_create_groupId[*]} ))
    request_cnt_each_group[$request_index]=$(( request_cnt_each_group[$request_index] + 1 ))
  done

  # groupごとのリクエスト回数がuserIdの配列数を超えていないか確認、修正
  request_cnt_each_group=( `confirmExceededLimit ${#will_create_userId[*]} "${request_cnt_each_group[*]}"` )

  for (( i=0; i<${#will_create_groupId[*]}; i++ ))
  do
    users_shuf_array=( `shuf -e ${will_create_userId[*]} | xargs` )

    for (( j=0; j<${request_cnt_each_group[$i]}; j++ ))
    do
      userId=${users_shuf_array[$j]}
      groupId=${will_create_groupId[$i]}

      curl -s -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'","groupId":"'$groupId'"}' localhost:8000/group/member/create
    done

  done

}
