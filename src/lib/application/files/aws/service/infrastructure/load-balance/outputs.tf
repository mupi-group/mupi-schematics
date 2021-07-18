output "integration_uri" {
  value = module.alb.http_tcp_listener_arns[0]
}