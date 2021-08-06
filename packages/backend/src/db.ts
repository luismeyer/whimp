import { DynamoDB } from "aws-sdk";

const {
  DYNAMODB_TABLE,
  IS_OFFLINE,
  EMAIL_GSI,
  TOKEN_GSI,

  ADRESS_GSI,
} = process.env;

if (!DYNAMODB_TABLE) {
  throw new Error("Missing env Var: 'DYNAMODB_TABLE'");
}

if (!EMAIL_GSI) {
  throw new Error("Missing env Var: 'EMAIL_GSI'");
}

if (!TOKEN_GSI) {
  throw new Error("Missing env Var: 'TOKEN_GSI'");
}

if (!ADRESS_GSI) {
  throw new Error("Missing env Var: 'ADRESS_GSI'");
}

export const tokenIndex = TOKEN_GSI;
export const emailIndex = EMAIL_GSI;
export const adressIndex = ADRESS_GSI;

export const dynamodbTable = DYNAMODB_TABLE;

export const documentClient = new DynamoDB.DocumentClient({
  endpoint: IS_OFFLINE && "http://localhost:8000",
});

const attributeNameKey = (key: string) => `#${key}`;
const attributeValueKey = (key: string) => `:${key}`;

export const createExpressionAttributeNames = (
  names: string[]
): Record<string, string> => {
  return names.reduce<Record<string, string>>(
    (acc, key) => ({
      ...acc,
      [attributeNameKey(key)]: key,
    }),
    {}
  );
};

export const createExpressionAttributeValues = <T>(
  updatedObject: T,
  keys: (keyof T & string)[]
): Record<string, T[keyof T]> => {
  return keys.reduce<Record<string, T[keyof T]>>(
    (acc, key) => ({
      ...acc,
      [attributeValueKey(key)]: updatedObject[key],
    }),
    {}
  );
};

export const createUpdateExpression = (keys: string[]): string =>
  `SET ${keys.map(
    (key) => `${attributeNameKey(key)} = ${attributeValueKey(key)}`
  )}`;

export const updateObject = async <T extends { id: string }>(
  updatedObject: T,
  ...keys: (keyof T & string)[]
): Promise<T> => {
  if (!keys || keys.length === 0) {
    return updatedObject;
  }

  // the actual db keys are mapped on to placeholders so we dont accidentally use reserved keyword
  const ExpressionAttributeNames = createExpressionAttributeNames(keys);

  // the values are mapped to strings
  const ExpressionAttributeValues = createExpressionAttributeValues(
    updatedObject,
    keys
  );

  // the update expression sets #attributeNames = :attributeValue
  const UpdateExpression = createUpdateExpression(keys);

  await documentClient
    .update({
      TableName: dynamodbTable,
      Key: { id: updatedObject.id },
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      UpdateExpression,
    })
    .promise();

  return updatedObject;
};
