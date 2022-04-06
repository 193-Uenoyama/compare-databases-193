#!/bin/bash

function leaveUser() {
  loop_count=${1:-1}
  readed_userId=( `curl -s localhost:8000/user/read | jq '.readed_users[].userId' | xargs` )

  # TODO 準備の仕方考え直す
  while [ $loop_count -gt 0 ]
  do
    # 削除対象のユーザIDをランダムに取り出し
    random_user_index=$(( $RANDOM % ${#readed_userId[*]} ))
    followerUserId=${readed_userId[$random_user_index]}

    # 取り出したユーザのフォロー対象を取り出し、削除 
    will_delete_followed=( `curl -s localhost:8000/user/follow/read/getfollowed/$follower_userId | jq '.followeds.Followed[].userId'` )

    i=0
    #  グループメンバー全員かループカウントが0になるまで
    while [ $i -lt ${#will_delete_followed[*]} ] && [ $loop_count -gt 0 ]
    do
      followedUserId=${will_delete_followed[$i]}

      # 削除のリクエスト
      curl -s -X POST -H "Content-Type: application/json" -d '{"followedUserId":"'$followedUserId'","followerUserId":"'$followerUserId'"}' localhost:8000/group/member/delete
      i=$(( $i + 1 ))
      loop_count=$(( $loop_count - 1 ))
    done

    unset ${#readed_userId[$random_user_index]}
    # 再代入して要素を詰める
    readed_userId=( `echo ${readed_userId[*]}` )
  done
}

