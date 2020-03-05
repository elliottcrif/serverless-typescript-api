resource "aws_s3_bucket" "bucket" {
  bucket = "ecobot-shapefile-bucket"
  acl      = "private"
  cors_rule {
    allowed_methods = ["HEAD", "GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
    expose_headers = ["x-amz-server-side-encryption", "x-amz-request-id", "x-amz-id-2", "ETag"]
    allowed_headers = ["*"]
  }
}
