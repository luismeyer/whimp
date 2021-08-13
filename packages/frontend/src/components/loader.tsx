import React from "react";
import styled, { keyframes, css } from "styled-components";
import { Color } from "../utils/colors";

const LoadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  100% {
    transform: rotate(720deg);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
`;

const StyledLoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const LoaderRingStyles = css`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 5px;
  border-radius: 50%;
  animation: ${LoadingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border: 5px solid ${Color.main};
  border-color: ${Color.main} transparent transparent transparent;
`;

const StyledLoaderRing = styled.div`
  ${LoaderRingStyles};
`;

const StyledLoaderRing1 = styled.div`
  ${LoaderRingStyles};

  animation-delay: 0.5s;
`;

export const Loader: React.FC = () => {
  return (
    <StyledLoaderContainer>
      <StyledLoaderRing />
      <StyledLoaderRing1 />
    </StyledLoaderContainer>
  );
};
