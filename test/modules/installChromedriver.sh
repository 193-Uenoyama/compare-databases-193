#!/bin/bash

readonly BASH_XML_READER_TMP=/tmp/BashXmlReader
readonly ORIGINAL_XML_FILE=originalXML
readonly LINEFEEDED_XML_FILE=lineFeededXML
mkdir -p $BASH_XML_READER_TMP

# check softwares installed on this PC.
function hasSoftForWebDriverInstall() {
  targetSoft=$1
  correctCode=0
  incorrectCode=1
  message="please install"

  if [ $targetSoft = "chromedriver" ] ; then
    correctCode=1
    incorrectCode=0
    message="already installed"
  fi

  which $targetSoft > /dev/null
  if [ $? -ne $correctCode ] ; then
    echo $message $targetSoft
    exit $incorrectCode
  fi
}

hasSoftForWebDriverInstall chromedriver
hasSoftForWebDriverInstall google-chrome
hasSoftForWebDriverInstall unzip
hasSoftForWebDriverInstall curl

# confirm installed chrome version.
chromeVersion=`google-chrome --version | sed -e 's/[a-zA-Z]\| //g'`

# cut by "major", "minor", "revision" and "build". from chrome version 
major=`echo $chromeVersion | cut -d . -f 1`
minor=`echo $chromeVersion | cut -d . -f 2`
revision=`echo $chromeVersion | cut -d . -f 3`
build=`echo $chromeVersion | cut -d . -f 4`

# get chromedriver version list.
XMLData=`curl -s https://chromedriver.storage.googleapis.com?delimiter=/&prefix=`
candidatesVersions=`echo $XMLData | sed -E 's#(<[^>]*>)#\n\1\n#g' | grep -v ^$ | grep "^$major\.$minor\.$revision\.[0-9]*"`
candidatesVersionsArray=( `echo $candidatesVersions | sed -E 's#/##g'` )

# select newer version from chromedriver version list.
targetVersion=0
targetVersionBuild=-1
targetVersionIndex=-1
cnt=0
for version in "${candidatesVersionsArray[@]}"
do
  build=`echo $version | cut -d . -f 4`

  if [ $((targetVersionBuild)) -lt $((build)) ] ; then
    targetVersion=$version
    targetVersionBuild=$((build))
    targetVersionIndex=$cnt
  fi

  cnt=$((cnt++))
done

# install chromedriver
cd /tmp
curl -O https://chromedriver.storage.googleapis.com/$targetVersion/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/bin/
rm -rf chromedriver_linux64.zip

