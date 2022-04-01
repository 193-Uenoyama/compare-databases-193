#!/bin/bash

function cutArrayToRequireNumber() {
  # ２つの引数が必須。
  if [ $# -ne 2 ] ; then
    echo "Wrong number of arguments."
    exit 1
  fi
  loop_count=$1
  will_operate_id_array=( ${2} )


  # 減らす配列の数
  del_element_count=$(( ${#will_operate_id_array[*]} - $loop_count ))
  if [ $del_element_count -le 0 ] ; then
    echo "Must array argument length is grater then loop_count argument."
    exit 1
  fi


  # 必要な数まで要素を削除
  for (( i=0; i<$del_element_count; i++ ))
  do
    unset_item=$(( $RANDOM % ${#will_operate_id_array[*]} ))
    unset will_operate_id_array[$unset_item]

    # 配列を再定義して減った要素を詰める
    will_operate_id_array=(`echo ${will_operate_id_array[*]}`)
  done

  echo ${will_operate_id_array[*]}
}

