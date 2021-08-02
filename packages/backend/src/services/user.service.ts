import {
  documentClient,
  dynamodbTable,
  emailIndex,
  tokenIndex,
  typeIndex,
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
        ":rangeIndexValue": value,
        ":userType": "User",
      },
      ExpressionAttributeNames: {
        "#type": "type",
        "#rangeIndexName": key,
      },
      KeyConditionExpression:
        "#type = :userType and #rangeIndexName = :rangeIndexValue",
    })
    .promise();

  if (!Items || Items?.length === 0) {
    return;
  }

  return Items[0] as User;
};

export const userById = async (id: string) => {
  const { Item } = await documentClient
    .get({
      TableName: dynamodbTable,
      Key: {
        id,
        type: "User",
      },
    })
    .promise();

  return Item as User | undefined;
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

export const allUsers = async (): Promise<User[]> => {
  const { Items } = await documentClient
    .query({
      TableName: dynamodbTable,
      IndexName: typeIndex,
      ExpressionAttributeValues: {
        ":userType": "User",
      },
      ExpressionAttributeNames: {
        "#type": "type",
      },
      KeyConditionExpression: "#type = :userType",
    })
    .promise();

  return Items as User[];
};
