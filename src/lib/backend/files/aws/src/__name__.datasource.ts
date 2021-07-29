import {
  DocumentClient,
} from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';
import {
  <%= classify(name) =>,
  <%= classify(name) =>Paginated,
  QuerySpecific<%= classify(name) =>Params,
  Query<%= classify(name) =>sParams,
  MutationCreate<%= classify(name) =>,
  MutationUpdate<%= classify(name) =>,
  MutationDelete<%= classify(name) =>,
} from './<%= name =>.type';
import { formatScanInputParams, formatUpdateInputParams } from './<%= name =>.util';

/**
 * @description <%= classify(name) => datasource for query modifying the <%= name =>
 */
export class <%= classify(name) =>Datasource {
  private client: DocumentClient;

  constructor() {
    this.client = new DocumentClient();
  }

  /**
     * @description Query specific <%= name =>
     * @param input
     */
  async querySpecific<%= classify(name) =>(input: QuerySpecific<%= classify(name) =>Params): Promise<<%= classify(name) =>> {
    const { <%= typescriptTypeIDPropertyKey => } = input;

    return new Promise<<%= classify(name) =>>((resolve, reject) => {
      this.client.get({
        TableName: '<%= name =>',
        Key: { <%= typescriptTypeIDPropertyKey => },
      }, (err, data) => {
        if (err) reject(err);
        resolve(data as <%= classify(name) =>);
      });
    });
  }

  /**
     * @description Query paginated <%= name =>s
     * @param input
     */
  async queryPaginated<%= classify(name) =>s(input: Query<%= classify(name) =>sParams): Promise<<%= classify(name) =>Paginated> {
    const { limit, startKey, <%= name =>Input } = input;

    const scan = () => new Promise<DocumentClient.ScanOutput>((resolve, reject) => {
      this.client.scan({
        TableName: '<%= name =>',
        ConsistentRead: true,
        Limit: limit,
        ExclusiveStartKey: { <%= typescriptTypeIDPropertyKey =>: startKey },
        ExpressionAttributeValues: formatScanInputParams(<%= name =>Input),
      }, (_, output: DocumentClient.ScanOutput) => {
        if (_) reject(_);
        resolve(output);
      });
    });

    const { Items, Count, LastEvaluatedKey } = await scan();

    return ({
      items: Items as <%= classify(name) =>[],
      count: Count,
      endKey: LastEvaluatedKey.<%= typescriptTypeIDPropertyKey =>,
    });
  }

  /**
     * @description create <%= name =>
     * @param input
     */
  async create<%= classify(name) =>(input: MutationCreate<%= classify(name) =>): Promise<boolean> {
    const { <%= name =>Input } = input;

    return new Promise<boolean>((resolve, reject) => {
      this.client.put({
        TableName: '<%= name =>',
        Item: {
          ...<%= name =>Input,
          <%= typescriptTypeIDPropertyKey =>: uuidv4(),
        },
      }, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  /**
     * @description update <%= name =>
     * @param input
     */
  async update<%= classify(name) =>(input: MutationUpdate<%= classify(name) =>): Promise<boolean> {
    const { <%= typescriptTypeIDPropertyKey =>, <%= name =>Input } = input;

    const {
      updateExpression,
      expressionAttributeValues,
      expressionAttributeNames,
    } = formatUpdateInputParams(<%= name =>Input);

    return new Promise<boolean>((resolve, reject) => {
      this.client.update({
        TableName: '<%= name =>',
        Key: { <%= typescriptTypeIDPropertyKey => },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      }, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  /**
     * @description delete <%= name =>
     * @param input
     */
  async delete<%= classify(name) =>(input: MutationDelete<%= classify(name) =>): Promise<boolean> {
    const { <%= typescriptTypeIDPropertyKey => } = input;

    return new Promise<boolean>((resolve, reject) => {
      this.client.delete({
        TableName: '<%= name =>',
        Key: { <%= typescriptTypeIDPropertyKey => },
      }, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}
