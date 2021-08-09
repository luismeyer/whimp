import { createContext, useContext } from 'react';

export type AuthState = "loading" | "authenticated" | "unauthenticated";

type AuthenticatedContext = {
  authenticated: AuthState;
  setAuthenticated: (state: AuthState) => void;
};

export const AuthenticatedContext = createContext<AuthenticatedContext>({
  authenticated: "loading",
  setAuthenticated: () => undefined,
});

export const useAuthContext = () => {
  return useContext(AuthenticatedContext);
};
