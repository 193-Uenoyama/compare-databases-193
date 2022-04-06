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
  each_follower_request_cnt=()
  for (( i=0; i<${#will_create_followerId[*]}; i++ ))
  do
    each_follower_request_cnt[$i]=0
  done

  # followerIdごとのリクエスト回数をインクリメント
  for (( i=0; i<$loop_count; i++ ))
  do
    random_followerId=$(( $RANDOM % ${#will_create_followerId[*]} ))
    each_follower_request_cnt[$random_followerId]=$(( ${each_follower_request_cnt[$random_followerId]} + 1 ))
  done

  # groupIdごとのリクエスト回数がuserIdの配列数を超えていないか確認、修正
  each_follower_request_cnt=( `confirmExceededLimit ${#will_create_followedId[*]} "${each_follower_request_cnt[*]}"` )
  
  for (( i=0; i<${#will_create_followerId[*]}; i++ ))
  do
    followed_shuf_array=( `shuf -e ${will_create_followedId[*]} | xargs` )

    for (( j=0; j<${each_follower_request_cnt[$i]}; j++ ))
    do
      followedUserId=${followed_shuf_array[$j]}
      followerUserId=${will_create_followerId[$i]}

      curl -s -X POST -H "Content-Type: application/json" -d '{"followedUserId":"'$followedUserId'","followerUserId":"'$followerUserId'"}' localhost:8000/user/follow/create
    done

  done
}
