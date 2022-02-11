#!/bin/bash
cd ./test/modules/shellnium
source ./lib/selenium.sh
cd ../../../

main() {
  navigate_to 'http://localhost:8000/user'
}

