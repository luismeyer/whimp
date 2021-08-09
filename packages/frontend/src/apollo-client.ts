import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { apiUrl } from "./utils/const";

const api = new HttpLink({
  uri: `${apiUrl ?? ""}/graphql`,
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: api,
  cache: new InMemoryCache(),
});
