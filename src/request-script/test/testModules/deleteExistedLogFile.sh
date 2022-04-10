#!/bin/bash

function deleteExistedLogFile() {
  existing_files=( `ls $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/` )
  for log_file in ${existing_files[*]}
  do
    rm $SDP_ROOT/logs/$SDP_SERV_LOG_DIR/$log_file
  done
}

