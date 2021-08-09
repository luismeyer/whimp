import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  RegisterUserInput,
  useRegisterUserMutation,
} from "../graphql/generated";

type RegisterUserProps = {
  submit: () => void;
};

export const RegisterUser: React.FC<RegisterUserProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInput>();

  const [registerUserMutation, { loading, data }] = useRegisterUserMutation();

  const registerUser = React.useCallback(
    (data: RegisterUserInput) => {
      registerUserMutation({ variables: data });
    },
    [submit]
  );

  useEffect(() => {
    if (!loading || !data || errors) {
      return;
    }

    submit();
  }, [loading, data]);

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <label>Email</label>
      <input {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}

      <label>Vorname</label>
      <input {...register("firstname", { required: true })} />
      {errors.firstname && <span>This field is required</span>}

      <label>Nachname</label>
      <input {...register("lastname", { required: true })} />
      {errors.lastname && <span>This field is required</span>}

      <input type="submit" value="Abschicken" />
    </form>
  );
};
