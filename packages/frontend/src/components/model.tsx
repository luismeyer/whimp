import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 24px;
`;

const StyledModal = styled.div`
  box-shadow: 0 2px 15px rgba(255, 0, 130, 0.5);
  background-color: white;
  padding: 32px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

type ModelProps = {
  onClose: () => void;
};

export const Modal: React.FC<ModelProps> = ({ children, onClose }) => {
  const modelRef = useRef<HTMLDivElement>(null);

  return (
    <StyledModalContainer onClick={onClose}>
      <StyledModal ref={modelRef}>{children}</StyledModal>
    </StyledModalContainer>
  );
};
