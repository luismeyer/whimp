import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Gif } from "../components/gif";
import { StyledHeadline } from "../components/headline";
import { Page } from "../components/page";

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  justify-content: center;
`;

export const Success: React.FC = () => {
  return (
    <Page>
      <StyledHeadline.h1>Die Email wurde verschickt.</StyledHeadline.h1>

      <StyledContainer>
        <span>
          Du kannst diese Seite jetzt <Link to="/">schließen</Link>
        </span>
        <Gif name="Success" />
      </StyledContainer>
    </Page>
  );
};
