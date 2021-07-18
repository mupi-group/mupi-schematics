module "<%= name %>" {
  source                 = "../../service/serverless"
  env                    = var.env
  name                   = var.name
  model                  = "test"
  integration_uri        = module.infrastructure.load_balance_integration_uri
  s3_bucket              = module.infrastructure.app_bucket_id
  subnets                = module.infrastructure.vpc_subnet_ids_private
  vpc_id                 = module.infrastructure.vpc_id
  vpc_security_group_ids = module.infrastructure.vpc_security_group_ids
}