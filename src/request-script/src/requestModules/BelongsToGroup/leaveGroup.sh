#!/bin/bash

function leaveGroup() {
  loop_count=${1:-1}
  curl -s localhost:8000/group/member/read/1270 | jq '.readed_group.Members[].userId'

  curl -s localhost:8000/group/member/delete
}
