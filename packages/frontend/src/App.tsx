import { ApolloProvider } from "@apollo/client";
import React, { useState } from "react";
import { apolloClient } from "./apollo-client";

import { Page } from "./components/page";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Page />
    </ApolloProvider>
  );
};

export default App;
