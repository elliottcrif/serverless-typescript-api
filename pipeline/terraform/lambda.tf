resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "api_lambda" {
  filename      = "../../build/function.zip"
  function_name = "ecobot-feature-service"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "app.handler"
  source_code_hash = filebase64sha256("../../function.zip")
  timeout = 30
  runtime = "nodejs12.x"

  environment {
    variables = {
      ESRI_USERNAME = var.ESRI_USERNAME
      ESRI_PASSWORD = var.ESRI_PASSWORD
      ESRI_FEATURE_SERVICE_URL = var.ESRI_FEATURE_SERVICE_URL,
      SHAPEFILE_BUCKET_NAME = aws_s3_bucket.bucket.id
    }
  }
}

# See also the following AWS managed policy: AWSLambdaBasicExecutionRole
resource "aws_iam_policy" "basic_execution_role" {
  name = "basic_execution"
  path = "/"
  description = "Execution Role"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectVersionAcl",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:PutObjectVersionAcl",
        "s3:PutObjectTagging",
        "s3:PutObjectVersionTagging",
        "s3:DeleteObject",
        "s3:DeleteObjectVersion",
        "s3:DeleteObjectTagging",
        "s3:ListObjects",
        "s3:RestoreObject"
      ],
      "Resource": ["${aws_s3_bucket.bucket.arn}", "${aws_s3_bucket.bucket.arn}/*"]
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role = "${aws_iam_role.iam_for_lambda.name}"
  policy_arn = "${aws_iam_policy.basic_execution_role.arn}"
}
