/* types import */
import {
  <%= classify(name) %>,
  QuerySpecific<%= classify(name) %>Params,
  Query<%= classify(name) %>sParams,
  MutationCreate<%= classify(name) %>,
  <%= classify(name) %>Paginated,
  MutationDelete<%= classify(name) %>,
  MutationUpdate<%= classify(name) %>,
} from './<%= name %>.type';

/* Datasource */
import { <%= classify(name) %>Datasource } from './<%= name %>.datasource';

/**
 * @description <%= classify(name) %> resolver
 */
export const <%= name %>Resolvers = {
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
      { dataSources: { <%= name %>Datasource } }:
      { dataSources: { <%= name %>Datasource:<%= classify(name) %>Datasource } },
    ): Promise<<%= classify(name) %>> {
      return <%= name %>Datasource.querySpecific<%= classify(name) %>(params);
    },

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
      { dataSources: { <%= name %>Datasource } }:
      { dataSources: { <%= name %>Datasource:<%= classify(name) %>Datasource } },
    ): Promise<<%= classify(name) %>Paginated> {
      return <%= name %>Datasource.queryPaginated<%= classify(name) %>s(params);
    },
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
      { dataSources: { <%= name %>Datasource } }:
      { dataSources: { <%= name %>Datasource:<%= classify(name) %>Datasource } },
    ): Promise<boolean> {
      return <%= name %>Datasource.create<%= classify(name) %>(params);
    },
    /**
         * @description Mutation update <%= name %>
         * @param parent
         * @param params
         * @param <%= name %>Datasource
         * @param requestContext
         */
    async update<%= classify(name) %>(
      parent,
      params: MutationUpdate<%= classify(name) %>,
      { dataSources: { <%= name %>Datasource } }:
      { dataSources: { <%= name %>Datasource:<%= classify(name) %>Datasource } },
    ): Promise<boolean> {
      return <%= name %>Datasource.update<%= classify(name) %>(params);
    },
    /**
         * @description Mutation delete <%= name %>
         * @param parent
         * @param params
         * @param <%= name %>Datasource
         * @param requestContext
         */
    async delete<%= classify(name) %>(
      parent,
      params: MutationDelete<%= classify(name) %>,
      { dataSources: { <%= name %>Datasource } }:
      { dataSources: { <%= name %>Datasource:<%= classify(name) %>Datasource } },
    ): Promise<boolean> {
      return <%= name %>Datasource.delete<%= classify(name) %>(params);
    },
  },
};
