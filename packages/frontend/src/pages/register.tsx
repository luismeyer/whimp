import React, { useCallback, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";

import { ERROR_ROUTE, LOGIN_ROUTE } from "../App";
import { Loader } from "../components/loader";
import { StyledHeadline } from "../components/headline";
import { Page } from "../components/page";
import { FlatInput, RegisterFlat } from "../components/register-flat";
import { RegisterUser, UserInput } from "../components/register-user";
import { useRegisterUserMutation } from "../graphql/generated";
import { useURLSearchParams } from "../hooks/use-query-params";

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

  const query = useURLSearchParams();
  const email = query.get("email");

  useEffect(() => {
    if (!userInput || !flatInput || !email) {
      return;
    }

    registerUserMutation({
      variables: {
        data: {
          ...userInput,
          ...flatInput,
          email,
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

  if (!email) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <StyledHeadline.h1>Bitte gebe deine Daten an</StyledHeadline.h1>

      {loading && <Loader />}

      {!loading && step === "userData" && (
        <RegisterUser submit={completeRegisterUser} />
      )}

      {!loading && step === "flat" && (
        <RegisterFlat submit={completeRegisterFlat} />
      )}
    </Page>
  );
};
