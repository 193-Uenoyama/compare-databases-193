#!/bin/bash

function getRandomString() {
  digits=${1:-16}

  cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w $digits | head -n 1
}
