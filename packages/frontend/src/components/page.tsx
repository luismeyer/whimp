import React from "react";
import styled from "styled-components";

const StyledPage = styled.div`
  max-width: 500px;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
`;

const StyledChildren = styled.div`
  width: 100%;
  padding: 0 16px;
`;

export const Page: React.FC = ({ children }) => {
  return (
    <StyledPage>
      <StyledChildren>{children}</StyledChildren>
    </StyledPage>
  );
};
