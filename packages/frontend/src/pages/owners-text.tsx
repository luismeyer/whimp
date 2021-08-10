import React from "react";
import { Redirect } from "react-router-dom";

import { TEXT_ROUTE } from "../App";
import { Gif } from "../components/gif";
import { Owners } from "../components/owners";
import { Page } from "../components/page";
import { useFindOwnersQuery } from "../graphql/generated";
import { useURLSearchParams } from "../hooks/use-query-params";

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

  return (
    <Page>
      {loading || !data?.findOwners ? (
        <>
          <h1>Paket Besitzer wird gesucht</h1>
          <Gif name="Searching" />
        </>
      ) : (
        <Owners link={TEXT_ROUTE} users={data.findOwners} />
      )}
    </Page>
  );
};
