import React, { useEffect, useState } from "react";

import { Page } from "../components/page";
import { Setup } from "../components/setup";
import { useAuthContext } from "../context/auth";
import { useCurrentUserQuery } from "../graphql/generated";
import { Dashboard } from "./dashboard";

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
      {authenticated === "loading" && <span>loading...</span>}
    </Page>
  );
};
