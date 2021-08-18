import React from "react";
import styled from "styled-components";

type LoginCodeTemplateProps = {
  code: string;
  firstname: string;
};

const StyledHeadline = styled.h1`
  font-size: 48px;
`;

const StyledParapgraph = styled.p`
  font-size: 24px;
`;

export const LoginCodeTemplate: React.FC<LoginCodeTemplateProps> = ({
  code,
  firstname,
}) => {
  return (
    <div>
      <StyledHeadline>Hallo {firstname} 👋</StyledHeadline>
      <StyledParapgraph>
        hier ist dein Login Code: <b>{code}</b>
      </StyledParapgraph>
      <StyledParapgraph>Viele Grüße 🚀</StyledParapgraph>
    </div>
  );
};
