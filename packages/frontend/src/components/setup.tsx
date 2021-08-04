import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/auth";

import { useTriggerLoginMutation } from "../graphql/generated";
import { Login } from "./login";
import { Register } from "./register";

type Step = "email" | "login" | "register";

export const Setup: React.FC = () => {
  const [step, setStep] = useState<Step>("email");

  const { authenticated } = useAuthContext();

  const [triggerLoginMutation] = useTriggerLoginMutation();

  const finishSetup = useCallback(() => {}, []);

  const triggerLogin = useCallback(async () => {
    const email = getValues("email");
    const result = await triggerLoginMutation({
      variables: {
        email,
      },
    });

    if (!result.errors && result.data?.triggerLogin) {
      setStep("login");
    }
  }, []);

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<{ email: string }>();

  if (authenticated === "authenticated") {
    return null;
  }

  return (
    <div>
      <h1>Setup</h1>
      {step === "email" && (
        <>
          <form>
            <label>Bitte gib deine Email an:</label>
            <input type="text" {...register("email", { required: true })} />
            {errors.email && <span>This field is required</span>}
          </form>

          <button onClick={triggerLogin}>einloggen</button>
          <button onClick={() => setStep("register")}>registrieren</button>
        </>
      )}

      {step === "login" && <Login />}

      {step === "register" && <Register submit={finishSetup} />}
    </div>
  );
};
