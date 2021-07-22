import { Arg, Query, Resolver } from "type-graphql";

import { Flat } from "../entities/flat.entity";

@Resolver(Flat)
export class FlatResolver {
  @Query(() => Flat)
  findFlat(@Arg("email", () => String) email: string) {
    const flat = new Flat();
    flat.floor = 0;
    flat.id = "1";
    flat.residents = [];

    return flat;
  }
}
