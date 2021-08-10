import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { RegisterUserInput } from "../graphql/generated";

type RegisterUserProps = {
  submit: (data: UserInput) => void;
};

export type UserInput = Pick<RegisterUserInput, "firstname" | "lastname">;

const StyledForm = styled.form`
  display: grid;
`;

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
      <label>Vorname</label>
      <input
        type="text"
        autoComplete="given-name"
        {...register("firstname", { required: "Bitte gib deinen Vornamen an" })}
      />

      <label>Nachname</label>
      <input
        type="text"
        autoComplete="family-name"
        {...register("lastname", { required: "Bitte gib deinen Nachnamen an" })}
      />

      <input type="submit" value="Abschicken" />
    </StyledForm>
  );
};
