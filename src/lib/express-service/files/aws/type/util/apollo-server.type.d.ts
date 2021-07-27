import { Express } from 'express';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import type { IResolvers } from '@graphql-tools/utils';
import { DocumentNode } from 'graphql';
import { DatasourceCollection } from '../datasource';

export type StartApolloServerModuleParam = {
    typeDefs: DocumentNode[];
    resolvers: IResolvers[];
    dataSources: { [key in keyof DatasourceCollection]: DatasourceCollection[key] },
};

/**
 * @description required params for apolloServer func
 */
export type StartApolloServerParam = {
    app: Express;
    modules: StartApolloServerModuleParam[]
    config?: ApolloServerExpressConfig
};

export type StartApolloServerReturned = {
    app: Express;
    apolloServer: ApolloServer
};

/**
 * @description resolve ApolloServerPlugin Type from its prototype
 */
// @ts-ignore
export type ApolloServerPlugin = ApolloServer.prototype.Plugin;
