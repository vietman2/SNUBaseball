import { createContext, useContext } from "react";

export interface UserContextType<T> {
  user: T | null;
}

export function createUserContext<T>() {
  const UserContext = createContext<UserContextType<T> | undefined>(undefined);

  function useUser() {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  }

  return { UserContext, useUser };
}
