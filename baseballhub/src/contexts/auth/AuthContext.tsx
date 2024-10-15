import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

import { UserProfileType } from "@models/user";

interface AuthContextType {
  user: UserProfileType | null;
  login: (user: UserProfileType, accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfileType | null>(null);

  const login = (
    user: UserProfileType,
    accessToken: string
  ) => {
    setUser(user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    // TODO: refresh token
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
