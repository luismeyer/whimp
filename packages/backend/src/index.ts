import "reflect-metadata";

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-lambda";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { parse } from "cookie";
import { buildSchemaSync } from "type-graphql";

import { Context, LambdaContext } from "./context";
import { ParcelResolver } from "./graphql/parcel.resolver";
import { UserResolver } from "./graphql/user.resolver";
import { userByToken } from "./services/user.service";
import { handleMockRequest } from "./services/mock.service";

const { STAGE, IS_OFFLINE } = process.env;

export const authCookie = "whimp-auth";

const schema = buildSchemaSync({
  resolvers: [UserResolver, ParcelResolver],
  authChecker: ({ context }) => Boolean(context.user),
});

const graphQLPlayground =
  STAGE === "production"
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageGraphQLPlayground({
        settings: { "request.credentials": "include" },
      });

const server = new ApolloServer({
  schema,
  context: async ({ event, express }: LambdaContext): Promise<Context> => {
    const { cookies } = event;

    if (!cookies) {
      return { express: express };
    }

    const parsedCookies = parse(cookies.join(","));

    if (!parsedCookies[authCookie]) {
      return { express: express };
    }

    const user = await userByToken(parsedCookies[authCookie]);

    return {
      express: express,
      user,
    };
  },
  plugins: [graphQLPlayground],
});

export const handler: APIGatewayProxyHandlerV2 = async (
  event,
  context,
  callback
) => {
  if (event.queryStringParameters?.mock) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: handleMockRequest(event.queryStringParameters?.mock),
    };
  }

  const handler = server.createHandler({
    expressGetMiddlewareOptions: {
      cors: {
        origin: IS_OFFLINE && "http://localhost:8080",
        credentials: Boolean(IS_OFFLINE),
      },
    },
  });

  return handler(event, context, callback);
};
