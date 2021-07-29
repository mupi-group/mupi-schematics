import {
  UpdateExpression,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
} from 'aws-sdk/clients/dynamodb';
import { <=% classify(name) =>Input } from './<=% name =>.type';

export const formatScanInputParams = (input: <=% classify(name) =>Input) => {
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

export const formatUpdateInputParams = (input: <=% classify(name) =>Input) => {
  let updateExpression: UpdateExpression = '';
  const expressionAttributeNames: ExpressionAttributeNameMap = {};
  const expressionAttributeValues: ExpressionAttributeValueMap = {};

  Object.keys(input).forEach((key) => {
    // handle expression
    if (!updateExpression) updateExpression += ` SET #${key} = :${key}`;
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
