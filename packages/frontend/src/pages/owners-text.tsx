import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { TEXT_ROUTE } from "../App";
import { Gif } from "../components/gif";
import { StyledHeadline } from "../components/headline";
import { Owners } from "../components/owners";
import { Page } from "../components/page";
import { useAuthContext } from "../context/auth";
import { useFindOwnersQuery } from "../graphql/generated";
import { useURLSearchParams } from "../hooks/use-query-params";

export const OwnersText: React.FC = () => {
  const history = useHistory();

  const { authenticated } = useAuthContext();

  const query = useURLSearchParams();
  const firstname = query.get("firstname");
  const lastname = query.get("lastname");

  if (!firstname || !lastname || authenticated !== "authenticated") {
    return <Redirect to="/" />;
  }

  const { loading, data, error } = useFindOwnersQuery({
    variables: {
      firstname: firstname,
      lastname: lastname,
    },
  });

  useEffect(() => {
    if (!error) {
      return;
    }

    history.push("/");
  }, [error]);

  return (
    <Page>
      {loading || !data?.findOwners ? (
        <>
          <StyledHeadline.h1>Paket Besitzer wird gesucht</StyledHeadline.h1>
          <Gif name="Searching" />
        </>
      ) : (
        <Owners link={TEXT_ROUTE} users={data.findOwners} />
      )}
    </Page>
  );
};
