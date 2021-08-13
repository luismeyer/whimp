import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "./apollo-client";
import { AuthenticatedContext, AuthState } from "./context/auth";
import { Error } from "./pages/error";
import { LandingPage } from "./pages/landing";
import { Login } from "./pages/login";
import { OwnersImage } from "./pages/owners-image";
import { OwnersText } from "./pages/owners-text";
import { ParcelImage } from "./pages/parcel-image";
import { ParcelText } from "./pages/parcel-text";
import { Register } from "./pages/register";
import { Success } from "./pages/success";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";

export const IMAGE_ROUTE = "/search/image";
export const TEXT_ROUTE = "/search/text";

export const OWNERS_IMAGE_ROUTE = "/owners/image";
export const OWNERS_TEXT_ROUTE = "/owners/text";

export const ERROR_ROUTE = "/error";
export const SUCCESS_ROUTE = "/success";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  * {
    margin: 0;
  }
`;

const App = () => {
  const [authenticated, setAuthenticated] = useState<AuthState>("loading");

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyle />
      <Toaster />
      <AuthenticatedContext.Provider
        value={{ authenticated, setAuthenticated }}
      >
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />

            <Route path={LOGIN_ROUTE} component={Login} />
            <Route path={REGISTER_ROUTE} component={Register} />

            <Route path={TEXT_ROUTE} component={ParcelText} />
            <Route path={OWNERS_TEXT_ROUTE} component={OwnersText} />

            <Route path={IMAGE_ROUTE} component={ParcelImage} />
            <Route path={OWNERS_IMAGE_ROUTE} component={OwnersImage} />

            <Route path={ERROR_ROUTE} component={Error} />
            <Route path={SUCCESS_ROUTE} component={Success} />

            <Redirect to="/" />
          </Switch>
        </Router>
      </AuthenticatedContext.Provider>
    </ApolloProvider>
  );
};

export default App;
