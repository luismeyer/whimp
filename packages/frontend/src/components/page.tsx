import React, { useEffect, useState } from "react";

import { AuthenticatedContext, AuthState } from "../context/auth";
import { useCurrentUserQuery } from "../graphql/generated";
import { Dashboard } from "./dashboard";
import { Setup } from "./setup";

export const Page: React.FC = () => {
  const { data, loading, error } = useCurrentUserQuery();

  const [authenticated, setAuthenticated] = useState<AuthState>("loading");

  useEffect(() => {
    if (error) {
      setAuthenticated("unauthenticated");
      return;
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
