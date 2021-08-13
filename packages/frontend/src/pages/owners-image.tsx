import React from "react";
import { Redirect } from "react-router-dom";

import { ERROR_ROUTE, IMAGE_ROUTE } from "../App";
import { Gif } from "../components/gif";
import { Page } from "../components/page";
import { useAuthContext } from "../context/auth";
import { useFindOwnersByImageQuery } from "../graphql/generated";
import { useURLSearchParams } from "../hooks/use-query-params";
import { Owners } from "../components/owners";
import { StyledHeadline } from "../components/headline";

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

  return (
    <Page>
      {loading || !data?.findOwnersByImage ? (
        <>
          <StyledHeadline.h1>Paket Besitzer wird gesucht</StyledHeadline.h1>
          <Gif name="Searching" />
        </>
      ) : (
        <Owners link={IMAGE_ROUTE} users={data.findOwnersByImage} />
      )}
    </Page>
  );
};
