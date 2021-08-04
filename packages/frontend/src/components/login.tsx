import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/auth";
import { useLoginMutation } from "../graphql/generated";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: string }>();

  const { setAuthenticated } = useAuthContext();

  const [loginMutation] = useLoginMutation();

  const login = useCallback(
    async ({ token }) => {
      const result = await loginMutation({
        variables: { token },
      });

      setAuthenticated(
        Boolean(result.data?.login) ? "authenticated" : "unauthenticated"
      );
    },
    [loginMutation]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
        <label>
          Bitte gib den 4 stelligen Code an, den du per Email bekommen hast:
        </label>
        <input type="text" {...register("token", { required: true })} />
        {errors.token && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};
