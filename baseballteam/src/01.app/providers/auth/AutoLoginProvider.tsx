import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { refresh, useAuth } from "@shared/lib/auth";
import { LoadingSpinner } from "@shared/ui/Fallbacks";

export function AutoLoginProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isReady, setIsReady] = useState<boolean>(false);

  const { login, logout } = useAuth();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await refresh();

        login(response.user, response.access);

        return response.access;
      } catch {
        logout();

        return null;
      }
    };

    const initialize = async () => {
      await refreshToken();

      setIsReady(true);
    };

    initialize();

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
  }, [login, logout]);

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
