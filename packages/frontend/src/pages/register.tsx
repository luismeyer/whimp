import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { ERROR_ROUTE, LOGIN_ROUTE } from "../App";
import { FlatInput, RegisterFlat } from "../components/register-flat";
import { RegisterUser, UserInput } from "../components/register-user";
import { useRegisterUserMutation } from "../graphql/generated";

type Step = "userData" | "flat";

type RegisterProps = {
  submit: () => void;
};

export const Register: React.FC<RegisterProps> = ({ submit }) => {
  const [step, setStep] = useState<Step>("userData");

  const [userInput, setUserInput] = useState<UserInput>();

  const [flatInput, setFlatInput] = useState<FlatInput>();

  const [registerUserMutation, { loading, data }] = useRegisterUserMutation();

  const history = useHistory();

  useEffect(() => {
    if (!userInput || !flatInput) {
      return;
    }

    registerUserMutation({
      variables: {
        data: {
          ...userInput,
          ...flatInput,
          floor: Number(flatInput.floor),
        },
      },
    });
  }, [userInput, flatInput]);

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    history.push(data.register ? LOGIN_ROUTE : ERROR_ROUTE);
  }, [loading, data]);

  const completeRegisterUser = useCallback((input: UserInput) => {
    setUserInput(input);
    setStep("flat");
  }, []);

  const completeRegisterFlat = useCallback((input: FlatInput) => {
    setFlatInput(input);
  }, []);

  return (
    <div>
      <h1>Bitte gebe deine Daten an</h1>

      {loading && <span>loading...</span>}

      {!loading && step === "userData" && (
        <RegisterUser submit={completeRegisterUser} />
      )}

      {!loading && step === "flat" && (
        <RegisterFlat submit={completeRegisterFlat} />
      )}
    </div>
  );
};
