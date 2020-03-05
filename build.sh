#!/bin/bash
mkdir -p build 

npm ci

npm run build

cp -r node_modules build/node_modules

zip -rqFS function.zip build 
