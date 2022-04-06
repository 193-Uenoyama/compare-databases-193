#!/bin/bash

function leaveGroup() {
  loop_count=${1:-1}
  readed_groupId=( `curl -s localhost:8000/group/read | jq '.readed_groups[].groupId' | xargs` )

  # TODO 準備の仕方考え直す
  while [ $loop_count -gt 0 ]
  do
    # 削除対象のグループIDをランダムに取り出し
    random_group_index=$(( $RANDOM % ${#readed_groupId[*]} ))
    groupId=${readed_groupId[$random_group_index]}

    # 取り出したグループIDのメンバーを削除 
    will_delete_members=( `curl -s localhost:8000/group/member/read/$groupId | jq '.readed_group.Members[].userId'` )
    i=0
    #  グループメンバー全員かループカウントが0になるまで
    while [ $i -lt ${#will_delete_members[*]} ] && [ $loop_count -gt 0 ]
    do
      userId=${will_delete_members[$i]}

      curl -s -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'","groupId":"'$groupId'"}' localhost:8000/group/member/delete
      i=$(( $i + 1 ))
      loop_count=$(( $loop_count - 1 ))
    done

    unset readed_groupId[$random_group_index]
    # 再代入して要素を詰める
    readed_groupId=( `echo ${readed_groupId[*]}` )
  done
}
