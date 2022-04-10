#!/bin/bash

function complementExtension() {
  file_name=$1
  extension=$2

  extension_of_file_name=`echo $file_name | sed -r 's#.*\.([^\.]*)$#\1#g'`
  extension_of_exclude_period=`echo $extension | sed -r 's#.*\.([^\.]*)$#\1#g'`
  if [ $extension_of_file_name = $extension_of_exclude_period ] ; then
    echo $file_name
    exit 0
  fi

  extension=`echo $extension | sed -r 's#\.(.*)#\1#g'`
  extension=.$extension

  complete_file_name=$file_name$extension
  echo $complete_file_name
}


function excludeExtension() {
  file_name=$1

  excude_extension_file_name=`echo $file_name | sed -r 's#\.([^\.]*)$##g'`
  echo $excude_extension_file_name
}
