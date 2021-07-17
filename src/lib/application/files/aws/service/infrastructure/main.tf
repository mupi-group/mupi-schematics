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