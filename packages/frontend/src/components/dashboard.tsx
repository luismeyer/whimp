import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_ROUTE, TEXT_ROUTE } from "../App";

import { useAuthContext } from "../context/auth";
import { useCurrentUserQuery } from "../graphql/generated";

export const Dashboard: React.FC = () => {
  const { authenticated } = useAuthContext();

  const { loading, data } = useCurrentUserQuery();

  if (authenticated === "loading" || loading) {
    return <span>loading...</span>;
  }

  if (authenticated == "unauthenticated" || !data) {
    return null;
  }

  return (
    <div>
      <h1>Hallo {data.currentUser.firstname}</h1>

      <Link to={IMAGE_ROUTE}>Paket einscannen</Link>

      <Link to={TEXT_ROUTE}>Paket-Daten eingeben</Link>
    </div>
  );
};
