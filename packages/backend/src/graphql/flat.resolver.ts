import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";

import { Flat } from "../entities/flat.entity";
import { flatById, createFlat } from "../services/flat.service";

@Resolver(Flat)
export class FlatResolver {
  @Authorized()
  @Query(() => Flat, { nullable: true })
  async findFlat(@Arg("id") id: string) {
    const res = await flatById(id);

    return res;
  }

  @Authorized()
  @Mutation(() => Flat)
  async createFlat() {
    const flat = new Flat();
    flat.id = v4();
    flat.floor = 0;

    const res = await createFlat(flat);

    return res;
  }
}
