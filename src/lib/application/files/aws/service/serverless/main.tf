module "serverless_api_gateway" {
  source = "./api-gateway"
  env = var.env
  name = var.name
  model = var.model
  subnets = var.subnets
  vpc_id = var.vpc_id
  integration_uri = var.integration_uri
  lambda_arn = module.serverless_lambda.lambda_arn
}

module "serverless_lambda" {
  source = "./lambda"
  vpc_security_group_ids = var.vpc_security_group_ids
  api_gateway_api_execution_arn = module.serverless_api_gateway.api_gateway_api_execution_arn
  api_gateway_security_group_id = module.serverless_api_gateway.api_gateway_security_group_ids
  env = var.env
  name = var.name
  model = var.model
  s3_bucket = var.s3_bucket
  subnets = var.subnets
  vpc_id = var.vpc_id
}