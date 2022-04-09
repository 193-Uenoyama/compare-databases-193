#!/bin/bash

function leaveUser() {
  loop_count=${1:-1}
  users_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/read`
  readed_userId=( `echo $users_response | jq '.readed_users[].userId' | xargs` )

  follows_rows_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/user/follow/read/rows`
  deleteable_cnt=`echo $follows_rows_response | jq '.follows_count'`
  if [ $loop_count -gt $deleteable_cnt ] ; then
    echo "loop_count must be specified smaller then the Follows table rows."
    exit 1
  fi

  while [ $loop_count -gt 0 ]
  do
    # 削除対象のユーザIDをランダムに取り出し
    random_user_index=$(( $RANDOM % ${#readed_userId[*]} ))
    followerUserId=${readed_userId[$random_user_index]}

    followed_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true","followerUserId":'$followerUserId'}' localhost:8000/user/follow/read/getfollowed`
    will_delete_followed=( `echo $followed_response | jq '.followeds.Followed[].userId'` )
    # 取り出したユーザのフォロー対象を取り出し、削除 
    # グループメンバー全員かループカウントが0になるまで
    i=0
    while [ $i -lt ${#will_delete_followed[*]} ] && [ $loop_count -gt 0 ]
    do
      followedUserId=${will_delete_followed[$i]}

      curl -s -X POST -H "Content-Type: application/json" -d '{"followedUserId":"'$followedUserId'","followerUserId":"'$followerUserId'"}' localhost:8000/user/follow/delete
      i=$(( $i + 1 ))
      loop_count=$(( $loop_count - 1 ))
    done

    unset readed_userId[$random_user_index]
    # 再代入して要素を詰める
    readed_userId=( `echo ${readed_userId[*]}` )
  done
}

