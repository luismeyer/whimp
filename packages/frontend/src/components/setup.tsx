import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../App";
import { useAuthContext } from "../context/auth";

import { useTriggerLoginMutation } from "../graphql/generated";

type Step = "email" | "login" | "register";

export const Setup: React.FC = () => {
  const [step, setStep] = useState<Step>("email");

  const { authenticated } = useAuthContext();

  const [triggerLoginMutation, { loading }] = useTriggerLoginMutation();

  const history = useHistory();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const triggerLogin = useCallback(async () => {
    const email = getValues("email");
    const result = await triggerLoginMutation({
      variables: {
        email,
      },
    });

    if (!result.errors && result.data?.triggerLogin) {
      history.push(LOGIN_ROUTE);
    }
  }, [triggerLoginMutation, history]);

  const triggerRegister = useCallback(() => {
    history.push(REGISTER_ROUTE);
  }, []);

  if (authenticated === "authenticated") {
    return null;
  }

  return (
    <div>
      <h1>Setup</h1>
      {step === "email" && (
        <>
          <form onSubmit={handleSubmit(triggerLogin)}>
            <label>Bitte gib deine Email an:</label>
            <input
              disabled={loading}
              type="text"
              {...register("email", { required: true })}
              onSubmit={handleSubmit(triggerLogin)}
            />
            {errors.email && <span>This field is required</span>}
          </form>

          <button disabled={loading} onClick={handleSubmit(triggerLogin)}>
            einloggen
          </button>
          <button disabled={loading} onClick={triggerRegister}>
            registrieren
          </button>
        </>
      )}
    </div>
  );
};
