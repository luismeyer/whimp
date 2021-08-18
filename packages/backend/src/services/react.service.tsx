import React from "react";
import ReactDOM from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { User } from "../entities/user.entity";

import { LoginCodeTemplate } from "../templates/login-code";
import { NotificationTemplate } from "../templates/notification";

const renderTemplate = (styleSheet: ServerStyleSheet, html: string): string => {
  return `<html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
      ${styleSheet.getStyleTags()}

      <style>
        body  {
          font-family: 'Inter', sans-serif;
        }
      </style>
    </head>

    ${html}
  </html>`;
};

export const renderLoginCodeTemplate = (
  firstname: string,
  token: string
): string => {
  const styleSheet = new ServerStyleSheet();

  const html = ReactDOM.renderToString(
    styleSheet.collectStyles(
      <LoginCodeTemplate code={token} firstname={firstname} />
    )
  );

  return renderTemplate(styleSheet, html);
};

export const renderNotificationTemplate = (
  firstname: string,
  neighbour: Pick<User, "firstname" | "lastname" | "floor">
) => {
  const styleSheet = new ServerStyleSheet();

  const html = ReactDOM.renderToString(
    styleSheet.collectStyles(
      <NotificationTemplate firstname={firstname} neighbour={neighbour} />
    )
  );

  return renderTemplate(styleSheet, html);
};
