# app bucket
output "app_bucket_arn" {
  value = module.app_bucket.app_bucket_arn
}

output "app_bucket_id" {
  value = module.app_bucket.app_bucket_id
}

# log bucket
output "log_bucket_arn" {
  value = module.log_bucket.log_bucket_arn
}

# load balance
output "load_balance_integration_uri" {
  value = module.load_balance.integration_uri
}

# vpc
output "vpc_subnet_ids_public" {
  value = module.vpc.subnet_ids_public
}
output "vpc_subnet_ids_private" {
  value = module.vpc.subnet_ids_private
}
output "vpc_id" {
  value = module.vpc.vpc_id
}
output "vpc_security_group_ids" {
  value = module.vpc.security_group_ids
}