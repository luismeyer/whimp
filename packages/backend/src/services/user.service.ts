import {
  documentClient,
  dynamodbTable,
  emailIndex,
  tokenIndex,
  typeFlatIdIndex,
} from "../db";
import { Flat } from "../entities/flat.entity";
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
        type: "User",
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

export const usersByFlats = async (flats: Flat[]) => {
  const allUsers = await Promise.all(flats.map(usersByFlat));

  return allUsers.reduce((acc, users) => [...acc, ...users], []);
};

export const usersByFlat = async (flat: Flat): Promise<User[]> => {
  const { Items } = await documentClient
    .query({
      TableName: dynamodbTable,
      IndexName: typeFlatIdIndex,
      ExpressionAttributeValues: {
        ":userType": "User",
        ":flatId": flat.id,
      },
      ExpressionAttributeNames: {
        "#type": "type",
        "#flatId": "flatId",
      },
      KeyConditionExpression: "#type = :userType and #flatId = :flatId",
    })
    .promise();

  if (!Items) {
    return [];
  }

  return Items.map((item) => new User(item));
};
