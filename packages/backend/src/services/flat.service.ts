import { adressIndex, documentClient, dynamodbTable } from "../db";
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
      Key: { type: "Flat", id },
    })
    .promise();

  if (!Item) {
    return;
  }

  return Item as Flat;
};

export const flatsByAdress = async (
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

  return Items as Flat[] | undefined;
};
