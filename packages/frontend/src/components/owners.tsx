import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ERROR_ROUTE, SUCCESS_ROUTE } from "../App";
import { useAcceptParcelMutation, User } from "../graphql/generated";
import { StyledButton } from "./button";
import { Gif } from "./gif";
import { StyledHeadline } from "./headline";
import { StyledLink } from "./link";

type OwnersProps = {
  users: User[];
  link: string;
};

const StyledGif = styled.div`
  display: grid;
  grid-gap: 8px;
  justify-content: center;
`;

const StyledOwnerButton = styled(StyledButton)`
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
          <StyledHeadline.h1>Gefundene Nutzer:</StyledHeadline.h1>
          {users.map((user) => (
            <StyledOwnerButton
              key={user.id}
              onClick={() => selectOwner(user.id)}
            >
              <span>
                {user.firstname} {user.lastname}
              </span>
              <span> | Etage: {user.floor}</span>
            </StyledOwnerButton>
          ))}
        </>
      )}
    </>
  );
};
