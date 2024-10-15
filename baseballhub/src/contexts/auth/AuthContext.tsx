import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

import { UserProfileType } from "@models/user";

interface AuthContextType {
  user: UserProfileType | null;
  login: (user: UserProfileType) => void;
  setToken: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfileType | null>(null);

  const setToken = (accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  const login = (user: UserProfileType) => {
    setUser(user);
    localStorage.setItem("user_id", user.uuid);
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user_id");
  };

  const value = useMemo(() => ({ user, login, setToken, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
