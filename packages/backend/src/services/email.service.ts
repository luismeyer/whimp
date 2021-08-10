import { User } from "../entities/user.entity";
import { sesClient, sesEmail } from "../ses";

const { IS_OFFLINE } = process.env;

export const sendTokenEmail = async (user: User): Promise<void> => {
  const message = `Hallo ${user.firstname}, hier ist dein Login Code: ${user.token}`;

  if (IS_OFFLINE) {
    console.log(message);
    return;
  }

  await sesClient
    .sendEmail({
      Source: `whimp ${sesEmail}`,
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
    .promise();
};

export const sendNotificationEmail = async (sender: User, receiver: User) => {
  const message = `Hallo ${receiver.firstname}, Ein Paket für dich ist angekommen und wurde von ${sender.firstname} ${sender.lastname} (${sender.floor}. Stock) angenommen.`;

  if (IS_OFFLINE) {
    console.log(message);
    return;
  }

  await sesClient
    .sendEmail({
      Source: `whimp ${sesEmail}`,
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
    .promise();
};
