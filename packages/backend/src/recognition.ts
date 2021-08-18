import { Rekognition } from "aws-sdk";

import { bucketName } from "./bucket";

const rekognition = new Rekognition({
  region: "eu-central-1",
});

export const detectText = async (
  filename: string
): Promise<string | undefined> => {
  const { TextDetections } = await rekognition
    .detectText({
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: filename,
        },
      },
    })
    .promise();

  if (!TextDetections) {
    return;
  }

  return TextDetections.filter((detection) => detection.Type === "WORD")
    .map((detection) => detection.DetectedText ?? "")
    .join(" ");
};
