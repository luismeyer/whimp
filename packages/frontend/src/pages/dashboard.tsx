import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { IMAGE_ROUTE, TEXT_ROUTE } from "../App";
import { useAuthContext } from "../context/auth";
import { useCurrentUserQuery, useLogoutMutation } from "../graphql/generated";

const StyledLinkContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  align-items: center;
`;

const StyledHeadline = styled.h1`
  margin-right: 16px;
`;

export const Dashboard: React.FC = () => {
  const { authenticated, setAuthenticated } = useAuthContext();

  const { loading, data } = useCurrentUserQuery();

  const [logoutMutation, { loading: logoutLoading, data: logoutData }] =
    useLogoutMutation();

  useEffect(() => {
    if (!logoutData) {
      return;
    }

    setAuthenticated(logoutData.logout ? "unauthenticated" : "loading");
  }, [logoutLoading, logoutData]);

  if (authenticated === "loading" || loading || logoutLoading) {
    return <span>loading...</span>;
  }

  if (authenticated == "unauthenticated" || !data) {
    return null;
  }

  return (
    <div>
      <StyledHeader>
        <StyledHeadline>Hallo {data.currentUser.firstname}</StyledHeadline>
        <button onClick={() => logoutMutation()}>Logout</button>
      </StyledHeader>

      <StyledLinkContainer>
        <Link to={IMAGE_ROUTE}>Paket einscannen</Link>
        <Link to={TEXT_ROUTE}>Paket-Daten eingeben</Link>
      </StyledLinkContainer>
    </div>
  );
};
