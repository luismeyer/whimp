import FuzzySearch from "fuzzy-search";
import { User } from "../entities/user.entity";

const matchesAll = (value: User, ...arrays: User[][]) => {
  arrays.map((array) => {});
};

export const findParcelOwner = (
  users: User[],
  firstname: string,
  lastname: string
) => {
  const searcher = new FuzzySearch(users, ["firstname", "lastname"]);

  const firstnameMatches = searcher.search(firstname);
  const lastnameMatches = searcher.search(lastname);

  const matches = [...firstnameMatches, ...lastnameMatches];

  return matches.filter((elem, pos) => {
    return matches.indexOf(elem) == pos;
  });
};
