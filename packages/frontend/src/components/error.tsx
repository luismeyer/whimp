import React from "react";
import { Link } from "react-router-dom";
import { Gif } from "./gif";

export const Error: React.FC = () => {
  return (
    <div>
      <h1>Etwas ist schiefgegangen</h1>

      <Link to="/">Zurück zur Übersicht</Link>

      <Gif name="Error" />
    </div>
  );
};
