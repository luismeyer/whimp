import { User } from "../entities/user.entity";
import { sesClient, sesEmail } from "../ses";
import {
  renderLoginCodeTemplate,
  renderNotificationTemplate,
} from "./react.service";

const { IS_OFFLINE } = process.env;

const sendEmail = async (
  destinationEmail: string,
  subject: string,
  html: string
) => {
  return sesClient
    .sendEmail({
      Source: `Whimp <${sesEmail}>`,
      Destination: { ToAddresses: [destinationEmail] },
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
        Body: {
          Html: {
            Data: html,
            Charset: "UTF-8",
          },
        },
      },
    })
    .promise()
    .then(() => true)
    .catch((e) => {
      console.log("Error sending mail", e);
      return false;
    });
};

export const sendTokenEmail = async (user: User): Promise<boolean> => {
  if (!user.token) {
    return false;
  }

  const template = renderLoginCodeTemplate(user.firstname, user.token);

  if (IS_OFFLINE) {
    console.log(template);
    return true;
  }

  return sendEmail(user.email, "Dein Login Code", template);
};

export const sendNotificationEmail = async (
  acceptor: User,
  receiver: User
): Promise<boolean> => {
  const template = renderNotificationTemplate(receiver.firstname, acceptor);

  if (IS_OFFLINE) {
    console.log(template);
    return true;
  }

  return sendEmail(receiver.email, "Dein Paket ist da", template);
};
