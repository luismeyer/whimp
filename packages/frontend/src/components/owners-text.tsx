import React from "react";
import { Redirect } from "react-router-dom";

import { TEXT_ROUTE } from "../App";
import { useFindOwnersQuery } from "../graphql/generated";
import { useURLSearchParams } from "../hooks/use-query-params";
import { Gif } from "./gif";
import { Owners } from "./owners";

export const OwnersText: React.FC = () => {
  const query = useURLSearchParams();
  const firstname = query.get("firstname");
  const lastname = query.get("lastname");

  if (!firstname || !lastname) {
    return <Redirect to="/" />;
  }

  const { loading, data } = useFindOwnersQuery({
    variables: {
      firstname: firstname,
      lastname: lastname,
    },
  });

  return loading || !data?.findOwners ? (
    <div>
      <h1>Paket Besitzer wird gesucht</h1>
      <Gif name="Searching" />
    </div>
  ) : (
    <Owners link={TEXT_ROUTE} users={data.findOwners} />
  );
};
