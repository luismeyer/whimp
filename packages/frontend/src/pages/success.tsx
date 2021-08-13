import React from "react";
import styled from "styled-components";

import { Gif } from "../components/gif";
import { StyledHeadline } from "../components/headline";
import { StyledLink } from "../components/link";
import { Page } from "../components/page";

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  justify-items: center;
`;

export const Success: React.FC = () => {
  return (
    <Page>
      <StyledHeadline.h1>Die Email wurde verschickt.</StyledHeadline.h1>

      <StyledContainer>
        <span>
          Du kannst diese Seite jetzt <StyledLink to="/">schließen</StyledLink>
        </span>
        <Gif name="Success" />
      </StyledContainer>
    </Page>
  );
};
