#!/bin/bash

function cutArrayToRequireNumber() {
  loop_count=$1
  will_operate_id_array=${2}

  echo $loop_count
  echo ${will_operate_id_array[*]}

  # 減らす配列の数
  del_element_count=$(( ${#will_operate_id_array[*]} - $loop_count ))

  # 必要な数まで要素を削除
  for (( i=0; i<$del_element_count; i++ ))
  do
    unset_userId=$(( $RANDOM % ${#will_operate_id_array[*]} ))
    unset will_operate_id_array[$unset_userId]

    # 配列を再定義して減った要素を詰める
    will_operate_id_array=(`echo ${will_operate_id_array[*]}`)
  done

  echo ${will_operate_id_array[*]}
}

test_array=("aa" "bb" "cc" "dd" "ee" "ff")
temp_loop_count=2

cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"
# test_result=( `cutArrayToRequireNumber $temp_loop_count ${test_array[*]}` )
# echo ${#test_result[0]}
# echo ${#test_result[1]}
# echo ${#test_result[2]}
# echo ${#test_result[3]}
