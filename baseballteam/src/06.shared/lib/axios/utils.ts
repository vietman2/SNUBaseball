/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, type AxiosRequestConfig } from "axios";

import { axiosInstanceWithAuth } from "./instance";

export function setAuthToken(token: string) {
  axiosInstanceWithAuth.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}
export function clearAuthToken() {
  delete axiosInstanceWithAuth.defaults.headers.common["Authorization"];
}

// ❌ 모듈 전역 변수 제거
// let refreshPromise: Promise<string | null> | null = null;

export function setAutoRetryAfterTokenRefresh(
  refreshFn: () => Promise<string | null>
) {
  // ✅ 이 인터셉터 세트만 쓰는 지역 상태
  let refreshPromise: Promise<string | null> | null = null;

  const id = axiosInstanceWithAuth.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
      const originalRequest = error.config as
        | (AxiosRequestConfig & { _retry?: boolean })
        | undefined;
      const status = error.response?.status;
      const code = error.response?.data?.code;

      if (!error.response || !originalRequest) {
        return Promise.reject(error);
      }
      if (originalRequest.url?.endsWith("/tokens/refresh/")) {
        return Promise.reject(error);
      }

      if (
        status === 403 &&
        code === "INVALID_TOKEN" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        // 단일-플라이트 + 지역 상태
        refreshPromise ??= (async () => {
          try {
            const newToken = await refreshFn(); // 실패는 아래 catch로 흘림
            return typeof newToken === "string" && newToken ? newToken : null;
          } catch {
            return null;
          } finally {
            // 다음 tick에서만 비움 (같은 에러에 몰려든 요청들 보호)
            queueMicrotask(() => {
              refreshPromise = null;
            });
          }
        })();

        const newToken = await refreshPromise;

        if (newToken) {
          originalRequest.headers = originalRequest.headers ?? {};
          (originalRequest.headers as any).Authorization = `Bearer ${newToken}`;
          return axiosInstanceWithAuth(originalRequest);
        }

        // 새 토큰이 없으면 원래 에러 유지
        throw error;
      }

      throw error;
    }
  );

  // 인터셉터 제거 시 지역 상태도 함께 정리
  return () => {
    refreshPromise = null;
    axiosInstanceWithAuth.interceptors.response.eject(id);
  };
}
