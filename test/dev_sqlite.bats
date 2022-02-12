#!test/modules/bats/bin/bats

setup() {
  load ./test/modules/bats-assert/load.bash
  load ./test/modules/bats-support/load.bash
}

@test "start up sqlite" {
  run docker ps -a
  assert_output --regexp '.*Up.*\n.*Up.*'
}

@test "migrate and seeding" {
  make serv-migrate
  make serv-seed
}

@test "get user" {
  . ./test/shellnium-scenario/getUser.sh
  main 
}

