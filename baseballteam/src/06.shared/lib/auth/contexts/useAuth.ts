import { createContext, useContext } from "react";

import type { UserProfileType } from "../models/types";

interface AuthContextType {
  user: UserProfileType | null;
  login: (user: UserProfileType, accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
