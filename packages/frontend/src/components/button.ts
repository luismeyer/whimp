import styled, { css } from "styled-components";

import { Color } from "../utils/colors";
import { FontSize } from "../utils/sizes";

const primaryButtonBase = css`
  font-size: ${FontSize.m};
  background-color: ${Color.main};
  border: none;
  color: white;
  border-radius: 4px;
  padding: 8px 16px;
  box-shadow: 0 2px 15px rgba(255, 0, 130, 0.5);
  cursor: pointer;
  border: 2px solid ${Color.main};
`;

const secondaryButtonBase = css`
  font-size: ${FontSize.m};
  background-color: transparent;
  border: 2px solid ${Color.main};
  color: ${Color.main};
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

type ButtonProps = {
  secondary?: boolean;
};

export const StyledButton = styled.button<ButtonProps>`
  ${(props) => (props.secondary ? secondaryButtonBase : primaryButtonBase)}
`;
