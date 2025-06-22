import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { useTokenRefresh, useAuth } from "@shared/lib/auth";
import { LoadingSpinner } from "@shared/ui/Fallbacks";

export function AutoLoginProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isReady, setIsReady] = useState<boolean>(false);

  const { login, logout } = useAuth();
  const { mutateAsync: refresh } = useTokenRefresh();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const result = await refresh(null, {
          onSuccess: (res) => {
            login(res.user, res.access);
          },
          onError: () => {
            logout();
          },
        });

        return result.access ?? null;
      } catch {
        return null;
      }
    };

    const initialize = async () => {
      await refreshToken();
    };

    initialize();
    setIsReady(true);

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.error === "Access Token이 만료되었습니다." &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const token = await refreshToken();

          if (token) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;

            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    // Remove the interceptor when AuthProvider unmounts
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [login, logout, refresh]);

  if (!isReady) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    ); // Show a loading spinner while checking the token
  }

  return children;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
