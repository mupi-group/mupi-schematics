module "lambda_function" {
  # basic
  source = "terraform-aws-modules/lambda/aws"
  runtime = "nodejs14.x"
  publish = true
  function_name = "${var.env}-${var.name}-${var.model}"
  handler = "index.main"
  source_path = "${path.root}/../../build/backend/${var.model}/index.js"

  # store lambda in S3
  store_on_s3 = true
//  s3_bucket = data.aws_s3_bucket.serverless_artifacts_bucket.id
  s3_bucket = var.s3_bucket

  # vpc
  attach_network_policy = true
  vpc_subnet_ids = var.subnets
//  vpc_subnet_ids = data.aws_subnet_ids.aws_subnet_ids_public.ids
  vpc_security_group_ids = var.vpc_security_group_ids
//  vpc_security_group_ids = [data.aws_security_group.serverless_security_group.id]

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service    = "apigateway"
//      source_arn = "${aws_api_gateway_api_key.apiKey.arn}/*/*/*"
      source_arn = "${var.api_gateway_api_execution_arn}/*/*/*"
    }
  }
}

module "lambda_security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name        = "lambda-sg-${var.env}-${var.name}-${var.model}"
  description = "Lambda security group for example usage"
//  vpc_id      = data.aws_subnet_ids.aws_subnet_ids_public.vpc_id
  vpc_id = var.vpc_id

  computed_ingress_with_source_security_group_id = [
    {
      rule                     = "http-80-tcp"
//      source_security_group_id = module.api_gateway_security_group.security_group_id
      source_security_group_id = var.api_gateway_security_group_id
    }
  ]
  number_of_computed_ingress_with_source_security_group_id = 1

  egress_rules = ["all-all"]
}