import { gql } from 'apollo-server-lambda';

export const <%= name %>TypeDefs = gql`
  """<%= title %>, <%= subtitle %>"""
  type <%= classify(name) %> {
  <%= graphqlSchemaItems %>
  }

  type <%= classify(name) %>Paginated {
    items: [<%= classify(name) %>]
    count: Int
    endKey: String
  }

  input <%= classify(name) %>Input {
  <%= graphqlSchemaInputItems %>
  }

  type Query {
    <%= name %>(<%= graphqlSchemaIDPropertyKey %>: String!): <%= classify(name) %>
    <%= name %>s(<%= name %>Input: <%= classify(name) %>Input, limit: Int, startKey: String): <%= classify(name) %>Paginated
  }

  type Mutation {
    create<%= classify(name) %>(<%= name %>Input: <%= classify(name) %>Input): Boolean!
    update<%= classify(name) %>(<%= graphqlSchemaIDPropertyKey %>: String!, <%= name %>Input: <%= classify(name) %>Input): Boolean!
    delete<%= classify(name) %>(<%= graphqlSchemaIDPropertyKey %>: String!): Boolean!
  }
`;
