#!src/request-script/test/testModules/bats-core/bin/bats
source $SDP_ROOT/src/request-script/test/testModules/deleteExistedLogDir.sh

setup() {
  load $SDP_ROOT/src/request-script/test/testModules/bats-assert/load.bash
  load $SDP_ROOT/src/request-script/test/testModules/bats-support/load.bash
  deleteExistedLogDir
}

teardown() {
  deleteExistedLogDir
}

# startScenario
@test "startScenario: ログファイルを出力できる" {
  source $SDP_ROOT/src/request-script/src/startScenario.sh scenarioA.sh
  
  existing_files=( `ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/` )
  assert [ ${#existing_files[*]} -eq 3 ]

  for log_file in ${existing_files[*]}
  do
    logfile_content=( `cat $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$log_file | xargs` )

    assert [ ${#logfile_content[*]} -eq 8 ]
    run echo ${logfile_content[0]}
    assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Create,Users,[0-9]*$'
    run echo ${logfile_content[1]}
    assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
    run echo ${logfile_content[2]}
    assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Read,Users,[0-9]*$'
    run echo ${logfile_content[3]}
    assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
    run echo ${logfile_content[4]}
    assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Update,Users,[0-9]*$'
    run echo ${logfile_content[5]}
    assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
    run echo ${logfile_content[6]}
    assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,DB,Delete,Users,[0-9]*$'
    run echo ${logfile_content[7]}
    assert_output -e '^Success,[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2},[^,].*,Node,[0-9]*$'
  done
}

@test "startScenario: 実行ごとに違うログディレクトリが出力される" {
  source $SDP_ROOT/src/request-script/src/startScenario.sh scenarioA.sh
  source $SDP_ROOT/src/request-script/src/startScenario.sh scenarioA.sh
  
  existing_dirs=( `ls $SDP_ROOT/logs/` )
  assert [ ${#existing_dirs[*]} -eq 2 ]

  for dir_name in ${existing_dirs[*]}
  do
    run echo $dir_name 
    assert_output -e '[0-9]{4}[0-9]{2}[0-9]{2}T[0-9]{2}[0-9]{2}[0-9]{2}-scenarioA'
  done
}
