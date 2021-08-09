import { fuzzy, search } from 'fast-fuzzy';

import { User } from '../entities/user.entity';

export const findParcelOwnersByName = (
  users: User[],
  firstname: string,
  lastname: string
): User[] => {
  const firstnameMatches = search(firstname, users, {
    keySelector: (user) => user.firstname,
  });

  const lastnameMatches = search(lastname, users, {
    keySelector: (user) => user.lastname,
  });

  const matches = [...firstnameMatches, ...lastnameMatches];

  return matches.filter((elem, pos) => {
    return matches.indexOf(elem) == pos;
  });
};

export const findParcelOwnerByText = (
  users: User[],
  parcelText: string
): User[] => {
  return users.filter((user) => {
    const firstNameRanking = fuzzy(user.firstname, parcelText);
    const lastNameRanking = fuzzy(user.lastname, parcelText);

    return firstNameRanking + lastNameRanking > 1.5;
  });
};
