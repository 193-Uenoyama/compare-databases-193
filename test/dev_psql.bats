#!test/bats/bin/bats

setup() {
  load ./test/test_helper/bats-assert/load.bash
  load ./test/test_helper/bats-support/load.bash
}

teardown() {
   make down
   make delete-db
}

@test "start up psql" {
  make up-psql
  run docker ps -a
  assert_output --regexp '.*Up.*\n.*Up.*\n.*Up.*'
}
