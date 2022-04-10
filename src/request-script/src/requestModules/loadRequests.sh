#!/bin/bash

request_scripts=`find $(find $(pwd) -name "requestModules" ) -mindepth 2 -type f | xargs`
for request_script in ${request_scripts[*]}
do
  source $request_script
done

