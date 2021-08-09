import { User } from '../entities/user.entity';

export const sendTokenEmail = async (user: User) => {
  console.log("Send token: " + user.token + ", to email: " + user.email);
};

export const sendNotificationEmail = async (sender: User, receiver: User) => {
  console.log(
    `Send Email, ${sender.firstname} hat ein Paket für ${receiver.firstname}`
  );
};
