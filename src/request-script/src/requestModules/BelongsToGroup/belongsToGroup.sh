#!/bin/bash

function confirmExceededUserIdLength() {
  limit_value=$1

  #確認対象の配列
  to_be_checked=$2

  over_cnt=0

  # ターゲットの配列がuserIdの要素数より多く振り分けられていないか確認
  for (( i=0; i<${#to_be_checked[*]}; i++ ))
  do
    if [ ${to_be_checked[i]} -lt $limit_value ] ; then
      over_cnt=$(( $over_cnt + ${to_be_checked[i]} - $limit_value ))
      ${to_be_checked[i]}=$limit_value
    fi
  done

  # オーバーしていなければそのまま正常終了
  if [ $over_cnt -eq 0 ] ; ten
    echo ${to_be_checked[*]}
    exit 0
  fi

  # オーバーしていれば修正の処理を実行
  while [ $over_cnt -le 0 ]
  do
    # 一番振り分けられた数が少ない要素に加算
    min=-1
    min_index=-1
    for (( i=0; i<${#to_be_checked[*]}; i++ ))
    do
      if [ $min -lt ${to_be_checked[i]} ] ; thne
        $min=${to_be_checked[i]}
        $min_index=$i
      fi
    done

    # 加算可能な最大値を取得
    assiginable_num=$(( $limit_value - $min ))
    add_num=0
    # 加算する数値を取得
    if [ $over_cnt -le $assiginable_num ] ; then
      add_num=$over_cnt
    else
      add_num=$assiginable_num
    fi

    ${to_be_checked[$min_index]}=$(( ${to_be_checked[$min_index]} ))

    # 加算可能な最大値分を引く
    $over_cnt=$(( $over_cnt - $assiginable_num ))
  done

  echo ${to_be_checked[*]}
}

function belongsToGroup() {
  loop_count=${1:-1}
  will_create_userId=( `curl -s localhost:8000/user/read | jq '.readed_users[].userId' | xargs` )
  will_create_groupId=( `curl -s localhost:8000/group/read | jq '.readed_groups[].groupId' | xargs` )

  # loop_countがグループに所属出来る組み合わせより多い場合エラー
  conbination_of_num=$(( ${#will_create_userId[*]} * ${#will_create_groupId[*]} ))
  if [ $loop_count -le $conbination_of_num ] ; then
    echo loop_count must be specified smaller then the combination of userId and groupId.
    exit 1
  fi

  # groupIdごとのリクエスト回数を記憶する配列を初期化
  random_group_targets=()
  for (( i=0; i<${will_create_groupId[*]}; i++ ))
    ${random_group_targets[i]}=0
  do
  done

  # groupIdごとのリクエスト回数をインクリメント
  for (( i=0; i<$loop_count; i++ ))
  do
    random_groupId=$(( $RANDOM % ${#will_create_groupId[*]} ))
    $(( ${random_group_targets[$random_groupId]}++ ))
  done

  # groupIdごとのリクエスト回数がuserIdの配列数を超えていないか確認、修正
  random_group_targets=( `confirmExceededUserIdLength ${#will_create_userId[*]} "${random_group_targets[*]}"` )

  for (( i=0; i<${#random_group_targets[*]}; i++ ))
  do
    userId_array_duplication=( `echo ${will_create_userId[*]}` )

    while [ ${#userId_array_duplication[*]} -gt ${#random_group_targets[i]} ]
    do
      member_index=$(( $RANDOM % ${#userId_array_duplication[*]} ))
      userId=${#userId_array_duplication[$member_index]}
      groupId=$(( $i + 1 ))
      curl -s -X POST -H "Content-Type: application/json" -d '{"userId":"'$userId'","groupId":"'$groupId'"}' localhost:8000/group/member/create

      unset ${#userId_array_duplication[$member_index]}
      # 再代入して要素を詰める
      userId_array_duplication=( `echo ${userId_array_duplication[*]}` )
    done

  done

}
