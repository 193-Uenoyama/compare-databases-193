#!test/modules/bats/bin/bats

setup() {
  load ./test/modules/bats-assert/load.bash
  load ./test/modules/bats-support/load.bash
  . ./test/modules/shellnium-scenario/getUser.sh
}

@test "start up mariadb" {
  run docker ps -a
  assert_output --regexp '.*Up.*\n.*Up.*\n.*Up.*'
}

@test "migrate and seeding" {
  make serv-migrate
  make serv-seed
}

@test "get user" {
  main 
}

