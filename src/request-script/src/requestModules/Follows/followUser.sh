#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/confirmExceededLimit.sh

function followUser() {
  loop_count=${1:-1}
  will_create_followerId=( `curl -s localhost:8000/user/read | jq '.readed_users[].userId' | xargs` )
  will_create_followedId=( `echo ${will_create_followerId[*]}` )

  # loop_countがグループに所属出来る組み合わせより多い場合エラー
  conbination_of_num=$(( ${#will_create_followerId[*]} * ${#will_create_followedId[*]} ))
  if [ $loop_count -gt $conbination_of_num ] ; then
    # TODO エラーメッセージちょい変える
    echo loop_count must be specified smaller then the combination of userId and userId.
    exit 1
  fi

  # followerIdごとのリクエスト回数を記憶する配列を初期化
  random_follower_targets=()
  for (( i=0; i<${will_create_followerId[*]}; i++ ))
    ${random_follower_targets[i]}=0
  do
  done

  # followerIdごとのリクエスト回数をインクリメント
  for (( i=0; i<$loop_count; i++ ))
  do
    random_followerId=$(( $RANDOM % ${#will_create_followerId[*]} ))
    $(( ${random_follower_targets[$random_followerId]}++ ))
  done

  # groupIdごとのリクエスト回数がuserIdの配列数を超えていないか確認、修正
  random_follower_targets=( `confirmExceededLimit ${#will_create_followedId[*]} "${random_follower_targets[*]}"` )
  
  for (( i=0; i<${#random_follower_targets[*]}; i++ ))
  do
    followed_array_duplication=( `echo ${will_create_followedId[*]}` )

    while [ ${#followed_array_duplication[*]} -gt ${#random_follower_targets[i]} ]
    do
      followed_index=$(( $RANDOM % ${#followed_array_duplication[*]} ))
      followedUserId=${#followed_array_duplication[$followed_index]}
      followerUserId=$(( $i + 1 ))
      curl -s -X POST -H "Content-Type: application/json" -d '{"followedUserId":"'$followedUserId'","followerUserId":"'$followerUserId'"}' localhost:8000/group/member/follow

      unset ${#followed_array_duplication[$followed_index]}
      # 再代入して要素を詰める
      followed_array_duplication=( `echo ${followed_array_duplication[*]}` )
    done

  done

  curl -s localhost:8000/user/follow/create/
}
