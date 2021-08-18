import Fuse from "fuse.js";

import { User } from "../entities/user.entity";

export const findParcelOwnersByName = (
  users: User[],
  firstname: string,
  lastname: string
): User[] => {
  const fuse = new Fuse(users, {
    keys: ["firstname", "lastname"],
  });

  return fuse
    .search(firstname + " " + lastname, { limit: 3 })
    .map((match) => match.item);
};

export const findParcelOwnerByText = (
  users: User[],
  parcelText: string
): User[] => {
  console.log(parcelText);

  const fuse = new Fuse(users, {
    keys: ["firstname", "lastname"],
  });

  return fuse.search(parcelText, { limit: 3 }).map((match) => match.item);
};
