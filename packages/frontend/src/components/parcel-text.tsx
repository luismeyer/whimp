import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import { OWNERS_TEXT_ROUTE } from '../App';
import { Gif } from './gif';

type FindOwnersForm = {
  firstname: string;
  lastname: string;
};

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

  return (
    <div>
      <h1>Gebe die Daten des Paket's ein</h1>

      <form onSubmit={handleSubmit(submitForm)}>
        <label>Vorname</label>
        <input type="text" {...register("firstname", { required: true })} />
        {errors.firstname && <span>Bitte Vornamen angeben</span>}

        <label>Nachname</label>
        <input type="text" {...register("lastname", { required: true })} />
        {errors.lastname && <span>Bitte Nachnamen angeben</span>}

        <input type="submit" />
      </form>
    </div>
  );
};
