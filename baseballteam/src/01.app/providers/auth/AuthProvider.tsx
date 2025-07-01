import { useCallback, useMemo, useState } from "react";
import axios from "axios";

import { AuthContext, type UserProfileType } from "@shared/lib/auth";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<UserProfileType | null>(null);

  const login = useCallback((user: UserProfileType, accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
