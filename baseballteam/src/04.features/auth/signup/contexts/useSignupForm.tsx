import { createContext, useContext } from "react";

export interface SignupFormContextType {
  memberId: number;
  studentId: string;
  setStudentId: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (value: string) => void;
  isLoading: boolean;
  checkId: () => Promise<void>;
  submit: () => Promise<void>;
  goBack: () => void;
}

export const SignupFormContext = createContext<
  SignupFormContextType | undefined
>(undefined);

export function useSignupForm() {
  const context = useContext(SignupFormContext);

  if (!context) {
    throw new Error("useSignupForm must be used within a SignupFormProvider");
  }

  return context;
}
