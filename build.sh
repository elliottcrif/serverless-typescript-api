#!/bin/bash
mkdir -p build 

npm ci

npm run build

cp -r node_modules build/node_modules

pushd build

zip -rqFS function.zip *

popd
