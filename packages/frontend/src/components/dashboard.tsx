import React from "react";
import { useAuthContext } from "../context/auth";

import { useCurrentUserQuery } from "../graphql/generated";

export const Dashboard: React.FC = () => {
  const { authenticated } = useAuthContext();

  const { loading, data } = useCurrentUserQuery();

  console.log(loading, data);
  if (authenticated === "loading" || loading) {
    return <span>loading...</span>;
  }

  if (authenticated == "unauthenticated" || !data) {
    return null;
  }

  return (
    <div>
      <span>Hallo {data.currentUser.firstname}</span>
    </div>
  );
};
