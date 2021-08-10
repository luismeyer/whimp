import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { RegisterUserInput } from "../graphql/generated";

type RegisterFlatProps = {
  submit: (data: FlatInput) => void;
};

export type FlatInput = Pick<
  RegisterUserInput,
  "postalCode" | "street" | "houseNumber" | "floor"
>;

const StyledForm = styled.form`
  display: grid;
`;

export const RegisterFlat: React.FC<RegisterFlatProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlatInput>();

  useEffect(() => {
    if (errors.postalCode?.message) {
      toast.error(errors.postalCode.message, { id: "postalcode" });
    }

    if (errors.houseNumber?.message) {
      toast.error(errors.houseNumber.message, { id: "housenumber" });
    }

    if (errors.street?.message) {
      toast.error(errors.street.message, { id: "street" });
    }

    if (errors.floor?.message) {
      toast.error(errors.floor.message, { id: "floor" });
    }
  }, [errors.postalCode, errors.houseNumber, errors.street, errors.floor]);

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <label>Postleitzahl</label>
      <input
        type="text"
        autoComplete="postal-code"
        {...register("postalCode", {
          required: "Bitte gib deine Postleitzahl an",
        })}
      />

      <label>Straße</label>
      <input
        type="text"
        autoComplete="street-address"
        {...register("street", { required: "Bitte gib deine Straße an" })}
      />

      <label>Hausnummber</label>
      <input
        type="text"
        {...register("houseNumber", {
          required: "Bitte gib deine Hausnummer an",
        })}
      />

      <label>Etage</label>
      <input
        type="number"
        {...register("floor", { required: "Bitte gib deine Etage an" })}
      />

      <input type="submit" value="Abschicken" />
    </StyledForm>
  );
};
