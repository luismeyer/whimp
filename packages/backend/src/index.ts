import "reflect-metadata";

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { ApolloServer } from "apollo-server-lambda";
import { APIGatewayProxyEvent, Context as AWSContext } from "aws-lambda";
import { parse } from "cookie";
import { buildSchemaSync } from "type-graphql";

import { User } from "./entities/user.entity";
import { FlatResolver } from "./graphql/flat.resolver";
import { UserResolver } from "./graphql/user.resolver";
import { userByToken } from "./services/user.service";
import { ParcelResolver } from "./graphql/parcel.resolver";

export const authCookie = "whimp-auth";

const schema = buildSchemaSync({
  resolvers: [FlatResolver, UserResolver, ParcelResolver],
  authChecker: ({ context }) => Boolean(context.user),
});

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

const server = new ApolloServer({
  schema,
  context: async ({ event, express }: LambdaContext): Promise<Context> => {
    const {
      headers: { Cookie },
    } = event;

    if (!Cookie) {
      return {
        express: express,
        user: undefined,
      };
    }

    const cookies = parse(Cookie);

    return {
      express: express,
      user: await userByToken(cookies[authCookie]),
    };
  },
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground({
          settings: { "request.credentials": "include" },
        }),
  ],
});

export const handler = server.createHandler();
