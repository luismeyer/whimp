import React, { useEffect } from "react";
import styled from "styled-components";

import { IMAGE_ROUTE, TEXT_ROUTE } from "../App";
import { useAuthContext } from "../context/auth";
import { useCurrentUserQuery, useLogoutMutation } from "../graphql/generated";
import { Loader } from "./loader";
import { StyledButton } from "./button";
import { StyledHeadline } from "./headline";
import { StyledLink } from "./link";

const StyledLinkContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;

const StyledHeader = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto auto;
  grid-gap: 16px;
  margin-bottom: 24px;
`;

export const Dashboard: React.FC = () => {
  const { authenticated, setAuthenticated } = useAuthContext();

  const { loading, data, error } = useCurrentUserQuery();

  const [logoutMutation, { loading: logoutLoading, data: logoutData }] =
    useLogoutMutation();

  useEffect(() => {
    if (error) {
      setAuthenticated("unauthenticated");
    }

    if (!logoutData) {
      return;
    }

    setAuthenticated(logoutData.logout ? "unauthenticated" : "loading");
  }, [logoutLoading, logoutData]);

  if (authenticated === "loading" || loading || logoutLoading) {
    return <Loader />;
  }

  if (authenticated == "unauthenticated" || !data) {
    return null;
  }

  return (
    <>
      <StyledHeader>
        <StyledHeadline.h1 noMargin>
          Hallo {data.currentUser.firstname}
        </StyledHeadline.h1>
        <StyledButton secondary onClick={() => logoutMutation()}>
          Logout
        </StyledButton>
      </StyledHeader>

      <StyledLinkContainer>
        <StyledLink to={IMAGE_ROUTE}>Paket einscannen</StyledLink>
        <StyledLink to={TEXT_ROUTE}>Paket-Daten eingeben</StyledLink>
      </StyledLinkContainer>
    </>
  );
};
