import { APIGatewayProxyHandler } from "aws-lambda";
import { S3 } from "aws-sdk";
import uniqid from "uniqid";

const { BUCKET_NAME } = process.env;

if (!BUCKET_NAME) {
  throw new Error("Missing Env var: 'BUCKET_NAME'");
}

const s3Client = new S3({ region: "eu-central-1" });

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.body || !event.body.startsWith("data:image/png;base64")) {
    return {
      statusCode: 404,
      body: "Wrong input",
    };
  }

  const b64Buffer = event.body.replace(/^data:image\/png;base64,/, "");
  const filename = uniqid() + ".png";

  await s3Client
    .putObject({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: Buffer.from(b64Buffer, "base64"),
    })
    .promise()
    .catch((e) => {
      console.log("Bucket Error", e);
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      filename,
    }),
  };
};
