import React from "react";
import styled from "styled-components";

type NotificationTemplateProps = {
  firstname: string;
  neighbour: {
    firstname: string;
    lastname: string;
    floor: number;
  };
};

const StyledHeadline = styled.h1`
  font-size: 48px;
`;

const StyledParapgraph = styled.p`
  font-size: 24px;
`;

export const NotificationTemplate: React.FC<NotificationTemplateProps> = ({
  firstname,
  neighbour,
}) => {
  return (
    <div>
      <StyledHeadline>Hallo {firstname} 📦</StyledHeadline>
      <StyledParapgraph>
        Ein Paket für dich ist angekommen und wurde von {neighbour.firstname}{" "}
        {neighbour.lastname} ({neighbour.floor}. Stock) angenommen.
      </StyledParapgraph>
      <StyledParapgraph>Viele Grüße 🚀</StyledParapgraph>
    </div>
  );
};
