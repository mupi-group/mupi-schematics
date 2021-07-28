import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { <%= classify(name) %>Input } from '../../type/module/<%= name %>/<%= name %>.resolver.type';

export const formatScanInputParams = (input: <%= classify(name) %>Input) => {
  const result = {};
  Object.keys(input)
    .forEach((key) => {
      switch (typeof input[key]) {
        case 'string':
          result[key] = {
            S: input[key],
          };
          break;
        case 'number':
          result[key] = {
            N: input[key],
          };
          break;
        default:
          break;
      }
    });
  return result;
};

export const formatUpdateInputParams = (input: <%= classify(name) %>Input) => {
  let updateExpression: DocumentClient.UpdateExpression = '';
  const expressionAttributeNames: DocumentClient.ExpressionAttributeNameMap = {};
  const expressionAttributeValues: DocumentClient.ExpressionAttributeValueMap = {};

  Object.keys(input).forEach((key) => {
    // handle expression
    if (!updateExpression.length) updateExpression += ` SET #${key} = :${key}`;
    updateExpression += `, SET #${key} = :${key}`;

    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = input[key];
  });

  return {
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  };
};