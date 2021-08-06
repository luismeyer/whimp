import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "./apollo-client";
import { Error } from "./components/error";
import { OwnersImage } from "./components/owners-image";
import { OwnersText } from "./components/owners-text";
import { LandingPage } from "./components/page";
import { ParcelImage } from "./components/parcel-image";
import { ParcelText } from "./components/parcel-text";
import { Success } from "./components/success";
import { stage } from "./utils/const";

export const IMAGE_ROUTE = "/search/image";
export const TEXT_ROUTE = "/search/text";

export const OWNERS_IMAGE_ROUTE = "/owners/image";
export const OWNERS_TEXT_ROUTE = "/owners/text";

export const ERROR_ROUTE = "/error";
export const SUCCESS_ROUTE = "/success";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router basename={stage}>
        <Switch>
          <Route path="/" exact component={LandingPage} />

          <Route path={TEXT_ROUTE} component={ParcelText} />
          <Route path={OWNERS_TEXT_ROUTE} component={OwnersText} />

          <Route path={IMAGE_ROUTE} component={ParcelImage} />
          <Route path={OWNERS_IMAGE_ROUTE} component={OwnersImage} />

          <Route path={ERROR_ROUTE} component={Error} />
          <Route path={SUCCESS_ROUTE} component={Success} />

          {/* <Redirect to="/" /> */}
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
