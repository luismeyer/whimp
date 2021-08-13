import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ERROR_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../App";
import { useAuthContext } from "../context/auth";
import { useTriggerLoginMutation } from "../graphql/generated";
import { StyledButton } from "./button";
import { StyledHeadline } from "./headline";

type FormData = {
  email: string;
};

const StyledSetupForm = styled.form`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const StyledSetupButtons = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const Setup: React.FC = () => {
  const { authenticated } = useAuthContext();

  const [triggerLoginMutation, { loading, data, error }] =
    useTriggerLoginMutation();

  const history = useHistory();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const triggerLogin = useCallback(
    async (data: FormData) => {
      triggerLoginMutation({
        variables: { email: data.email },
      });
    },
    [triggerLoginMutation, history]
  );

  const openRegisterPage = () => {
    history.push(`${REGISTER_ROUTE}?email=${getValues("email")}`);
  };

  useEffect(() => {
    if (error) {
      openRegisterPage();
      return;
    }

    if (loading || !data) {
      return;
    }

    history.push(data.triggerLogin ? LOGIN_ROUTE : ERROR_ROUTE);
  }, [data, loading]);

  const triggerRegister = useCallback(openRegisterPage, [history]);

  useEffect(() => {
    if (!errors.email?.message) {
      return;
    }

    toast.error(errors.email.message, { id: "email" });
  }, [errors.email]);

  if (authenticated === "authenticated") {
    return null;
  }

  return (
    <>
      <StyledHeadline.h1>Willkommen</StyledHeadline.h1>

      <StyledSetupForm onSubmit={handleSubmit(triggerLogin)}>
        <label>Bitte gib deine Email an:</label>
        <input
          disabled={loading}
          type="email"
          autoComplete="email"
          {...register("email", { required: "Bitte gib deine Email an" })}
        />
      </StyledSetupForm>

      <StyledSetupButtons>
        <StyledButton disabled={loading} onClick={handleSubmit(triggerLogin)}>
          einloggen
        </StyledButton>
        <StyledButton
          disabled={loading}
          onClick={handleSubmit(triggerRegister)}
        >
          registrieren
        </StyledButton>
      </StyledSetupButtons>
    </>
  );
};
