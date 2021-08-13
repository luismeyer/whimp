import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { RegisterUserInput } from "../graphql/generated";
import { StyledButton } from "./button";
import { StyledForm, StyledFormContainer } from "./form";

type RegisterUserProps = {
  submit: (data: UserInput) => void;
};

export type UserInput = Pick<RegisterUserInput, "firstname" | "lastname">;

export const RegisterUser: React.FC<RegisterUserProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>();

  useEffect(() => {
    if (errors.firstname?.message) {
      toast.error(errors.firstname.message, { id: "register-firstname" });
    }

    if (errors.lastname?.message) {
      toast.error(errors.lastname.message, { id: "register-lastname" });
    }
  }, [errors.firstname, errors.lastname]);

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <StyledFormContainer>
        <label>Vorname</label>
        <input
          type="text"
          autoComplete="given-name"
          {...register("firstname", {
            required: "Bitte gib deinen Vornamen an",
          })}
        />
      </StyledFormContainer>

      <StyledFormContainer>
        <label>Nachname</label>
        <input
          type="text"
          autoComplete="family-name"
          {...register("lastname", {
            required: "Bitte gib deinen Nachnamen an",
          })}
        />
      </StyledFormContainer>

      <StyledButton onClick={handleSubmit(submit)}>Bestätigen</StyledButton>
    </StyledForm>
  );
};
