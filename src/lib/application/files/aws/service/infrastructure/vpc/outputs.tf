output "subnet_ids_public" {
  value = module.vpc.public_subnets
}

output "subnet_ids_private" {
  value = module.vpc.private_subnets
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "security_group_ids" {
  value = [module.vpc.default_security_group_id]
}