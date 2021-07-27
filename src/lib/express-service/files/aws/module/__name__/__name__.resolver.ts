/* types import */
import type { IResolvers } from '@graphql-tools/utils';
import {
    <%= classify(name) %>,
    <%= classify(name) %>Input,
    <%= classify(name) %>Paginated,
    QuerySpecific<%= classify(name) %>Params,
    Query<%= classify(name) %>sParams,
    MutationCreate<%= classify(name) %>,
    MutationUpdate<%= classify(name) %>,
    MutationDelete<%= classify(name) %>
} from "../../type/module/<%= name %>/<%= name %>.resolver.type";
import type { DatasourceCollection } from '../../type/datasource';
import type { Request } from 'express';

/**
 * @description <%= classify(name) %> resolver
 */
export const <%= name %>Resolver: IResolvers = {
    Query: {
        /**
         * @description Query specific <%= name %>
         * @param parent
         * @param params
         * @param <%= name %>Datasource
         * @param requestContext
         */
        async <%= name %>(
            parent,
            params: QuerySpecific<%= classify(name) %>Params,
            { dataSources: { <%= name %>Datasource }, requestContext }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<<%= classify(name) %>> {},

        /**
         * @description Query <%= name %>s
         * @param parent
         * @param params
         * @param <%= name %>Datasource
         * @param requestContext
         */
        async <%= name %>s(
            parent,
            params: Query<%= classify(name) %>sParams,
            { dataSources: { <%= name %>Datasource }, requestContext }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<<%= classify(name) %>> {},
    },
    Mutation: {
        /**
         * @description Mutation create <%= name %>
         * @param parent
         * @param params
         * @param <%= name %>Datasource
         * @param requestContext
         */
        async create<%= classify(name) %>(
            parent,
            params: MutationCreate<%= classify(name) %>,
            { dataSources: { <%= name %>Datasource }, requestContext }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<boolean> {},
        /**
         * @description Mutation update <%= name %>
         * @param parent
         * @param params
         * @param <%= name %>Datasource
         * @param requestContext
         */
        async update<%= classify(name) %>(
            parent,
            params: MutationCreate<%= classify(name) %>,
            { dataSources: { <%= name %>Datasource }, requestContext }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<boolean> {},
        /**
         * @description Mutation delete <%= name %>
         * @param parent
         * @param params
         * @param <%= name %>Datasource
         * @param requestContext
         */
        async delete<%= classify(name) %>(
            parent,
            params: MutationCreate<%= classify(name) %>,
            { dataSources: { <%= name %>Datasource }, requestContext }:
                { dataSources: DatasourceCollection, requestContext: Request },
        ): Promise<boolean> {},
    }
};
