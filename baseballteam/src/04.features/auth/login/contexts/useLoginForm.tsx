import { createContext, useContext } from "react";

export interface LoginFormContextType {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  submit: () => Promise<void>;
  navigateToSignup: () => void;
}

export const LoginFormContext = createContext<LoginFormContextType | undefined>(
  undefined
);

export function useLoginForm() {
  const context = useContext(LoginFormContext);

  if (!context) {
    throw new Error("useLoginForm must be used within a LoginFormProvider");
  }

  return context;
}
