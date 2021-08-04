import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { deleteItem } from "../bucket";
import { AuthorizedContext } from "../context";
import { User } from "../entities/user.entity";
import { detectText } from "../recognition";
import { sendNotificationEmail } from "../services/email.service";
import { flatsByAdress } from "../services/flat.service";
import {
  findParcelOwnerByText,
  findParcelOwnersByName,
} from "../services/parcel.service";
import { userById, usersByFlats } from "../services/user.service";

@Resolver()
export class ParcelResolver {
  @Mutation(() => [User], { nullable: true })
  @Authorized()
  async findOwners(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Ctx() { user }: AuthorizedContext
  ): Promise<User[]> {
    const flat = await user.flat();

    if (!flat) {
      throw new GraphQLError("You need a flat to accept a parcel");
    }

    const flats = await flatsByAdress(
      flat.postalCode,
      flat.street,
      flat.houseNumber
    );

    if (!flats) {
      throw new GraphQLError("Error querying flats");
    }

    const users = await usersByFlats(flats.filter((f) => f.id !== flat.id));

    return findParcelOwnersByName(users, firstname, lastname);
  }

  @Mutation(() => [User], { nullable: true })
  @Authorized()
  async findOwnersByImage(
    @Arg("filename") filename: string,
    @Ctx() { user }: AuthorizedContext
  ): Promise<User[] | undefined> {
    const flat = await user.flat();

    if (!flat) {
      throw new GraphQLError("You need a flat to accept a parcel");
    }

    const text = await detectText(filename);

    await deleteItem(filename);

    const flats = await flatsByAdress(
      flat.postalCode,
      flat.street,
      flat.houseNumber
    );

    if (!flats) {
      throw new GraphQLError("Error querying flats");
    }

    const users = await usersByFlats(flats.filter((f) => f.id !== flat.id));

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
