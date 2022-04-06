#!/bin/bash

function readGroup() {
  loop_count=${1:-1}

  for (( i=0; i<$loop_count; i++ ))
  do
    curl -s localhost:8000/group/read
  done
}
