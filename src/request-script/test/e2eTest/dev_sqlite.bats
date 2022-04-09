#!src/request-script/test/testModules/bats-core/bin/bats

setup() {
  load ../testModules/bats-assert/load.bash
  load ../testModules/bats-support/load.bash
}

@test "start up sqlite" {
  run docker ps -a
  assert_output --regexp '.*Up.*'
}

@test "migrate and seeding" {
  make serv-migrate
  make serv-seed
}

