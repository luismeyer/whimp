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

export const Error: React.FC = () => {
  return (
    <Page>
      <StyledHeadline.h1>Etwas ist schiefgegangen</StyledHeadline.h1>

      <StyledContainer>
        <Link to="/">Zurück zur Übersicht</Link>
        <Gif name="Error" />
      </StyledContainer>
    </Page>
  );
};
