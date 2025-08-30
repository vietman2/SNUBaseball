import { createContext, useContext } from "react";

interface AuthenticatedStateType<T> {
  user: T;
  isAuthenticated: true;
}

interface UnauthenticatedStateType {
  user: null;
  isAuthenticated: false;
}

export type UserContextType<T> =
  | AuthenticatedStateType<T>
  | UnauthenticatedStateType;

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
