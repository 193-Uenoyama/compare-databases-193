#!test/bats/bin/bats

setup() {
  load ./test/test_helper/bats-assert/load.bash
  load ./test/test_helper/bats-support/load.bash
}

@test "start up psql" {
  run docker ps -a
  assert_output --regexp '.*Up.*\n.*Up.*\n.*Up.*'
}

@test "migrate and seeding" {
  make serv-migrate
  make serv-seed
}
