import React from "react";
import { Link } from "react-router-dom";

import { Gif } from "./gif";

export const Success: React.FC = () => {
  return (
    <div>
      <h1>Super, eine Email wurde verschickt.</h1>
      <span>
        Du kannst diese Seite jetzt <Link to="/">schließen</Link>
      </span>
      <Gif name="Success" />
    </div>
  );
};
