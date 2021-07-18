module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 6.0"

  name = "${var.env}-${var.name}-alb"

  vpc_id          = var.vpc_id
  security_groups = [module.alb_security_group.security_group_id]
  subnets         = var.subnets

  http_tcp_listeners = [
    {
      port               = 80
      protocol           = "HTTP"
      target_group_index = 0
      action_type        = "forward"
    }
  ]

  target_groups = [
    {
      name_prefix = "l1-"
      target_type = "lambda"
    }
  ]
}

module "alb_security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name        = "alb-sg-${var.env}-${var.name}"
  description = "ALB for ${var.env}-${var.name}-app"
  vpc_id          = var.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["http-80-tcp"]

  egress_rules = ["all-all"]
}