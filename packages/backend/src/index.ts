import "reflect-metadata";

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-lambda";
import { APIGatewayProxyEvent, Context as AWSContext } from "aws-lambda";
import { parse } from "cookie";
import express from "express";
import { buildSchemaSync } from "type-graphql";

import { User } from "./entities/user.entity";
import { FlatResolver } from "./graphql/flat.resolver";
import { ParcelResolver } from "./graphql/parcel.resolver";
import { UserResolver } from "./graphql/user.resolver";
import { userByToken } from "./services/user.service";

const { STAGE } = process.env;

export const authCookie = "whimp-auth";

const schema = buildSchemaSync({
  resolvers: [FlatResolver, UserResolver, ParcelResolver],
  authChecker: ({ context }) => Boolean(context.user),
});

type ExpressContext = {
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
  event: APIGatewayProxyEvent;
  context: AWSContext;
  express: ExpressContext;
};

const graphQLPlayground =
  STAGE === "production"
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageGraphQLPlayground({
        settings: { "request.credentials": "include" },
      });

const server = new ApolloServer({
  schema,
  context: async ({ event, express }: LambdaContext): Promise<Context> => {
    const {
      headers: { Cookie },
    } = event;

    if (!Cookie) {
      return { express: express };
    }

    const cookies = parse(Cookie);

    if (!cookies[authCookie]) {
      return { express: express };
    }

    return {
      express: express,
      user: await userByToken(cookies[authCookie]),
    };
  },
  plugins: [graphQLPlayground],
});

export const handler = server.createHandler();
