#!/bin/bash

function deleteExistedLogDir() {
  existing_dirs=( `ls $SDP_ROOT/logs/` )
  echo ${existing_dirs[*]} > /tmp/mylog
  for dir_name in ${existing_dirs[*]}
  do
    rm -rf $SDP_ROOT/logs/$dir_name
  done
}
