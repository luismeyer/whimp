import { Link } from "react-router-dom";
import styled from "styled-components";
import { Color } from "../utils/colors";
import { FontSize } from "../utils/sizes";

export const StyledLink = styled(Link)`
  color: ${Color.secondary};
  font-size: ${FontSize.s};
`;
