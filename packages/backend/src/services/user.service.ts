import {
  adressIndex,
  documentClient,
  dynamodbTable,
  emailIndex,
  tokenIndex,
} from "../db";
import { User } from "../entities/user.entity";

export const userByIndex = async (
  index: string,
  key: string,
  value: unknown
) => {
  const { Items } = await documentClient
    .query({
      TableName: dynamodbTable,
      IndexName: index,
      ExpressionAttributeValues: {
        ":indexValue": value,
      },
      ExpressionAttributeNames: {
        "#indexName": key,
      },
      KeyConditionExpression: "#indexName = :indexValue",
    })
    .promise();

  if (!Items || Items?.length === 0) {
    return;
  }

  return new User(Items[0]);
};

export const userById = async (id: string) => {
  const { Item } = await documentClient
    .get({
      TableName: dynamodbTable,
      Key: {
        id,
      },
    })
    .promise();

  if (!Item) {
    return;
  }

  return new User(Item);
};

export const userByEmail = async (email: string): Promise<User | undefined> =>
  userByIndex(emailIndex, "email", email);

export const userByToken = async (token: string): Promise<User | undefined> =>
  userByIndex(tokenIndex, "token", token);

export const createUser = async (newUser: User): Promise<User | undefined> => {
  const { $response } = await documentClient
    .put({
      TableName: dynamodbTable,
      Item: newUser,
    })
    .promise();

  if ($response.error) {
    return;
  }

  return newUser;
};

export const usersByAdress = async (
  postalCode: string,
  street: string,
  houseNumber: string
) => {
  const { Items } = await documentClient
    .query({
      TableName: dynamodbTable,
      IndexName: adressIndex,
      ExpressionAttributeNames: {
        "#street": "street",
        "#postalCode": "postalCode",
        "#houseNumber": "houseNumber",
      },
      ExpressionAttributeValues: {
        ":street": street,
        ":postalCode": postalCode,
        ":houseNumber": houseNumber,
      },
      KeyConditionExpression: "#street = :street and #postalCode = :postalCode",
      FilterExpression: "#houseNumber = :houseNumber",
    })
    .promise();

  if (!Items) {
    return [];
  }

  return Items as User[];
};
