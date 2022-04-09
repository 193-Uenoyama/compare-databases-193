#!/bin/bash

function leaveGroup() {
  loop_count=${1:-1}
  groups_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/read`
  readed_groupId=( `echo $groups_response | jq '.readed_groups[].groupId' | xargs` )

  groupMembers_rows_response=`curl -s -X POST -H "Content-Type: application/json" -d '{"is_unneed_calculate":"true"}' localhost:8000/group/member/read/rows`
  deleteable_cnt=`echo $groupMembers_rows_response | jq '.group_members_count'`
  if [ $loop_count -gt $deleteable_cnt ] ; then
    echo "loop_count must be specified smaller then the GroupMembers table rows."
    exit 1
  fi

  while [ $loop_count -gt 0 ]
  do
    # 削除対象のグループIDをランダムに取り出し
    random_group_index=$(( $RANDOM % ${#readed_groupId[*]} ))
    groupId=${readed_groupId[$random_group_index]}

    members_response=`curl -s -X POST  -H "Content-Type: application/json" -d '{"groupId":'$groupId',"is_unneed_calculate":"true"}' localhost:8000/group/member/read`
    will_delete_members=( `echo $members_response | jq '.readed_group.Members[].userId'` )
    # 取り出したグループIDのメンバーを削除 
    # グループメンバー全員かループカウントが0になるまで
    i=0
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

