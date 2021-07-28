resource "aws_dynamodb_table" "<%= name %>_table" {
  name              = "<%= name %>"
  read_capacity     = 20
  write_capacity    = 20
  hash_key          = "<%= typescriptTypeIDPropertyKey %>"
  range_key         = "<%= typescriptTypeIDPropertyKey %>"

<%= databaseAttributes %>
}