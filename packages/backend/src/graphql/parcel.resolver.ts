import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { User } from "../entities/user.entity";
import {
  findParcelOwnerByText,
  findParcelOwnersByName,
} from "../services/parcel.service";
import { allUsers, userById } from "../services/user.service";
import { deleteItem, getItem } from "../bucket";
import { detectText } from "../recognition";
import { GraphQLError } from "graphql";
import { sendNotificationEmail } from "../services/email.service";
import { AuthorizedContext } from "..";

@Resolver()
export class ParcelResolver {
  @Mutation(() => [User], { nullable: true })
  @Authorized()
  async findOwners(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string
  ): Promise<User[]> {
    const users = await allUsers();

    return findParcelOwnersByName(users, firstname, lastname);
  }

  @Mutation(() => [User], { nullable: true })
  @Authorized()
  async findOwnersByImage(
    @Arg("filename") filename: string
  ): Promise<User[] | undefined> {
    const text = await detectText(filename);

    await deleteItem(filename);

    const users = await allUsers();

    if (!text) {
      return;
    }

    return findParcelOwnerByText(users, text);
  }

  @Mutation(() => Boolean)
  @Authorized()
  async acceptParcel(@Arg("id") id: string, @Ctx() ctx: AuthorizedContext) {
    const user = await userById(id);

    if (!user) {
      throw new GraphQLError("Wrong user id");
    }

    sendNotificationEmail(ctx.user, user);

    return true;
  }
}
