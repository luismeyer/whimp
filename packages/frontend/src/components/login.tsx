import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import { useAuthContext } from "../context/auth";
import { useLoginMutation } from "../graphql/generated";

export const Login: React.FC = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: string }>();

  const { setAuthenticated } = useAuthContext();

  const [loginMutation, { loading, data, error }] = useLoginMutation();

  const login = useCallback(
    ({ token }) => {
      loginMutation({
        variables: { token },
      });
    },
    [loginMutation]
  );

  useEffect(() => {
    if (error || !data?.login) {
      return;
    }

    setAuthenticated("authenticated");
    history.push("/");
  }, [loading, data, error]);

  return (
    <div>
      <h1>Bitte verifiziere dich</h1>
      <form onSubmit={handleSubmit(login)}>
        <label>
          Bitte gib den 4 stelligen Code an, den du per Email bekommen hast:
        </label>
        <input
          disabled={loading}
          type="text"
          {...register("token", { required: true })}
        />
        {errors.token && <span>This field is required</span>}

        <input type="submit" value="Einloggen" disabled={loading} />
      </form>
    </div>
  );
};
