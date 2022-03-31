#!/bin/bash
source $SDP_ROOT/src/request-script/src/requestModules/getRandomString.sh

function createUser() {
  loop_count=${1:-1}

  for (( i=0; i<$loop_count; i++ ))
  do
    firstName=`getRandomString` 
    lastName=`getRandomString`
    email=`getRandomString 6`@`getRandomString 3`.com
    introduction=`getRandomString`

    curl -s -X POST -H "Content-Type: application/json" -d '{"firstName":"'$firstName'","lastName":"'$lastName'","email":"'$email'","introduction":"'$introduction'"}' localhost:8000/user/create
done
}

