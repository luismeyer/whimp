import styled from "styled-components";
import { Color } from "../utils/colors";
import { FontSize } from "../utils/sizes";

type HeadlineProps = {
  noMargin?: boolean;
};

const StyledH1 = styled.h1<HeadlineProps>`
  font-size: ${FontSize.xl};
  color: ${Color.main};
  margin-bottom: ${(props) => !props.noMargin && "12px"};
`;

export const StyledHeadline = {
  h1: StyledH1,
};
