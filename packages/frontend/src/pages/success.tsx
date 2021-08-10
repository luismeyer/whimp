import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Gif } from "../components/gif";
import { Page } from "../components/page";

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  justify-content: center;
`;

export const Success: React.FC = () => {
  return (
    <Page>
      <h1>Die Email wurde verschickt.</h1>
      <StyledContainer>
        <Gif name="Success" />
        <span>
          Du kannst diese Seite jetzt <Link to="/">schließen</Link>
        </span>
      </StyledContainer>
    </Page>
  );
};
