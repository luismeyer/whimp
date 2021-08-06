import React from "react";
import { useForm } from "react-hook-form";

import { RegisterFlatInput } from "../graphql/generated";

type RegisterFlatProps = {
  submit: () => void;
};

export const RegisterFlat: React.FC<RegisterFlatProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFlatInput>();

  const registerUser = React.useCallback(() => {
    submit();
  }, [submit]);

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <label>Postleitzahl</label>
      <input {...register("postalCode", { required: true })} />
      {errors.postalCode && <span>This field is required</span>}

      <label>Straße</label>
      <input {...register("street", { required: true })} />
      {errors.street && <span>This field is required</span>}

      <label>Hausnummber</label>
      <input {...register("houseNumber", { required: true })} />
      {errors.houseNumber && <span>This field is required</span>}

      <label>Etage</label>
      <input {...register("floor", { required: true })} />
      {errors.floor && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};
