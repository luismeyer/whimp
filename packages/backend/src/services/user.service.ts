import { documentClient, dynamodbTable, emailLSI, tokenLSI } from "../db";
import { User } from "../entities/user.entity";

export const userByLSI = async (lsi: string, key: string, value: unknown) => {
  const { Items } = await documentClient
    .query({
      TableName: dynamodbTable,
      IndexName: lsi,
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

export const userByEmail = async (email: string): Promise<User | undefined> =>
  userByLSI(emailLSI, "email", email);

export const userByToken = async (token: string): Promise<User | undefined> =>
  userByLSI(tokenLSI, "token", token);

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
      ExpressionAttributeNames: {
        "#type": "type",
      },
      ExpressionAttributeValues: {
        ":type": "User",
      },
      KeyConditionExpression: "#type = :type",
    })
    .promise();

  return Items as User[];
};
