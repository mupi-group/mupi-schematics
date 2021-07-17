module "infrastructure" {
  source = "../../service/infrastructure"
  env    = var.env
  name   = var.name
  region = var.region
}