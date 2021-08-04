import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";

import { AuthorizedContext } from "../context";
import { updateObject } from "../db";
import { Flat } from "../entities/flat.entity";
import { User } from "../entities/user.entity";
import { createFlat, flatsByAdress } from "../services/flat.service";
import { RegisterFlatInput } from "./register-flat.input";

@Resolver(Flat)
export class FlatResolver {
  @Authorized()
  @Mutation(() => User)
  async registerFlat(
    @Arg("data") data: RegisterFlatInput,
    @Ctx() { user }: AuthorizedContext
  ): Promise<User> {
    const existingFlats = await flatsByAdress(
      data.postalCode,
      data.street,
      data.houseNumber
    );

    if (!existingFlats) {
      throw new GraphQLError("Error querying flats");
    }

    const existingFlat = existingFlats.find((f) => f.floor === data.floor);

    if (existingFlat) {
      const userObject = await updateObject(
        { ...user, flatId: existingFlat.id },
        "flatId"
      );

      return new User(userObject);
    }

    const flat = new Flat();
    flat.id = v4();
    flat.floor = data.floor;

    flat.street = data.street;
    flat.houseNumber = data.houseNumber;
    flat.postalCode = data.postalCode;

    const newFlat = await createFlat(flat);

    if (!newFlat) {
      throw new GraphQLError("Error creating flat");
    }

    const userObject = await updateObject(
      { ...user, flatId: newFlat.id },
      "flatId"
    );

    return new User(userObject);
  }
}
