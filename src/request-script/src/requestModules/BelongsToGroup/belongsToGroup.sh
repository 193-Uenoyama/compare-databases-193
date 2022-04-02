#!/bin/bash

function belongsToGroup() {
  loop_count=${1:-1}
  curl -s localhost:8000/group/member/create/
}
