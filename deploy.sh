#!/bin/bash
./build.sh

pushd pipeline/terraform

terraform init && terraform plan && terraform apply

popd 

rm -rf build