import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import FuzzySearch from "fuzzy-search";

import { User } from "../entities/user.entity";
import { allUsers } from "../services/user.service";

@Resolver()
export class ParcelResolver {
  @Mutation(() => [User], { nullable: true })
  @Authorized()
  async acceptParcel(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string
  ): Promise<User[]> {
    const users = await allUsers();

    const searcher = new FuzzySearch(users, ["firstname", "lastname"]);

    const matches = [
      ...searcher.search(firstname),
      ...searcher.search(lastname),
    ];

    return matches.filter((elem, pos) => {
      return matches.indexOf(elem) == pos;
    });
  }
}
