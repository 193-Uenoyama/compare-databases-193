#!/bin/bash

scenario=$1
function cleanUp() {
  make down
  make db-delete
}
trap cleanUp EXIT

$SDP_ROOT/src/request-script/src/startScenario.sh $scenario

