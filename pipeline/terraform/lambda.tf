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
  function_name = "superhero-api-lambda"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "app.handler"
  source_code_hash = filebase64sha256("../../build/function.zip")
  timeout = 30
  runtime = "nodejs12.x"
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
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.basic_execution_role.arn
}
