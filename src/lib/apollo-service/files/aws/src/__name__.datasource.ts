import {
  AttributeValue,
  DocumentClient, ScanInput,
} from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';
import {
  <%= classify(name) %>,
  <%= classify(name) %>Paginated,
  QuerySpecific<%= classify(name) %>Params,
  Query<%= classify(name) %>sParams,
  MutationCreate<%= classify(name) %>,
  MutationUpdate<%= classify(name) %>,
  MutationDelete<%= classify(name) %>,
} from './<%= name %>.type';
import { formatInputParams } from './<%= name %>.util';

/**
 * @description <%= classify(name) %> datasource for query modifying the <%= name %>
 */
export class <%= classify(name) %>Datasource {
  private client: DocumentClient;

  private TABLE_NAME = '<%= env %>_<%= name %>';

  constructor() {
    this.client = new DocumentClient();
  }

  /**
   * @description Query specific <%= name %>
   * @param input
   */
  async querySpecific<%= classify(name) %>(input: QuerySpecific<%= classify(name) %>Params): Promise<<%= classify(name) %>> {
    try {
      const { <%= typescriptTypeIDPropertyKey %> } = input;

      const { Item } = await this.client.get({
        TableName: this.TABLE_NAME,
        Key: { <%= typescriptTypeIDPropertyKey %> },
      }).promise();

      return Item as <%= classify(name) %>;
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }

  /**
   * @description Query paginated <%= name %>s
   * @param input
   */
  async queryPaginated<%= classify(name) %>s(input: Query<%= classify(name) %>sParams): Promise<<%= classify(name) %>Paginated> {
    try {
      const { limit, startKey, <%= name %>Input = {} } = input;

      const params = {
        TableName: this.TABLE_NAME,
      } as ScanInput;

      if (limit) params.Limit = limit;
      if (startKey) params.ExclusiveStartKey = { <%= typescriptTypeIDPropertyKey %>: startKey as AttributeValue };
      const {
        expression,
        expressionAttributeValues,
        expressionAttributeNames,
      } = formatInputParams(<%= name %>Input, false);

      if (
          expression
          && Object.keys(expressionAttributeValues).length
          && Object.keys(expressionAttributeNames).length
      ) {
        params.FilterExpression = expression;
        params.ExpressionAttributeNames = expressionAttributeNames;
        params.ExpressionAttributeValues = expressionAttributeValues;
      }

      const { Items, Count, LastEvaluatedKey } = await this.client.scan(params).promise();

      return ({
        items: Items as <%= classify(name) %>[],
        count: Count,
        endKey: LastEvaluatedKey ? LastEvaluatedKey.<%= typescriptTypeIDPropertyKey %> : null,
      });
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }

  /**
   * @description create <%= name %>
   * @param input
   */
  async create<%= classify(name) %>(input: MutationCreate<%= classify(name) %>): Promise<boolean> {
    try {
      const { <%= name %>Input } = input;

      const result = await this.client.put({
        TableName: this.TABLE_NAME,
        Item: {
          ...<%= name %>Input,
          <%= typescriptTypeIDPropertyKey %>: uuidv4(),
        },
      }).promise();

      return !!result;
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }

  /**
   * @description update <%= name %>
   * @param input
   */
  async update<%= classify(name) %>(input: MutationUpdate<%= classify(name) %>): Promise<boolean> {
    try {
      const { <%= typescriptTypeIDPropertyKey %>, <%= name %>Input } = input;

      const {
        expression,
        expressionAttributeValues,
        expressionAttributeNames,
      } = formatInputParams(<%= name %>Input, true);

      const result = await this.client.update({
        TableName: this.TABLE_NAME,
        Key: { <%= typescriptTypeIDPropertyKey %> },
        UpdateExpression: expression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      }).promise();

      return !!result;
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }

  /**
   * @description delete <%= name %>
   * @param input
   */
  async delete<%= classify(name) %>(input: MutationDelete<%= classify(name) %>): Promise<boolean> {
    try {
      const { <%= typescriptTypeIDPropertyKey %> } = input;

      const result = await this.client.delete({
        TableName: this.TABLE_NAME,
        Key: { <%= typescriptTypeIDPropertyKey %> },
      }).promise();

      return !!result;
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }
}
