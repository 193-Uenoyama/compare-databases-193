#!src/request-script/test/testModules/bats-core/bin/bats

source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh
source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh
source $SDP_ROOT/src/request-script/src/requestModules/confirmExceededLimit.sh

setup() {
  load $SDP_ROOT/src/request-script/test/testModules/bats-assert/load.bash
  load $SDP_ROOT/src/request-script/test/testModules/bats-support/load.bash
}

# getRandomString
@test "getRandomString: Should return a random string" {
  run getRandomString
  assert_output -e '[a-zA-Z0-9]{16}'
}

@test "getRandomString: Should return a random string with the number of digits of the given argument" {
  run getRandomString 6
  assert_output -e '[a-zA-Z0-9]{6}'

  run getRandomString 22
  assert_output -e '[a-zA-Z0-9]{22}'
}


# cutArrayToRequireNumber
@test "cutArrayToRequireNumber: Should cut array to loop_count number" {
  test_array=("aa" "bb" "cc" "dd" "ee" "ff")

  temp_loop_count=2
  test_result=( `cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"` )
  assert [ ${#test_result[*]} -eq $temp_loop_count ]

  temp_loop_count=4
  test_result=( `cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"` )
  assert [ ${#test_result[*]} -eq $temp_loop_count ]
}

@test "cutArrayToRequireNumber: Must two arguments to execute cutArrayToRequireNumber" {
  run cutArrayToRequireNumber
  assert_output "Wrong number of arguments."

  run cutArrayToRequireNumber 4
  assert_output "Wrong number of arguments."

  run cutArrayToRequireNumber 4 "aa" "bb"
  assert_output "Wrong number of arguments."
}

@test "cutArrayToRequireNumber: Should return error message when array argument length is less then loop_count argument" {
  test_array=("aa" "bb" "cc" "dd" "ee" "ff")

  temp_loop_count=10
  run cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"
  assert_output "Must array argument length is grater then loop_count argument."

  temp_loop_count=${#test_array[*]}
  run cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"
  assert_output "Must array argument length is grater then loop_count argument."
}

# reduceExceedTheLimit
@test "reduceExceedTheLimit: Should reduce exceeded the limit array of over limit item" {
  test_array=(2 1 4)
  run reduceExceedTheLimit 3 "${test_array[*]}"
  assert_output "2 1 3"

  test_array=(4 5 6 7 )
  run reduceExceedTheLimit 5 "${test_array[*]}"
  assert_output "4 5 5 5"
}

# toLevelExceededLimit
@test "toLevelExceededLimit: Should" {
  test_array=(2 1 4)
  run toLevelOverCnt 1 3 "${test_array[*]}"
  assert_output "2 2 4"
}

# confirmExceededLimit
@test "confirmExceededLimit: Should" {
  test_array=(1 2 4)
  run confirmExceededLimit 3 "${test_array[*]}"
  assert_output "2 2 3"

  test_array=(0 4 5 6 7 6)
  run confirmExceededLimit 5 "${test_array[*]}"
  assert_output "4 4 5 5 5 5"
}

