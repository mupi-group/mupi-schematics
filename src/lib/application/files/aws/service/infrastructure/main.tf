module "vpc" {
  source = "./vpc"
  env = var.env
  name = var.name
  region = var.region
  log_bucket_arn = module.log_bucket.log_bucket_arn
}

module "log_bucket" {
  source = "./log-bucket"
  env = var.env
  name = var.name
}

module "app_bucket" {
  source = "./app-bucket"
  env = var.env
  name = var.name
}

module "load_balance" {
  source = "./load-balance"
  env = var.env
  name = var.name
  vpc_id = module.vpc.vpc_id
  subnets = module.vpc.subnet_ids_public
}