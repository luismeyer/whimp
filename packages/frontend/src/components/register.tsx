import React, { useCallback, useEffect, useState } from 'react';

import { useRegisterUserMutation } from '../graphql/generated';
import { FlatInput, RegisterFlat } from './register-flat';
import { RegisterUser, UserInput } from './register-user';

type Step = "userData" | "flat";

type RegisterProps = {
  submit: () => void;
};

export const Register: React.FC<RegisterProps> = ({ submit }) => {
  const [step, setStep] = useState<Step>("userData");

  const [userInput, setUserInput] = useState<UserInput>();

  const [flatInput, setFlatInput] = useState<FlatInput>();

  const [registerUserMutation, { loading, data }] = useRegisterUserMutation();

  useEffect(() => {
    if (!userInput || !flatInput) {
      return;
    }

    registerUserMutation({
      variables: {
        data: {
          ...userInput,
          ...flatInput,
        },
      },
    });
  }, [userInput, flatInput]);

  useEffect(() => {
    if (!loading || !data) {
      return;
    }
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

      {step === "userData" && <RegisterUser submit={completeRegisterUser} />}

      {step === "flat" && <RegisterFlat submit={completeRegisterFlat} />}
    </div>
  );
};
