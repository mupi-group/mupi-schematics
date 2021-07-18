terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      # registry.terraform.io/hashicorp/aws
      version = "~> 3.44"
    }
  }

  required_version = ">= 0.14.9"
}
