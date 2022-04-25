#!src/request-script/test/testModules/bats-core/bin/bats

source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh
source $SDP_ROOT/src/request-script/src/requestModules/cutArrayToRequireNumber.sh
source $SDP_ROOT/src/request-script/src/requestModules/confirmExceededLimit.sh
source $SDP_ROOT/src/request-script/src/requestModules/extensionManager.sh

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

  test_array=("cc")
  temp_loop_count=1
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

  temp_loop_count=$(( ${#test_array[*]} + 1 ))
  run cutArrayToRequireNumber $temp_loop_count "${test_array[*]}"
  assert_output "Must array argument length is grater then loop_count argument."
}

# confirmExceededLimit -> reduceExceedTheLimit
@test "reduceExceedTheLimit: Should reduce exceeded the limit array of over limit item" {
  test_array=(2 1 4)
  run reduceExceedTheLimit 3 "${test_array[*]}"
  assert_output "2 1 3"

  test_array=(4 5 6 7 )
  run reduceExceedTheLimit 5 "${test_array[*]}"
  assert_output "4 5 5 5"
}

# confirmExceededLimit -> toLevelExceededLimit
@test "toLevelExceededLimit: equalize elements greater then limit" {
  test_array=(2 1 4)
  run toLevelOverCnt 1 3 "${test_array[*]}"
  assert_output "2 2 4"
}

# confirmExceededLimit -> confirmExceededLimit
@test "confirmExceededLimit: check to see if it is exceed the limit" {
  test_array=(1 2 4)
  run confirmExceededLimit 3 "${test_array[*]}"
  assert_output "2 2 3"

  test_array=(1 2 4)
  run confirmExceededLimit 4 "${test_array[*]}"
  assert_output "1 2 4"

  test_array=(0 4 5 6 7 6)
  run confirmExceededLimit 5 "${test_array[*]}"
  assert_output "4 4 5 5 5 5"
}

# extensionManager -> complementExtension
@test "complementExtension: inspect file name and if not found extension then correction" {
  run complementExtension file sh
  assert_output "file.sh"
  run complementExtension file bats
  assert_output "file.bats"

  run complementExtension file_name .sh
  assert_output "file_name.sh"
  run complementExtension file_name.bats .bats
  assert_output "file_name.bats"

  run complementExtension file_name.test.sh sh
  assert_output "file_name.test.sh"
  run complementExtension file_name.test.bats .bats
  assert_output "file_name.test.bats"
  run complementExtension file_name.test sh
  assert_output "file_name.test.sh"
}

# extensionManager -> excludeExtension
@test "excludeExtension: inspect file name and if found extension then correction" {
  run excludeExtension file.sh
  assert_output "file"

  run excludeExtension file.bats
  assert_output "file"

  run excludeExtension file_name.test.sh
  assert_output "file_name.test"
}

