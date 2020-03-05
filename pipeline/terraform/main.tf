terraform {
    backend "s3" {
        bucket = "terraform-state-fa7847c1-3e05-4fc6-af3b-10e80fdbf688"
        key = "superhero-api"
        region = "us-east-2"
   }
}

provider "aws" {}
