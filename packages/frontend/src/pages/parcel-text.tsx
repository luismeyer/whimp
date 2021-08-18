import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import styled from "styled-components";

import { OWNERS_TEXT_ROUTE } from "../App";
import { StyledButton } from "../components/button";
import { StyledHeadline } from "../components/headline";
import { StyledLink } from "../components/link";
import { Page } from "../components/page";

type FindOwnersForm = {
  firstname: string;
  lastname: string;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 12px;
`;

const StyledSubmit = styled(StyledButton)`
  margin-top: 16px;
`;

export const ParcelText: React.FC = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<FindOwnersForm>();

  const submitForm = useCallback(
    ({ firstname, lastname }: FindOwnersForm) => {
      if (isValid) {
        return;
      }

      history.push(
        `${OWNERS_TEXT_ROUTE}?firstname=${firstname}&lastname=${lastname}`
      );
    },
    [history]
  );

  useEffect(() => {
    if (errors.firstname?.message) {
      toast.error(errors.firstname.message, { id: "firstname" });
    }

    if (errors.lastname?.message) {
      toast.error(errors.lastname.message, { id: "lastname" });
    }
  }, [errors.firstname, errors.lastname]);

  return (
    <Page>
      <StyledHeadline.h1>Gebe die Daten des Paket's ein</StyledHeadline.h1>
      <StyledLink to="/">Zum Dashboard</StyledLink>

      <StyledForm onSubmit={handleSubmit(submitForm)}>
        <label>Vorname</label>
        <input
          type="text"
          {...register("firstname", { required: "Bitte Vornamen angeben" })}
        />

        <label>Nachname</label>
        <input
          type="text"
          {...register("lastname", { required: "Bitte Nachnamen angeben" })}
        />
        <StyledSubmit onClick={handleSubmit(submitForm)}>Weiter</StyledSubmit>
      </StyledForm>
    </Page>
  );
};
