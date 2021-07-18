output "api_gateway_api_execution_arn" {
  value = module.api_gateway.apigatewayv2_api_execution_arn
}

output "api_gateway_security_group_ids" {
  value = module.api_gateway_security_group.security_group_id
}