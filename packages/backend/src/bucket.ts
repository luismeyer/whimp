import { S3 } from "aws-sdk";

const { BUCKET_NAME } = process.env;

if (!BUCKET_NAME) {
  throw new Error("Missing Env var: 'BUCKET_NAME'");
}

export const bucketName = BUCKET_NAME;

// Needs run against real Bucket so AWS recognition can fetch the object
const s3Client = new S3({ region: "eu-central-1" });

export const getItem = async (
  filename: string
): Promise<Buffer | undefined> => {
  const res = await s3Client
    .getObject({
      Bucket: bucketName,
      Key: filename,
    })
    .promise()
    .catch(() => undefined);

  if (!res) {
    return;
  }

  return res.Body as Buffer;
};

export const deleteItem = async (filename: string): Promise<void> => {
  await s3Client
    .deleteObject({
      Bucket: bucketName,
      Key: filename,
    })
    .promise();

  return;
};

export const existsItem = async (filename: string): Promise<boolean> => {
  return s3Client
    .headObject({ Bucket: bucketName, Key: filename })
    .promise()
    .then(() => true)
    .catch(() => false);
};
