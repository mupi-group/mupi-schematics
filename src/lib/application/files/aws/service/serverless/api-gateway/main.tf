module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name = "${var.env}-${var.name}-${var.model}-vpc-gateway"
  protocol_type = "HTTP"

  cors_configuration = {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["*"]
  }

  create_api_domain_name = false

  integrations = {
    "ANY /" = {
//      lambda_arn             = module.adv_lambda_function.lambda_function_arn
      lambda_arn             = var.lambda_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }

    "GET /alb-internal-route" = {
      connection_type    = "VPC_LINK"
      vpc_link           = "lambda-vpc"
//      integration_uri    = module.alb.http_tcp_listener_arns[0]
      integration_uri = var.integration_uri
      integration_type   = "HTTP_PROXY"
      integration_method = "ANY"
    }

    "$default" = {
//      lambda_arn = module.adv_lambda_function.lambda_function_arn
      lambda_arn = var.lambda_arn
    }
  }

  vpc_links = {
    lambda-vpc = {
      name               = "${var.env}-${var.name}-${var.model}-vpc"
      security_group_ids = [module.api_gateway_security_group.security_group_id]
//      subnet_ids         = data.aws_subnet_ids.aws_subnet_ids_public.ids
      subnet_ids = var.subnets
    }
  }

  tags = {
    Name = "lambda-private-api"
  }

}

module "api_gateway_security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name        = "api-gateway-sg-${var.env}-${var.name}-${var.model}"
  description = "API Gateway group for example usage"
//  vpc_id      = data.aws_subnet_ids.aws_subnet_ids_public.vpc_id
  vpc_id = var.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["http-80-tcp"]

  egress_rules = ["all-all"]
}