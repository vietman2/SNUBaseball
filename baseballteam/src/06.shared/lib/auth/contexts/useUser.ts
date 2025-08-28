import { createContext, useContext } from "react";

import type { UserProfileType } from "../models/types";

export interface UserContextType {
  user: UserProfileType | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
