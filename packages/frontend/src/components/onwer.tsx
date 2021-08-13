import React, { useState } from "react";
import styled from "styled-components";

import { User } from "../graphql/generated";
import { StyledButton } from "./button";
import { StyledHeadline } from "./headline";
import { Modal } from "./model";

type OwnerProps = {
  user: User;
  submitLoading: (id: string) => void;
  isFirst: boolean;
};

const StyledOwnerButton = styled(StyledButton)`
  margin-bottom: 24px;
`;

const StyledButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 18px;
  margin-top: 24px;
`;

export const Owner: React.FC<OwnerProps> = ({
  user,
  submitLoading,
  isFirst,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StyledOwnerButton
        secondary={!isFirst}
        onClick={() => setShowModal(true)}
      >
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span> | Etage: {user.floor}</span>
      </StyledOwnerButton>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <StyledHeadline.h1>Vorsicht Email!</StyledHeadline.h1>

          <p>
            Bist du sicher, dass du eine Email an {user.firstname}{" "}
            {user.lastname} verschicken möchtest?
          </p>

          <StyledButtonContainer>
            <StyledButton secondary onClick={() => setShowModal(false)}>
              Abbruch
            </StyledButton>
            <StyledButton onClick={() => submitLoading(user.id)}>
              Bestätigen
            </StyledButton>
          </StyledButtonContainer>
        </Modal>
      )}
    </>
  );
};
