import React from "react";
import styled from "styled-components";

const GIFS = {
  Loading: "https://media.giphy.com/media/3y0oCOkdKKRi0/giphy.gif",
  Searching: "https://media.giphy.com/media/9EmupLytNQLgrQTmxg/giphy.gif",
  NotFound: "https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif",
  WriteEmail: "https://media.giphy.com/media/XIqCQx02E1U9W/giphy.gif",
  Success: "https://media.giphy.com/media/a0h7sAqON67nO/giphy.gif",
  Error: "https://media.giphy.com/media/1RkDDoIVs3ntm/giphy.gif",
};

type GifProps = {
  name: keyof typeof GIFS;
};

const StyledImg = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`;

export const Gif: React.FC<GifProps> = ({ name }) => {
  return <StyledImg src={GIFS[name]} />;
};
