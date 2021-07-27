import type { StartApolloServerModuleParam } from '../../type/util/apollo-server.type';
import { generateTypeDefs } from '../../common/util/apollo-server';
import { <%= name %>Resolver } from './<%= name %>.resolver';
import { <%= classify(name) %>Datasource } from './<%= name %>.datasource';
import { <%= classify(name) %>DebugDatasource } from './<%= name %>.debug.datasource';

const <%= name %>TypeDefs = generateTypeDefs(
    'module/<%= name %>/<%= name %>.graphql',
);

export const <%= classify(name) %>Module: StartApolloServerModuleParam = {
    typeDefs: [
        <%= name %>TypeDefs,
    ],
    dataSources: {
        <%= name %>Datasource: new <%= classify(name) %>Datasource(),
        <%= name %>DebugDatasource: new <%= classify(name) %>DebugDatasource(),
    },
    resolvers: [
        <%= name %>Resolver,
    ],
};
