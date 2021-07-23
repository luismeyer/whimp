import { User } from "../entities/user.entity";

export const sendTokenEmail = async (user: User) => {
  console.log("Send token: " + user.token + ", to email: " + user.email);
};
