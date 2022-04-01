#!src/request-script/test/testModules/bats-core/bin/bats

setup() {
  load $SDP_ROOT/src/request-script/test/testModules/bats-assert/load.bash
  load $SDP_ROOT/src/request-script/test/testModules/bats-support/load.bash
}

@test "Should return a random string" {
  source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh

  run getRandomString
  assert_output -e '[a-zA-Z0-9]{16}'
}

@test "Should return a random string with the number of digits of the given argument" {
  source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh

  run getRandomString 6
  assert_output -e '[a-zA-Z0-9]{6}'

  run getRandomString 22
  assert_output -e '[a-zA-Z0-9]{22}'
}

@test "Should cut array to loop_count number" {
  source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh
  test_array=("aa" "bb" "cc" "dd" "ee" "ff")

  temp_loop_count=2
  test_result=( `cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"` )
  assert [ ${#test_result[*]} -eq $temp_loop_count ]

  temp_loop_count=4
  test_result=( `cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"` )
  assert [ ${#test_result[*]} -eq $temp_loop_count ]
}

@test "Must two arguments to execute cutArrayToRequireNumber" {
  source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh

  run cutArrayToRequireNumber
  assert_output "Wrong number of arguments."

  run cutArrayToRequireNumber 4
  assert_output "Wrong number of arguments."

  run cutArrayToRequireNumber 4 "aa" "bb"
  assert_output "Wrong number of arguments."
}

@test "Should return error message when array argument length is less then loop_count argument" {
  source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh
  test_array=("aa" "bb" "cc" "dd" "ee" "ff")

  temp_loop_count=10
  run cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"
  assert_output "Must array argument length is grater then loop_count argument."

  temp_loop_count=${#test_array[*]}
  run cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"
  assert_output "Must array argument length is grater then loop_count argument."
}

