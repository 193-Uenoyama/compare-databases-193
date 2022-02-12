#!/bin/bash

# 未使用(1.管理者権限が必要, 2.起動待ちしてもデータベースに接続できない)

readonly TIMEOUT=40
readonly TRUE=1
readonly FALSE=0
readonly PASSWORD=$1

dbLogPath=`docker inspect compare-databases-193_db | grep LogPath`
dbLogPath=`echo $dbLogPath | sed -e "s?\".*\":??g; s?\"??g; s? ??g; s?,??g"`
isDbStart=$FALSE

servLogPath=`docker inspect compare-databases-193_node-server | grep LogPath`
servLogPath=`echo $servLogPath | sed -e "s?\".*\":??g; s?\"??g; s? ??g; s?,??g"`
isServStart=$FALSE

# clientLogPath=`docker inspect compare-databases-193_node-server | grep LogPath`
# clientLogPath=`echo $servLogPath | sed -e "s?\".*\":??g; s?\"??g; s? ??g; s?,??g"`
isClientStart=$FALSE

function waitStartUpForServer() {
  i=0
  while true
  do
    # TODO while に判断してもらいたいけど無理？
    if  [ $isDbStart -eq $TRUE ] && [ $isServStart -eq $TRUE ] && [ $isClientStart -eq $TRUE ] ; then
      break
    fi

    if [ $i -ge $TIMEOUT ] ; then
      echo timeout
      exit 1
    fi

    # mariadbが起動したか監視する
    if [ $isDbStart -eq $FALSE ] ; then
      dbLog=`echo $PASSWORD | sudo cat $dbLogPath`
      echo $dbLog
      if [[ $dbLog =~ .*mariadbd:[[:blank:]]ready[[:blank:]]for[[:blank:]]connections.* ]] ; then
        echo mariadb ready for connections!!
        isDbStart=$TRUE
      fi
    fi

    # expressのserverが起動したか監視する
    if [ $isServStart -eq $FALSE ] ; then
      servLog=`echo $PASSWORD | sudo cat $servLogPath`
      echo $servLog
      if [[ $servLog =~ .*listening[[:blank:]]on[[:blank:]]port[[:blank:]]8000!.* ]] ; then
        echo listening on port 8000!!
        isServStart=$TRUE
      fi
    fi

    #TODO reactのserverが起動したか監視する
    isClientStart=$TRUE

    sleep 1
    i=$((++i))
    echo "i: " $i
  done
  echo $isDbStart $isServStart $isClientStart
}

