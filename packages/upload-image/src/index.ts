import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import parser from 'lambda-multipart-parser';
import path from 'path';
import sharp from 'sharp';
import uniqid from 'uniqid';

const { BUCKET_NAME } = process.env;

if (!BUCKET_NAME) {
  throw new Error("Missing Env var: 'BUCKET_NAME'");
}

const s3Client = new S3({ region: "eu-central-1" });

const convertToPng = async (image: Buffer): Promise<Buffer> => {
  return sharp(image).png().toBuffer();
};

const compressImage = async (
  image: Buffer,
  isPng: boolean
): Promise<Buffer> => {
  const pngBuffer = isPng ? image : await convertToPng(image);

  return imagemin.buffer(pngBuffer, {
    plugins: [
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });
};

export const handler: APIGatewayProxyHandler = async (event) => {
  let imageBuffer: Buffer | undefined;
  const filename = uniqid() + ".png";

  if (event.body?.startsWith("data:image/png;base64")) {
    const b64Buffer = event.body.replace(/^data:image\/png;base64,/, "");
    imageBuffer = await compressImage(Buffer.from(b64Buffer, "base64"), true);
  } else {
    const result = await parser.parse(event);

    const [file] = result.files;

    const extenstionName = path.extname(file.filename);

    imageBuffer = await compressImage(file.content, extenstionName === ".png");
  }

  if (!imageBuffer) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
      }),
    };
  }

  await s3Client
    .putObject({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: imageBuffer,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      filename,
    }),
  };
};
