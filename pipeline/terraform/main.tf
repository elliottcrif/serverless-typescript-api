terraform {
    backend "s3" {
        bucket = "terraform-state-elliottcrifasi"
        key = "superhero-api"
        region = "us-east-2"
   }
}

provider "aws" {}
