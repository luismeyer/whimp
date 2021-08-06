import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";

import { AuthorizedContext } from "../context";
import { updateObject } from "../db";

import { User } from "../entities/user.entity";
import { RegisterFlatInput } from "./register-flat.input";

@Resolver()
export class FlatResolver {
  @Authorized()
  @Mutation(() => User)
  async registerFlat(
    @Arg("data") data: RegisterFlatInput,
    @Ctx() { user }: AuthorizedContext
  ): Promise<User> {
    user.floor = data.floor;
    user.street = data.street;
    user.houseNumber = data.houseNumber;
    user.postalCode = data.postalCode;

    return updateObject(user, "street", "houseNumber", "postalCode", "floor");
  }
}
