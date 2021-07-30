import {
  AttributeValue,
  DocumentClient, ScanInput,
} from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';
import {
  Todo,
  TodoPaginated,
  QuerySpecificTodoParams,
  QueryTodosParams,
  MutationCreateTodo,
  MutationUpdateTodo,
  MutationDeleteTodo,
} from './<%= name %>.type';
import { formatInputParams } from './<%= name %>.util';

/**
 * @description Todo datasource for query modifying the <%= name %>
 */
export class TodoDatasource {
  private client: DocumentClient;

  private TABLE_NAME = '<%= env %>_<%= name %>';

  constructor() {
    this.client = new DocumentClient();
  }

  /**
   * @description Query specific <%= name %>
   * @param input
   */
  async querySpecificTodo(input: QuerySpecificTodoParams): Promise<Todo> {
    try {
      const { <%= typescriptTypeIDPropertyKey %> } = input;

      const { Item } = await this.client.get({
        TableName: this.TABLE_NAME,
        Key: { <%= typescriptTypeIDPropertyKey %> },
      }).promise();

      return Item as Todo;
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }

  /**
   * @description Query paginated <%= name %>s
   * @param input
   */
  async queryPaginatedTodos(input: QueryTodosParams): Promise<TodoPaginated> {
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
        items: Items as Todo[],
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
  async createTodo(input: MutationCreateTodo): Promise<boolean> {
    try {
      const { <%= name %>Input } = input;

      const { Attributes } = await this.client.put({
        TableName: this.TABLE_NAME,
        Item: {
          ...<%= name %>Input,
          <%= typescriptTypeIDPropertyKey %>: uuidv4(),
        },
      }).promise();

      return !!Attributes;
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }

  /**
   * @description update <%= name %>
   * @param input
   */
  async updateTodo(input: MutationUpdateTodo): Promise<boolean> {
    try {
      const { <%= typescriptTypeIDPropertyKey %>, <%= name %>Input } = input;

      const {
        expression,
        expressionAttributeValues,
        expressionAttributeNames,
      } = formatInputParams(<%= name %>Input, true);

      const { Attributes } = await this.client.update({
        TableName: this.TABLE_NAME,
        Key: { <%= typescriptTypeIDPropertyKey %> },
        UpdateExpression: expression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      }).promise();

      return !!Attributes;
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }

  /**
   * @description delete <%= name %>
   * @param input
   */
  async deleteTodo(input: MutationDeleteTodo): Promise<boolean> {
    try {
      const { <%= typescriptTypeIDPropertyKey %> } = input;

      const { Attributes } = await this.client.delete({
        TableName: this.TABLE_NAME,
        Key: { <%= typescriptTypeIDPropertyKey %> },
      }).promise();

      return !!Attributes;
    } catch (error) {
      console.dir(error, { depth: 4 });
      return error;
    }
  }
}
