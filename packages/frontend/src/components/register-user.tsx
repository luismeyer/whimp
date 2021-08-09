import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { RegisterUserInput } from "../graphql/generated";

type RegisterUserProps = {
  submit: (data: UserInput) => void;
};

export type UserInput = Pick<
  RegisterUserInput,
  "email" | "firstname" | "lastname"
>;

export const RegisterUser: React.FC<RegisterUserProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>();

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>Email</label>
      <input
        type="email"
        autoComplete="email"
        {...register("email", { required: true })}
      />
      {errors.email && <span>This field is required</span>}

      <label>Vorname</label>
      <input
        type="text"
        autoComplete="given-name"
        {...register("firstname", { required: true })}
      />
      {errors.firstname && <span>This field is required</span>}

      <label>Nachname</label>
      <input
        type="text"
        autoComplete="family-name"
        {...register("lastname", { required: true })}
      />
      {errors.lastname && <span>This field is required</span>}

      <input type="submit" value="Abschicken" />
    </form>
  );
};
