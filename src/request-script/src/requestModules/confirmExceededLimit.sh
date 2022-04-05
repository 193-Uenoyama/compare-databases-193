#!/bin/bash

function confirmExceededLimit() {
  limit_value=$1

  #確認対象の配列
  to_be_checked=( $2 )

  over_cnt=0

  # ターゲットの配列がuserIdの要素数より多く振り分けられていないか確認
  for (( i=0; i<${#to_be_checked[*]}; i++ ))
  do
    if [ ${to_be_checked[$i]} -gt $limit_value ] ; then
      over_cnt=$(( $over_cnt + ${to_be_checked[$i]} - $limit_value ))
    fi
  done

  if [ $over_cnt -eq 0 ] ; then
    # オーバーしていなければそのまま正常終了
    echo ${to_be_checked[*]}
    exit 0

  else
    # オーバーしていれば修正の処理を実行
    to_be_checked=( `reduceExceedTheLimit $limit_value "${to_be_checked[*]}"` )  
    to_be_checked=( `toLevelOverCnt $over_cnt $limit_value "${to_be_checked[*]}"` )
    echo ${to_be_checked[*]}
    exit 0

  fi
}


function reduceExceedTheLimit() {
  limit_value=$1
  exeeded_limit_array=( $2 )

  for (( i=0; i<${#exeeded_limit_array[*]}; i++ ))
  do
    if [ ${exeeded_limit_array[$i]} -gt $limit_value ] ; then
      exeeded_limit_array[$i]=$limit_value
    fi
  done

  echo ${exeeded_limit_array[*]}
}


function toLevelOverCnt() {
  over_cnt=$1
  limit_value=$2
  to_be_checked=( $3 )
  
  while [ $over_cnt -gt 0 ]
  do
    # 一番振り分けられた数が少ない要素に加算
    min=${to_be_checked[0]}
    min_index=0
    for (( i=1; i<${#to_be_checked[*]}; i++ ))
    do
      if [ $min -gt ${to_be_checked[$i]} ] ; then
        min=${to_be_checked[$i]}
        min_index=$i
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

    to_be_checked[$min_index]=$(( ${to_be_checked[$min_index]} + $add_num ))

    # 加算可能な最大値分を引く
    over_cnt=$(( $over_cnt - $assiginable_num ))
  done

  echo ${to_be_checked[*]}
}
