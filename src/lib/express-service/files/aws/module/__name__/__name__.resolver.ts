/* types import */
import type { IResolvers } from '@graphql-tools/utils';
import type { Request } from 'express';
import {
    <%=  classify(name) %>,
    QuerySpecific<%=  classify(name) %>Params,
    Query<%=  classify(name) %>sParams,
    MutationCreate<%=  classify(name) %>, <%=  classify(name) %>Paginated, MutationDelete<%=  classify(name) %>, MutationUpdate<%=  classify(name) %>,
} from '../../type/module/<%=  name %>/<%=  name %>.resolver.type';
import type { DatasourceCollection } from '../../type/datasource';

/**
 * @description <%=  classify(name) %> resolver
 */
export const <%=  name %>Resolver: IResolvers = {
    Query: {
        /**
         * @description Query specific <%=  name %>
         * @param parent
         * @param params
         * @param <%=  name %>Datasource
         * @param requestContext
         */
        async <%=  name %>(
            parent,
            params: QuerySpecific<%=  classify(name) %>Params,
            { dataSources: { <%=  name %>Datasource, <%=  name %>DebugDatasource } }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<<%=  classify(name) %>> {
            return process.env.NODE_ENV !== 'dev'
                ? <%=  name %>Datasource.querySpecific<%=  classify(name) %>(params)
                : <%=  name %>DebugDatasource.querySpecific<%=  classify(name) %>(params);
        },

        /**
         * @description Query <%=  name %>s
         * @param parent
         * @param params
         * @param <%=  name %>Datasource
         * @param requestContext
         */
        async <%=  name %>s(
            parent,
            params: Query<%=  classify(name) %>sParams,
            { dataSources: { <%=  name %>Datasource, <%=  name %>DebugDatasource } }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<<%=  classify(name) %>Paginated> {
            return process.env.NODE_ENV !== 'dev'
                ? <%=  name %>Datasource.queryPaginated<%=  classify(name) %>s(params)
                : <%=  name %>DebugDatasource.queryPaginated<%=  classify(name) %>s(params);
        },
    },
    Mutation: {
        /**
         * @description Mutation create <%=  name %>
         * @param parent
         * @param params
         * @param <%=  name %>Datasource
         * @param requestContext
         */
        async create<%=  classify(name) %>(
            parent,
            params: MutationCreate<%=  classify(name) %>,
            { dataSources: { <%=  name %>Datasource, <%=  name %>DebugDatasource } }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<boolean> {
            return process.env.NODE_ENV !== 'dev'
                ? <%=  name %>Datasource.create<%=  classify(name) %>(params)
                : <%=  name %>DebugDatasource.create<%=  classify(name) %>(params);
        },
        /**
         * @description Mutation update <%=  name %>
         * @param parent
         * @param params
         * @param <%=  name %>Datasource
         * @param requestContext
         */
        async update<%=  classify(name) %>(
            parent,
            params: MutationUpdate<%=  classify(name) %>,
            { dataSources: { <%=  name %>Datasource, <%=  name %>DebugDatasource } }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<boolean> {
            return process.env.NODE_ENV !== 'dev'
                ? <%=  name %>Datasource.update<%=  classify(name) %>(params)
                : <%=  name %>DebugDatasource.update<%=  classify(name) %>(params);
        },
        /**
         * @description Mutation delete <%=  name %>
         * @param parent
         * @param params
         * @param <%=  name %>Datasource
         * @param requestContext
         */
        async delete<%=  classify(name) %>(
            parent,
            params: MutationDelete<%=  classify(name) %>,
            { dataSources: { <%=  name %>Datasource, <%=  name %>DebugDatasource } }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<boolean> {
            return process.env.NODE_ENV !== 'dev'
                ? <%=  name %>Datasource.delete<%=  classify(name) %>(params)
                : <%=  name %>DebugDatasource.delete<%=  classify(name) %>(params);
        },
    },
};
