terraform {
    backend "s3" {
        bucket = "terraform-state-ecobot"
        key = "ecobot-feature-service"
        region = "us-east-2"
   }
}

provider "aws" {}
