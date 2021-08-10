import { SES } from "aws-sdk";

const { SES_EMAIL } = process.env;

if (!SES_EMAIL) {
  throw new Error("Missing Env Variable: SES_EMAIL");
}

export const sesEmail = SES_EMAIL;

export const sesClient = new SES({ region: "eu-central-1" });
