import React, { useEffect, useState } from "react";

import { AuthenticatedContext, AuthState } from "../context/auth";
import { useCurrentUserQuery } from "../graphql/generated";
import { Dashboard } from "./dashboard";
import { Setup } from "../components/setup";

export const LandingPage: React.FC = () => {
  const { data, loading, error } = useCurrentUserQuery();

  const [authenticated, setAuthenticated] = useState<AuthState>("loading");

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
    <AuthenticatedContext.Provider value={{ authenticated, setAuthenticated }}>
      <div>
        {authenticated === "authenticated" && <Dashboard />}
        {authenticated === "unauthenticated" && <Setup />}
        {authenticated === "loading" && <span>loading...</span>}
      </div>
    </AuthenticatedContext.Provider>
  );
};
