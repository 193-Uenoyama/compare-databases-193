#!src/request-script/test/modules/bats-core/bin/bats

setup() {
  load ./modules/bats-assert/load.bash
  load ./modules/bats-support/load.bash
}

@test "start up psql" {
  run docker ps -a
  assert_output --regexp '.*Up.*\n.*Up.*'
}

@test "migrate and seeding" {
  make serv-migrate
  make serv-seed
}

