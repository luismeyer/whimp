import "reflect-metadata";

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-lambda";
import { parse } from "cookie";
import { buildSchemaSync } from "type-graphql";

import { Context, LambdaContext } from "./context";
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

    const user = await userByToken(cookies[authCookie]);

    if (user) {
      express.res.setHeader("authenticated", "true");
    }

    return {
      express: express,
      user,
    };
  },
  plugins: [graphQLPlayground],
});

export const handler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "*",
      credentials: true,
      exposedHeaders: "authenticated",
    },
  },
});
