import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { SUCCESS_ROUTE, ERROR_ROUTE } from "../App";

import { useAcceptParcelMutation, User } from "../graphql/generated";
import { Gif } from "./gif";
import { StyledHeadline } from "./headline";
import { StyledLink } from "./link";
import { Owner } from "./onwer";

type OwnersProps = {
  users: User[];
  link: string;
};

const StyledGif = styled.div`
  display: grid;
  grid-gap: 8px;
  justify-content: center;
`;

const StyledHeadlineSection = styled.div`
  margin-bottom: 24px;
`;

export const Owners: React.FC<OwnersProps> = ({ users, link }) => {
  const history = useHistory();

  const [mutation, { loading, data }] = useAcceptParcelMutation();

  const selectOwner = useCallback(
    (id: string) => {
      const variables = { id };
      mutation({ variables });
    },
    [mutation]
  );

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    if (data.acceptParcel) {
      history.push(SUCCESS_ROUTE);
    } else {
      history.push(ERROR_ROUTE);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <>
        <StyledHeadline.h1>Email wird geschrieben</StyledHeadline.h1>
        <Gif name="WriteEmail" />
      </>
    );
  }

  return (
    <>
      {users.length === 0 ? (
        <>
          <StyledHeadline.h1>Keine Nutzer gefunden</StyledHeadline.h1>

          <StyledGif>
            <StyledLink to={link}>Neuer Versuch</StyledLink>
            <Gif name="NotFound" />
          </StyledGif>
        </>
      ) : (
        <>
          <StyledHeadlineSection>
            <StyledHeadline.h1 noMargin>Gefundene Nachbarn:</StyledHeadline.h1>
            <StyledLink to={link}>Neuer Versuch</StyledLink>
          </StyledHeadlineSection>
          {users.map((user, index) => (
            <Owner
              isFirst={index === 0}
              key={user.id}
              user={user}
              submitLoading={selectOwner}
            />
          ))}
        </>
      )}
    </>
  );
};
