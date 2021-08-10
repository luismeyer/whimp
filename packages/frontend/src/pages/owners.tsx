import React, { useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { ERROR_ROUTE, SUCCESS_ROUTE } from "../App";
import { useAcceptParcelMutation, User } from "../graphql/generated";
import { Gif } from "../components/gif";

type OwnersProps = {
  users: User[];
  link: string;
};

export const Owners: React.FC<OwnersProps> = ({ users, link }) => {
  const history = useHistory();

  const [mutation, { loading, data }] = useAcceptParcelMutation();

  const selectOwner = useCallback(
    (id: string) => {
      const variables = { id };
      mutation({ variables });
    },
    [mutation]
  );

  useEffect(() => {
    if (!data?.acceptParcel) {
      return;
    }

    if (data.acceptParcel) {
      history.push(SUCCESS_ROUTE);
    } else {
      history.push(ERROR_ROUTE);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div>
        <h1>Email wird geschrieben</h1>
        <Gif name="WriteEmail" />
      </div>
    );
  }

  return (
    <div>
      {users.length === 0 ? (
        <>
          <h1>Keine Nutzer gefunden</h1>
          <Gif name="NotFound" />
          <Link to={link}>Neuer Versuch</Link>
        </>
      ) : (
        <>
          <h1>Gefundene Nutzer:</h1>
          {users.map((user) => (
            <button onClick={() => selectOwner(user.id)}>
              <span>
                {user.firstname} {user.lastname}
              </span>
              <span> | Etage: {user.floor}</span>
            </button>
          ))}
        </>
      )}
    </div>
  );
};
