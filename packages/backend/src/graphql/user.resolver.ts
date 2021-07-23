import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";

import { authCookie, AuthorizedContext, Context } from "../";
import { updateObject } from "../db";
import { User } from "../entities/user.entity";
import { sendTokenEmail } from "../services/email.service";
import { createUser, userByEmail, userByToken } from "../services/user.service";
import { RegisterUserInput } from "./register-user.input";

const loginToken = () => String(Math.round(Math.random() * 9000 + 1000));

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async triggerLogin(@Arg("email") email: string): Promise<boolean> {
    const user = await userByEmail(email);

    if (!user) {
      throw new GraphQLError("No User found");
    }

    user.token = loginToken();

    const updatedUser = await updateObject(user, "token");

    await sendTokenEmail(updatedUser);

    return true;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("token") token: string, @Ctx() ctx: Context) {
    const user = await userByToken(token);

    if (!user) {
      throw new GraphQLError("Wrong token");
    }

    user.token = v4();
    const newUser = await updateObject(user, "token");

    console.log("new", newUser);
    ctx.express.res.setHeader(
      "Set-Cookie",
      `${authCookie}=${newUser.token ?? ""}`
    );

    return newUser;
  }

  @Mutation(() => Boolean)
  async register(@Arg("data") data: RegisterUserInput): Promise<boolean> {
    const user = await userByEmail(data.email);

    if (user) {
      throw new GraphQLError("User already exists");
    }

    const newUser = await createUser(new User(data, loginToken()));

    if (!newUser) {
      return false;
    }

    await sendTokenEmail(newUser);

    return true;
  }

  @Query()
  @Authorized()
  currentUser(@Ctx() ctx: AuthorizedContext): User {
    return ctx.user;
  }
}
