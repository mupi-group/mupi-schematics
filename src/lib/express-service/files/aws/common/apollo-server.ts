/* node modules */
import { readFileSync } from 'fs';
import { resolve } from 'path';

/* types */
import {
    ApolloServerPlugin,
    StartApolloServerParam,
    StartApolloServerReturned,
} from '@type/apollo-server.type';

/* module dependencies */
import { ApolloServer, gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';
import { logger } from '@common/util/logger';
import { DatasourceCollection } from '@type/datasource';

/**
 * @description Generate the graphql typeDefs from *.graphql files
 * @param typeDefFileName
 */
export function generateTypeDefs(typeDefFileName: string): DocumentNode {
    return gql`${readFileSync(resolve(__dirname, '../../', typeDefFileName), 'utf8')}`;
}

/**
 * @description format express req to requestContext Object
 * @param req
 */
export const formatExpressRequest = ({ req }) => ({ requestContext: req });

export const formatApolloDatasource = (dataSources) => () => dataSources;
/**
 * @description Inject Apollo Server into Express App async, and return both two instances back
 * @param app
 * @param typeDefs
 * @param config
 * @return { server, app }
 */
export async function startApolloServer({
                                            app,
                                            modules,
                                            config,
                                        }: StartApolloServerParam): Promise<StartApolloServerReturned> {
    // import root typeDef for extend
    const rootTypeDefs = [generateTypeDefs('root.graphql')];
    const rootResolvers = [];
    let rootDataSources: DatasourceCollection = {};

    modules.forEach(({ resolvers, dataSources, typeDefs }) => {
        rootTypeDefs.push(...typeDefs);
        rootResolvers.push(...resolvers);
        rootDataSources = Object.assign(rootDataSources, dataSources);
    });

    // apply graphql configs
    const apolloServer = new ApolloServer({
        ...config,
        typeDefs: rootTypeDefs,
        resolvers: rootResolvers,
        dataSources: formatApolloDatasource(rootDataSources),
        context: formatExpressRequest,
    });

    // start graphql server
    await apolloServer.start();

    // apply app on gql server
    apolloServer.applyMiddleware({ app });

    return { app, apolloServer };
}

/**
 * @description Custom the behaviour of apollo request lifecycle hook
 */
export const apolloServerHookPlugin: ApolloServerPlugin = {
    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext) {
        if (
            // disable server logger when introspecting
            requestContext.request.operationName !== 'IntrospectionQuery'
        ) {
            logger.info(`Request started! Query:\n${
                requestContext.request.query}`);
        }

        return {
            // TODO: more hooks injection
        };
    },
};
