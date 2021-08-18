import Fuse from "fuse.js";

import { User } from "../entities/user.entity";

const formatMatches = (matches: Fuse.FuseResult<User>[]) => {
  return matches.map((match) => match.item);
};

export const findParcelOwnersByName = (
  users: User[],
  firstname: string,
  lastname: string
): User[] => {
  const fuse = new Fuse(users, {
    keys: ["firstname", "lastname"],
    includeScore: true,
    findAllMatches: true,
  });

  return formatMatches(fuse.search(firstname + "|" + lastname, { limit: 3 }));
};

export const findParcelOwnerByText = (
  users: User[],
  parcelText: string
): User[] => {
  const fuse = new Fuse(users, {
    keys: ["firstname", "lastname"],
    useExtendedSearch: true,
    includeScore: true,
    findAllMatches: true,
  });

  return formatMatches(fuse.search(parcelText, { limit: 3 }));
};
