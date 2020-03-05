variable "ESRI_FEATURE_SERVICE_URL" {} 
variable "ESRI_USERNAME" {} 
variable "ESRI_PASSWORD" {} 

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}