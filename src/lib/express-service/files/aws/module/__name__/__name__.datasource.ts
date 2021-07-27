/* import types */
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

/* related modules */
import { DynamoDBDataSource } from 'apollo-datasource-dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import {CognitoIdentityCredentials} from "aws-sdk";
import ClientConfiguration = CognitoIdentityCredentials.ClientConfiguration;

/**
 * @description <%= classify(name) %> datasource for query modifying the <%= name %>
 */
export class <%= classify(name) %>Datasource extends DynamoDBDataSource<<%= classify(name) %>>{

    constructor(config?: ClientConfiguration) {
        super('<%= name %>', [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ], config);
    }

    /**
     * @description Query specific <%= name %>
     * @param input
     */
    async querySpecific<%= classify(name) %>(input: QuerySpecific<%= classify(name) %>Params): Promise<<%= classify(name) %>> {}

    /**
     * @description Query paginated <%= name %>s
     * @param input
     */
    async queryPaginated<%= classify(name) %>s(input: Query<%= classify(name) %>sParams): Promise<<%= classify(name) %>[]> {}

    /**
     * @description create <%= name %>
     * @param input
     */
    async create<%= classify(name) %>(input: MutationCreate<%= classify(name) %>): Promise<boolean> {}

    /**
     * @description update <%= name %>
     * @param input
     */
    async update<%= classify(name) %>(input: MutationUpdate<%= classify(name) %>): Promise<boolean> {}

    /**
     * @description delete <%= name %>
     * @param input
     */
    async delete<%= classify(name) %>(input: MutationDelete<%= classify(name) %>): Promise<boolean> {}
}
