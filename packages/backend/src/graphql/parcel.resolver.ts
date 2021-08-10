import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { deleteItem, existsItem } from "../bucket";
import { AuthorizedContext } from "../context";
import { User } from "../entities/user.entity";
import { detectText } from "../recognition";
import { sendNotificationEmail } from "../services/email.service";
import {
  findParcelOwnerByText,
  findParcelOwnersByName,
} from "../services/parcel.service";
import { userById, usersByAdress } from "../services/user.service";

@Resolver()
export class ParcelResolver {
  @Query(() => [User], { nullable: true })
  @Authorized()
  async findOwners(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Ctx() { user }: AuthorizedContext
  ): Promise<User[]> {
    if (!user.postalCode || !user.street || !user.houseNumber) {
      throw new GraphQLError("You need to register your flat first");
    }

    const users = await usersByAdress(
      user.postalCode,
      user.street,
      user.houseNumber
    );

    return findParcelOwnersByName(
      users.filter(({ id }) => id !== user.id),
      firstname,
      lastname
    );
  }

  @Query(() => [User])
  @Authorized()
  async findOwnersByImage(
    @Arg("filename") filename: string,
    @Ctx() { user }: AuthorizedContext
  ): Promise<User[]> {
    const itemExistsInBucket = await existsItem(filename);
    if (!itemExistsInBucket) {
      throw new GraphQLError("Item not found");
    }

    const text = await detectText(filename);

    await deleteItem(filename);

    if (!text) {
      return [];
    }

    if (!user.postalCode || !user.street || !user.houseNumber) {
      throw new GraphQLError("You need to register your flat first");
    }

    const users = await usersByAdress(
      user.postalCode,
      user.street,
      user.houseNumber
    );

    return findParcelOwnerByText(
      users.filter(({ id }) => id !== user.id),
      text
    );
  }

  @Mutation(() => Boolean)
  @Authorized()
  async acceptParcel(@Arg("id") id: string, @Ctx() ctx: AuthorizedContext) {
    const user = await userById(id);

    if (!user) {
      throw new GraphQLError("Wrong user id");
    }

    return sendNotificationEmail(ctx.user, user);
  }
}
