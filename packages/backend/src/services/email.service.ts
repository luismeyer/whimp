import { User } from "../entities/user.entity";
import { sesClient, sesEmail } from "../ses";

const { IS_OFFLINE } = process.env;

export const sendTokenEmail = async (user: User): Promise<boolean> => {
  const message = `Hallo ${user.firstname}, hier ist dein Login Code: ${user.token}`;

  if (IS_OFFLINE) {
    console.log(message);
    return true;
  }

  return sesClient
    .sendEmail({
      Source: `Whimp <${sesEmail}>`,
      Destination: { ToAddresses: [user.email] },
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: "Dein Login Code",
        },
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: message,
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

export const sendNotificationEmail = async (
  sender: User,
  receiver: User
): Promise<boolean> => {
  const message = `Hallo ${receiver.firstname}, Ein Paket für dich ist angekommen und wurde von ${sender.firstname} ${sender.lastname} (${sender.floor}. Stock) angenommen.`;

  if (IS_OFFLINE) {
    console.log(message);
    return true;
  }

  return sesClient
    .sendEmail({
      Source: `Whimp <${sesEmail}>`,
      Destination: { ToAddresses: [receiver.email] },
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: "Dein Paket ist da",
        },
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: message,
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
