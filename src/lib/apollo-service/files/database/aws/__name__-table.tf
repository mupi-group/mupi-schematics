module "<%= name %>_table" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name     = "<%= env %>_<%= name %>"
  hash_key = "id"

  stream_enabled = true
  stream_view_type = "NEW_IMAGE"

  attributes = [
    {
      name = "id"
      type = "S"
    }
  ]
}

resource "aws_lambda_event_source_mapping" "<%= name %>_source_mapping" {
  event_source_arn  = module.<%= name %>_table.dynamodb_table_stream_arn
  function_name     = module.<%= name %>.lambda_arn
  starting_position = "LATEST"
}
