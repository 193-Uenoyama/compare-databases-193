#!/bin/bash

# TODO 課題...管理者権限が必要
function waitPossibleToCommunication() {
  TIMEOUT=60
  TRUE=1
  FALSE=0

  servLogTmpPath="/tmp/serv-logs"
  isPossibleToCommunicate=$FALSE

  i=0
  while [ $isPossibleToCommunicate -eq $FALSE ]
  do

    if [ $i -ge $TIMEOUT ] ; then
      echo timeout
      exit 1
    fi

    docker logs compare-databases-193_node-server > $servLogTmpPath
    if grep "Ready to go communication to database" $servLogTmpPath ; then
      isPossibleToCommunicate=$TRUE
      echo "Possible to communication done."
    fi

    sleep 1
    i=$((++i))
  done
}

