#!/bin/bash

if [ ! -d ./node_modules ]; then
  npm ci 
fi

if [ ! -d ./dist ]; then
  tsc
fi

node ./dist/express/app.js
