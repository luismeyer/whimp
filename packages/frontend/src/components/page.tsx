import React from "react";
import styled from "styled-components";

const StyledPage = styled.div`
  height: 100vh;
  max-height: -webkit-fill-available;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
`;

const StyledChildren = styled.div`
  width: 100%;
  padding: 0 16px 128px 16px;
`;

export const Page: React.FC = ({ children }) => {
  return (
    <StyledPage>
      <StyledChildren>{children}</StyledChildren>
    </StyledPage>
  );
};
