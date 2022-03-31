#!src/request-script/test/testModules/bats-core/bin/bats

setup() {
  load $SDP_ROOT/src/request-script/test/testModules/bats-assert/load.bash
  load $SDP_ROOT/src/request-script/test/testModules/bats-support/load.bash
}

@test "Should echo random string" {
  source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh

  run getRandomString
  assert_output -e '[a-zA-Z0-9]{16}'

  run getRandomString 6
  assert_output -e '[a-zA-Z0-9]{6}'

  run getRandomString 22
  assert_output -e '[a-zA-Z0-9]{22}'
}

@test "Should cut array to loop_count number" {
  source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh

  test_array=("aa" "bb" "cc" "dd" "ee" "ff")
  temp_loop_count=2

  test_result=( `cutArrayToRequireNumber $temp_loop_count ${test_array[*]}` )
  echo ${test_result[*]} >> /tmp/mylog
  assert [ ${#test_result[*]} -eq 2 ]
}
