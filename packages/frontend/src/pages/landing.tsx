import React, { useEffect } from "react";

import { Dashboard } from "../components/dashboard";
import { Loader } from "../components/loader";
import { Page } from "../components/page";
import { Setup } from "../components/setup";
import { useAuthContext } from "../context/auth";
import { useCurrentUserQuery } from "../graphql/generated";

export const LandingPage: React.FC = () => {
  const { data, loading, error } = useCurrentUserQuery();

  const { setAuthenticated, authenticated } = useAuthContext();

  useEffect(() => {
    if (error) {
      return setAuthenticated("unauthenticated");
    }

    if (!data) {
      return;
    }

    const { currentUser } = data;

    if (currentUser) {
      setAuthenticated("authenticated");
    } else {
      setAuthenticated("unauthenticated");
    }
  }, [loading]);

  return (
    <Page>
      {authenticated === "authenticated" && <Dashboard />}
      {authenticated === "unauthenticated" && <Setup />}
      {authenticated === "loading" && <Loader />}
    </Page>
  );
};
