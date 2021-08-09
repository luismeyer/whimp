import React from "react";
import { useForm } from "react-hook-form";

import { RegisterUserInput } from "../graphql/generated";

type RegisterFlatProps = {
  submit: (data: FlatInput) => void;
};

export type FlatInput = Pick<
  RegisterUserInput,
  "postalCode" | "street" | "houseNumber" | "floor"
>;

export const RegisterFlat: React.FC<RegisterFlatProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlatInput>();

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>Postleitzahl</label>
      <input
        type="text"
        autoComplete="postal-code"
        {...register("postalCode", { required: true })}
      />
      {errors.postalCode && <span>This field is required</span>}

      <label>Straße</label>
      <input
        type="text"
        autoComplete="street-address"
        {...register("street", { required: true })}
      />
      {errors.street && <span>This field is required</span>}

      <label>Hausnummber</label>
      <input type="text" {...register("houseNumber", { required: true })} />
      {errors.houseNumber && <span>This field is required</span>}

      <label>Etage</label>
      <input type="number" {...register("floor", { required: true })} />
      {errors.floor && <span>This field is required</span>}

      <input type="submit" value="Abschicken" />
    </form>
  );
};
