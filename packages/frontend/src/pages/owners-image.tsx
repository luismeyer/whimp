import React from "react";
import { Redirect } from "react-router-dom";

import { ERROR_ROUTE, IMAGE_ROUTE } from "../App";
import { useAuthContext } from "../context/auth";
import { useFindOwnersByImageQuery } from "../graphql/generated";
import { useURLSearchParams } from "../hooks/use-query-params";
import { Gif } from "../components/gif";
import { Owners } from "./owners";

export const OwnersImage: React.FC = () => {
  const query = useURLSearchParams();

  const { authenticated } = useAuthContext();

  const filename = query.get("filename");

  if (!filename || authenticated !== "authenticated") {
    return <Redirect to="/" />;
  }

  const { loading, data, error } = useFindOwnersByImageQuery({
    variables: {
      filename,
    },
  });

  if (error) {
    return <Redirect to={ERROR_ROUTE} />;
  }

  return loading || !data?.findOwnersByImage ? (
    <div>
      <h1>Paket Besitzer wird gesucht</h1>
      <Gif name="Searching" />
    </div>
  ) : (
    <Owners link={IMAGE_ROUTE} users={data.findOwnersByImage} />
  );
};
