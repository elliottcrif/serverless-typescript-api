resource "aws_api_gateway_rest_api" "api" {
  name        = "EcobotFeatureServiceAPI"
  description = "This is API exposes a RESTful interface to interact with an ArcGIS Feature Service"
}
resource "aws_api_gateway_resource" "feature-resource" {
  path_part   = "features"
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_resource" "project-resource" {
  path_part   = "{projectID}"
  parent_id   = aws_api_gateway_resource.feature-resource.id
  rest_api_id = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "get-method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.project-resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "post-method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.project-resource.id
  http_method   = "POST"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "post-integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.project-resource.id
  http_method             = aws_api_gateway_method.post-method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.api_lambda.invoke_arn
}

resource "aws_api_gateway_integration" "get-integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.project-resource.id
  http_method             = aws_api_gateway_method.get-method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.api_lambda.invoke_arn
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
      aws_api_gateway_integration.get-integration,
      aws_api_gateway_integration.post-integration
      ]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "v1"
}

resource "aws_api_gateway_stage" "stage" {
  stage_name = "v1"
  deployment_id = aws_api_gateway_deployment.deployment.id
  rest_api_id = aws_api_gateway_rest_api.api.id
}


resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*/*"
}

