#!/bin/bash

# loop_count=$1
loop_count=2


for (( i=0; i<$loop_count; i++ ))
do
  firstName=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1 | sort | uniq`

  lastName=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1 | sort | uniq`

  email=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 6 | head -n 1 | sort | uniq`@`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 5 | head -n 1 | sort | uniq`.com

  introduction=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1 | sort | uniq`

  curl -X POST -H "Content-Type: application/json" -d '{"firstName":"'$firstName'","lastName":"'$lastName'","email":"'$email'","introduction":"'$introduction'"}' localhost:8000/user/create
done

