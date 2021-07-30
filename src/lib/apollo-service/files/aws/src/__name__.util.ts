import {
  UpdateExpression,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
} from 'aws-sdk/clients/dynamodb';
import { <%= classify(name) %>Input } from './<%= name %>.type';

export const formatInputParams = (input: <%= classify(name) %>Input, update: boolean) => {
  let expression: UpdateExpression = '';
  const expressionAttributeNames: ExpressionAttributeNameMap = {};
  const expressionAttributeValues: ExpressionAttributeValueMap = {};

  Object.keys(input).forEach((key) => {
    if (update) {
      // handle expression
      if (!expression) expression += ` SET #${key} = :${key}`;
      else expression += `, SET #${key} = :${key}`;
    } else {
      // handle expression
      // eslint-disable-next-line no-lonely-if
      if (!expression) expression += `#${key} = :${key}`;
      else expression += `, #${key} = :${key}`;
    }

    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = input[key];
  });

  return {
    expression,
    expressionAttributeNames,
    expressionAttributeValues,
  };
};
