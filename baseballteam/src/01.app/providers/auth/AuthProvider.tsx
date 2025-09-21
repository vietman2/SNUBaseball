import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

import { refreshToken } from "@features/auth/refreshToken";
import { useMe, UserContext, type UserProfileType } from "@entities/user";
import {
  TokensContext,
  type TokensContextType,
  type UserContextType,
} from "@shared/lib/auth";
import {
  clearAuthToken,
  setAuthToken,
  setAutoRetryAfterTokenRefresh,
} from "@shared/lib/axios";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Readonly<Props>) {
  const [access, setAccess] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const instanceId = useMemo(() => Math.random().toString(36).slice(2), []);
  const authChannel = useMemo(() => {
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      return new BroadcastChannel("auth");
    }
    return null;
  }, []);

  const clearTokenLocal = useCallback(async () => {
    await queryClient.cancelQueries();
    setAccess(null);
    clearAuthToken();
    queryClient.clear();
  }, [queryClient]);

  const clearToken = useCallback(async () => {
    await clearTokenLocal();
    authChannel?.postMessage({ type: "LOGGED_OUT", from: instanceId });
  }, [authChannel, clearTokenLocal, instanceId]);

  const setToken = useCallback((token: string) => {
    setAccess(token);
    setAuthToken(token);
  }, []);

  const tryRefresh = useCallback(async () => {
    const response = await refreshToken();

    if (response) {
      setToken(response.data.access);

      return response.data.access;
    } else {
      await clearTokenLocal();

      return null;
    }
  }, [setToken, clearTokenLocal]);

  useEffect(() => {
    // 초기 진입 시 토큰 확인
    (async () => {
      try {
        await tryRefresh();
      } finally {
        setIsInitialized(true);
      }
    })();
  }, [tryRefresh]);

  useEffect(() => {
    const eject = setAutoRetryAfterTokenRefresh(() => tryRefresh());
    return () => eject?.();
  }, [tryRefresh]);

  useEffect(() => {
    if (!authChannel) return;
    const onMsg = (e: MessageEvent) => {
      if (e.data?.from === instanceId) return;

      if (e.data?.type === "LOGGED_OUT") {
        // 다른 탭에서 로그아웃 → 이 탭도 즉시 로그아웃
        void clearTokenLocal();
      }
    };
    authChannel.addEventListener("message", onMsg);
    return () => authChannel.removeEventListener("message", onMsg);
  }, [clearTokenLocal, authChannel, instanceId]);

  useEffect(() => {
    return () => authChannel?.close();
  }, [authChannel]);

  const tokensValue = useMemo<TokensContextType>(
    () => ({
      setToken: setToken,
      clearToken: clearToken,
    }),
    [setToken, clearToken]
  );

  if (!isInitialized) {
    return null;
  }

  return (
    <TokensContext.Provider value={tokensValue}>
      <UserProvider access={access}>{children}</UserProvider>
    </TokensContext.Provider>
  );
}

interface UserProviderProps {
  children: ReactNode;
  access: string | null;
}

export function UserProvider({
  children,
  access,
}: Readonly<UserProviderProps>) {
  const { data: user, isLoading, isFetching } = useMe(Boolean(access));

  const userValue = useMemo<UserContextType<UserProfileType>>(() => {
    if (Boolean(access) && user) {
      return {
        isAuthenticated: true,
        user: user,
      };
    } else {
      return {
        isAuthenticated: false,
        user: null,
      };
    }
  }, [access, user]);

  if (access !== null && (isLoading || isFetching)) return null;

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
}
