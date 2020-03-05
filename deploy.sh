#!/bin/bash
./build.sh

eval $(ts-node src/awsCredsToEnv.ts) 

pushd pipeline/terraform

terraform init && terraform plan && terraform apply

popd 

rm -rf build