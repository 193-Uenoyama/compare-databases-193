#!/bin/bash

function followUser() {
  loop_count=${1:-1}
  will_read_userId=( `curl -s localhost:8000/user/read | jq '.readed_users[].userId' | xargs` )

  curl -s localhost:8000/user/follow/create/
}
