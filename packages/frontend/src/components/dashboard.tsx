import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { IMAGE_ROUTE, TEXT_ROUTE } from "../App";
import { useAuthContext } from "../context/auth";
import { useCurrentUserQuery, useLogoutMutation } from "../graphql/generated";

export const Dashboard: React.FC = () => {
  const { authenticated, setAuthenticated } = useAuthContext();

  const { loading, data } = useCurrentUserQuery();

  const [logoutMutation, { loading: logoutLoading, data: logoutData }] =
    useLogoutMutation();

  if (authenticated === "loading" || loading) {
    return <span>loading...</span>;
  }

  if (authenticated == "unauthenticated" || !data) {
    return null;
  }

  useEffect(() => {
    if (!logoutData) {
      return;
    }

    setAuthenticated(logoutData.logout ? "unauthenticated" : "loading");
  }, [logoutLoading, logoutData]);

  return (
    <div>
      <h1>Hallo {data.currentUser.firstname}</h1>

      <Link to={IMAGE_ROUTE}>Paket einscannen</Link>

      <Link to={TEXT_ROUTE}>Paket-Daten eingeben</Link>

      <button onClick={() => logoutMutation()}>Logout</button>
    </div>
  );
};
