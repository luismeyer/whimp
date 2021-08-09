import { APIGatewayProxyEventV2, Context as AWSContext } from "aws-lambda";
import express from "express";

import { User } from "./entities/user.entity";

export type ExpressContext = {
  req: express.Request;
  res: express.Response;
};

export type Context = {
  express: ExpressContext;
  user?: User;
};

export type AuthorizedContext = {
  express: ExpressContext;
  user: User;
};

export type LambdaContext = {
  event: APIGatewayProxyEventV2;
  context: AWSContext;
  express: ExpressContext;
};
