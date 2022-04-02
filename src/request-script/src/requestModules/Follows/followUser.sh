#!/bin/bash

function followUser() {
  loop_count=${1:-1}
  curl -s localhost:8000/user/follow/create/
}
