import { ApolloServer, Config } from 'apollo-server-lambda';

import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer';
import { <=% name =>TypeDefs } from './src/<=% name =>.schema';
import { <=% name =>Resolvers } from './src/<=% name =>.resolver';
import { <=% classify(name) =>Datasource } from './src/<=% name =>.datasource';

const server = new ApolloServer({
  typeDefs: <=% name =>TypeDefs,
  resolvers: <=% name =>Resolvers,
  dataSources: () => ({
    <=% name =>Datasource: new <=% classify(name) =>Datasource(),
  }),
} as Config<LambdaContextFunctionParams>);

exports.main = server.createHandler();
