import { documentClient, dynamodbTable } from "../db";
import { Flat } from "../entities/flat.entity";

export const createFlat = async (newFlat: Flat): Promise<Flat | undefined> => {
  const { $response } = await documentClient
    .put({
      TableName: dynamodbTable,
      Item: newFlat,
    })
    .promise();

  if ($response.error) {
    return;
  }

  return newFlat;
};

export const flatById = async (id: string): Promise<Flat | undefined> => {
  const { Item } = await documentClient
    .get({
      TableName: dynamodbTable,
      Key: { type: "User", id },
    })
    .promise();

  if (!Item) {
    return;
  }

  return Item as Flat;
};
