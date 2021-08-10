import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import styled from "styled-components";

import { Page } from "../components/page";
import { useAuthContext } from "../context/auth";
import { useLoginMutation } from "../graphql/generated";

const StyledLoginForm = styled.form`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const StyledLoginSubmit = styled.input`
  margin-top: 16px;
`;

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
    if (error || !data) {
      return;
    }

    setAuthenticated(data.login ? "authenticated" : "unauthenticated");
    history.push("/");
  }, [loading, data, error]);

  useEffect(() => {
    if (!errors.token?.message) {
      return;
    }

    toast.error(errors.token.message, { id: "token" });
  }, [errors.token]);

  return (
    <Page>
      <h1>Verifiziere dich</h1>

      <StyledLoginForm onSubmit={handleSubmit(login)}>
        <label>
          Bitte gib den 4 stelligen Code an, den du per Email bekommen hast:
        </label>
        <input
          disabled={loading}
          type="text"
          {...register("token", { required: "Bitte gebe deinen Code an" })}
        />

        <StyledLoginSubmit type="submit" value="Einloggen" disabled={loading} />
      </StyledLoginForm>
    </Page>
  );
};
