import React from "react";
import { Redirect, useHistory } from "react-router-dom";

import { ERROR_ROUTE, IMAGE_ROUTE } from "../App";
import { useFindOwnersByImageQuery } from "../graphql/generated";
import { useURLSearchParams } from "../hooks/use-query-params";
import { Gif } from "./gif";
import { Owners } from "./owners";

export const OwnersImage: React.FC = () => {
  const history = useHistory();

  const query = useURLSearchParams();
  const filename = query.get("filename");

  if (!filename) {
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
