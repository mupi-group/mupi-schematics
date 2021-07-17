locals {
  name                  = "${var.env}-${var.name}-app-vpc"
  cidr                  = "10.0.0.0/16"
  secondary_cidr_blocks = ["10.1.0.0/16", "10.2.0.0/16"]
  public_subnets        = ["10.0.0.0/19", "10.0.32.0/19", "10.0.64.0/19"]
  private_subnets       = ["10.0.96.0/19", "10.0.128.0/19", "10.0.160.0/19"]

  network_acls = {
    default_inbound = [
      {
        rule_number = 1000
        rule_action = "allow"
        from_port   = 1024
        to_port     = 65535
        protocol    = "tcp"
        cidr_block  = "0.0.0.0/0"
      },
      {
        rule_number = 1010
        rule_action = "allow"
        from_port   = 1024
        to_port     = 65535
        protocol    = "udp"
        cidr_block  = "0.0.0.0/0"
      },
    ]
    default_outbound = [
      {
        rule_number = 1000
        rule_action = "allow"
        from_port   = 32768
        to_port     = 65535
        protocol    = "tcp"
        cidr_block  = "0.0.0.0/0"
      },
      {
        rule_number = 1010
        rule_action = "allow"
        from_port   = 32768
        to_port     = 65535
        protocol    = "udp"
        cidr_block  = "0.0.0.0/0"
      },
    ]
    private_inbound = [
      {
        rule_number = 100
        rule_action = "allow"
        protocol    = "icmp"
        icmp_code   = -1
        icmp_type   = -1
        cidr_block  = "0.0.0.0/0"
      },
      {
        rule_number     = 110
        rule_action     = "allow"
        protocol        = "icmp"
        icmp_code       = -1
        icmp_type       = -1
        ipv6_cidr_block = "::/0"
      },
      {
        rule_number = 120
        rule_action = "allow"
        protocol    = "all"
        cidr_block  = local.cidr
      },
      {
        rule_number = 130
        rule_action = "allow"
        protocol    = "all"
        cidr_block  = local.secondary_cidr_blocks[0]
      },
      {
        rule_number = 140
        rule_action = "allow"
        protocol    = "all"
        cidr_block  = local.secondary_cidr_blocks[1]
      },
    ]
    private_outbound = [
      {
        rule_number = 100
        rule_action = "allow"
        icmp_code   = -1
        icmp_type   = 8
        protocol    = "icmp"
        cidr_block  = "0.0.0.0/0"
      },
      {
        rule_number     = 110
        rule_action     = "allow"
        icmp_code       = -1
        icmp_type       = 8
        protocol        = "icmp"
        ipv6_cidr_block = "::/0"
      },
      {
        rule_number = 120
        rule_action = "allow"
        protocol    = "all"
        cidr_block  = local.cidr
      },
      {
        rule_number = 130
        rule_action = "allow"
        protocol    = "all"
        cidr_block  = local.secondary_cidr_blocks[0]
      },
      {
        rule_number = 140
        rule_action = "allow"
        protocol    = "all"
        cidr_block  = local.secondary_cidr_blocks[1]
      },
    ]
    public_inbound = [
      {
        rule_number = 150
        rule_action = "allow"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_block  = "0.0.0.0/0"
      },
      {
        rule_number = 160
        rule_action = "allow"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_block  = "0.0.0.0/0"
      },
      {
        rule_number = 170
        rule_action = "allow"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_block  = "0.0.0.0/0" # VPN/Office addresses
      },
      {
        rule_number     = 180
        rule_action     = "allow"
        from_port       = 80
        to_port         = 80
        protocol        = "tcp"
        ipv6_cidr_block = "::/0"
      },
    ]
    public_outbound = [
      {
        rule_number = 150
        rule_action = "allow"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_block  = "0.0.0.0/0"
      },
      {
        rule_number = 160
        rule_action = "allow"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_block  = "0.0.0.0/0"
      },
    ]
  }
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name                  = local.name
  cidr                  = local.cidr
  secondary_cidr_blocks = local.secondary_cidr_blocks

  azs              = ["${var.region}a", "${var.region}b"]
  public_subnets   = local.public_subnets
  private_subnets  = local.private_subnets

  create_database_subnet_group = false

  manage_default_route_table = true
  default_route_table_tags   = { DefaultRouteTable = true }

  enable_dns_hostnames = true
  enable_dns_support   = true

  enable_nat_gateway = true
  single_nat_gateway = false
  enable_vpn_gateway = false

  enable_flow_log           = true
  flow_log_destination_type = "s3"
  flow_log_destination_arn  = var.log_bucket_arn

  manage_default_security_group  = true
  default_security_group_ingress = []
  default_security_group_egress  = []

  public_dedicated_network_acl   = true
  public_inbound_acl_rules       = concat(local.network_acls["default_inbound"], local.network_acls["private_inbound"], local.network_acls["public_inbound"])
  public_outbound_acl_rules      = concat(local.network_acls["default_outbound"], local.network_acls["private_outbound"], local.network_acls["public_outbound"])
  private_dedicated_network_acl  = true
  private_inbound_acl_rules      = concat(local.network_acls["default_inbound"], local.network_acls["private_inbound"])
  private_outbound_acl_rules     = concat(local.network_acls["default_outbound"], local.network_acls["private_outbound"])
  manage_default_network_acl     = true
}