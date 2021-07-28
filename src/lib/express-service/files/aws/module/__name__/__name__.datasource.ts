/* related modules */
import { DynamoDBDataSource } from 'apollo-datasource-dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { CognitoIdentityCredentials } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
<%= classify(name) %>,
    <%= classify(name) %>Paginated,
    QuerySpecific<%= classify(name) %>Params,
    Query<%= classify(name) %>sParams,
    MutationCreate<%= classify(name) %>,
    MutationUpdate<%= classify(name) %>,
    MutationDelete<%= classify(name) %>,
} from '../../type/module/<%= name %>/<%= name %>.resolver.type';
import ClientConfiguration = CognitoIdentityCredentials.ClientConfiguration;
import { formatScanInputParams, formatUpdateInputParams } from '../../common/util/dynamodb';

/**
 * @description <%= classify(name) %> datasource for query modifying the <%= name %>
 */
export class <%= classify(name) %>Datasource extends DynamoDBDataSource<<%= classify(name) %>> {
    constructor(config?: ClientConfiguration) {
        super('<%= name %>', [
            {
                AttributeName: '<%= typescriptTypeIDPropertyKey %>',
                KeyType: 'HASH',
            },
        ], config);
    }

    /**
     * @description Query specific <%= name %>
     * @param input
     */
    async querySpecific<%= classify(name) %>(input: QuerySpecific<%= classify(name) %>Params): Promise<<%= classify(name) %>> {
    const { <%= typescriptTypeIDPropertyKey %> } = input;

const getItemInput: DocumentClient.GetItemInput = {
        TableName: '<%= name %>',
        Key: { <%= typescriptTypeIDPropertyKey %> },
    };

return this.getItem(getItemInput);
}

/**
 * @description Query paginated <%= name %>s
 * @param input
 */
async queryPaginated<%= classify(name) %>s(input: Query<%= classify(name) %>sParams): Promise<<%= classify(name) %>Paginated> {
    const { limit, startKey, <%= name %>Input } = input;

const scanInput: DocumentClient.ScanInput = {
    TableName: '<%= name %>',
    ConsistentRead: true,
    Limit: limit,
    ExclusiveStartKey: { <%= typescriptTypeIDPropertyKey %>: startKey },
ExpressionAttributeValues: formatScanInputParams(<%= name %>Input),
};

const scan = () => new Promise<DocumentClient.ScanOutput>((resolve, reject) => {
    this.dynamoDbDocClient.scan(scanInput, (_, output: DocumentClient.ScanOutput) => {
        if (_) reject(_);
        resolve(output);
    });
});

const { Items, Count, LastEvaluatedKey } = await scan();

return ({
    items: Items as <%= classify(name) %>[],
    count: Count,
    endKey: LastEvaluatedKey.<%= typescriptTypeIDPropertyKey %>,
});
}

/**
 * @description create <%= name %>
 * @param input
 */
async create<%= classify(name) %>(input: MutationCreate<%= classify(name) %>): Promise<boolean> {
    const { <%= name %>Input } = input;

const created = await this.put({
    ...<%= name %>Input,
<%= typescriptTypeIDPropertyKey %>: uuidv4(),
} as <%= classify(name) %>);

return !!created;
}

/**
 * @description update <%= name %>
 * @param input
 */
async update<%= classify(name) %>(input: MutationUpdate<%= classify(name) %>): Promise<boolean> {
    const { <%= typescriptTypeIDPropertyKey %>, <%= name %>Input } = input;

const {
    updateExpression,
    expressionAttributeValues,
    expressionAttributeNames,
} = formatUpdateInputParams(<%= name %>Input);

const updated = await this.update(
    { <%= typescriptTypeIDPropertyKey %> },
updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
);

return !!updated;
}

/**
 * @description delete <%= name %>
 * @param input
 */
async delete<%= classify(name) %>(input: MutationDelete<%= classify(name) %>): Promise<boolean> {
    const { <%= typescriptTypeIDPropertyKey %> } = input;
await this.delete({ <%= typescriptTypeIDPropertyKey %> });
return true;
}
}
