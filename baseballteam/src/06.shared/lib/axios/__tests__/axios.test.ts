/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";

import { serverErrorMessageParser } from "../error";
import { axiosInstance, axiosInstanceWithAuth } from "../instance";
import {
  setAuthToken,
  clearAuthToken,
  setAutoRetryAfterTokenRefresh,
} from "../utils";

vi.unmock("@shared/lib/axios");

describe("axiosInstance", () => {
  it("axios instance should have the correct configs", () => {
    expect(axiosInstance.defaults.baseURL).toBeDefined();
    expect(axiosInstance.defaults.headers["Content-Type"]).toBe(
      "application/json"
    );
    expect(axiosInstance.defaults.withCredentials).toBe(true);
    expect(axiosInstance.defaults.timeout).toBe(2000);
  });

  it("axios instance with auth should have the correct headers", () => {
    setAuthToken("test-token");

    expect(axiosInstanceWithAuth.defaults.headers.common["Authorization"]).toBe(
      "Bearer test-token"
    );

    clearAuthToken();

    expect(
      axiosInstanceWithAuth.defaults.headers.common["Authorization"]
    ).toBeUndefined();
  });

  describe("setAutoRetryAfterTokenRefresh", () => {
    it("should set up auto retry after token refresh", async () => {
      // 1) refresh 함수 mock (단일-플라이트 검증 위해 call count 확인)
      const refreshFn = vi.fn().mockResolvedValue("new-token");

      // 2) 인터셉터 장착 (eject 반환 받아서 정리 가능)
      const eject = setAutoRetryAfterTokenRefresh(refreshFn);

      // 3) 만료된 토큰 세팅
      setAuthToken("expired-token");

      // 4) 커스텀 adapter로 응답 시뮬레이션:
      //    - 첫 시도: 403 INVALID_TOKEN
      //    - 인터셉터가 _retry 설정 + Authorization 교체 후 재시도: 200 OK
      const originalAdapter = axiosInstanceWithAuth.defaults.adapter!;
      const adapterMock = vi.fn().mockImplementation(async (config: any) => {
        const isProtected = config.url === "/some-protected-endpoint";
        const isRetry = config._retry === true;
        const authHeader = config.headers?.Authorization;

        if (isProtected && !isRetry) {
          // 첫 시도: 토큰 만료 에러
          const error: any = new Error("INVALID_TOKEN");
          error.config = config;
          error.response = {
            status: 403,
            data: { code: "INVALID_TOKEN" },
            headers: {},
            config,
          };
          error.isAxiosError = true;
          error.toJSON = vi.fn();
          throw error;
        }

        // 재시도(또는 다른 요청)는 성공 응답
        return {
          status: 200,
          statusText: "OK",
          headers: {},
          config,
          data: { ok: true, auth: authHeader },
        };
      });
      axiosInstanceWithAuth.defaults.adapter = adapterMock;

      // 5) 보호 리소스에 동시 2요청 → 첫 응답에서 403 발생,
      //    인터셉터가 refreshFn(1회) → 두 요청 모두 성공으로 resolve
      const req1 = axiosInstanceWithAuth.get("/some-protected-endpoint");
      const req2 = axiosInstanceWithAuth.get("/some-protected-endpoint");

      const [res1, res2] = await Promise.all([req1, req2]);

      // 6) 검증
      expect(refreshFn).toHaveBeenCalledTimes(1); // 단일-플라이트
      expect(res1.status).toBe(200);
      expect(res2.status).toBe(200);
      expect(res1.data).toEqual({ ok: true, auth: "Bearer new-token" });
      expect(res2.data).toEqual({ ok: true, auth: "Bearer new-token" });

      // 7) 정리: adapter / 인터셉터 원복
      axiosInstanceWithAuth.defaults.adapter = originalAdapter;
      eject?.();
    });

    it("should retry and set Authorization header even if originalRequest.headers is undefined", async () => {
      const refreshFn = vi.fn().mockResolvedValue("new-token");
      const eject = setAutoRetryAfterTokenRefresh(refreshFn);

      // adapter: 첫 요청은 headers 없음 + 403 INVALID_TOKEN, 두 번째는 200 OK
      let callCount = 0;
      axiosInstanceWithAuth.defaults.adapter = vi
        .fn()
        .mockImplementation(async (config: any) => {
          callCount++;
          if (callCount === 1) {
            // 첫 요청 → header 없음, 403 INVALID_TOKEN 에러
            const err: any = new Error("INVALID_TOKEN");
            err.isAxiosError = true;
            err.config = { ...config, headers: undefined }; // intentionally no headers
            err.response = {
              status: 403,
              data: { code: "INVALID_TOKEN" },
              headers: {},
              config: err.config,
            };
            throw err;
          }
          // 재시도 시 → 성공 응답 반환
          return {
            status: 200,
            statusText: "OK",
            headers: {},
            config,
            data: { ok: true, auth: config.headers?.Authorization },
          };
        });

      const res = await axiosInstanceWithAuth.get("/protected-no-headers");

      expect(refreshFn).toHaveBeenCalledTimes(1);
      expect(res.status).toBe(200);
      // retry 때 Authorization이 새로 세팅됐는지 확인
      expect(res.data).toEqual({ ok: true, auth: "Bearer new-token" });

      eject?.();
    });

    it("should retry but get invalid token from refreshFn", async () => {
      const refreshFn = vi.fn().mockResolvedValue(0);
      const eject = setAutoRetryAfterTokenRefresh(refreshFn);

      axiosInstanceWithAuth.defaults.adapter = vi
        .fn()
        .mockImplementation(async (config) => {
          const err: any = new Error("INVALID_TOKEN");
          err.isAxiosError = true;
          err.config = config;
          err.response = {
            status: 403,
            data: { code: "INVALID_TOKEN" },
            config,
          };
          throw err;
        });

      await expect(
        axiosInstanceWithAuth.get("/some-protected-endpoint")
      ).rejects.toThrow("INVALID_TOKEN");

      eject?.();
    });

    it("should retry but get bad response from refreshFn", async () => {
      const refreshFn = vi.fn().mockRejectedValue(null);
      const eject = setAutoRetryAfterTokenRefresh(refreshFn);

      axiosInstanceWithAuth.defaults.adapter = vi
        .fn()
        .mockImplementation(async (config) => {
          const err: any = new Error("INVALID_TOKEN");
          err.isAxiosError = true;
          err.config = config;
          err.response = {
            status: 403,
            data: { code: "INVALID_TOKEN" },
            config,
          };
          throw err;
        });

      await expect(
        axiosInstanceWithAuth.get("/some-protected-endpoint")
      ).rejects.toThrow("INVALID_TOKEN");

      eject?.();
    });

    it("should reject if there is no response or config", async () => {
      const refreshFn = vi.fn();
      const eject = setAutoRetryAfterTokenRefresh(refreshFn);

      // adapter가 response 없는 에러를 던지도록
      axiosInstanceWithAuth.defaults.adapter = vi
        .fn()
        .mockImplementation(async () => {
          const err: any = new Error("Network error");
          err.isAxiosError = true;
          // response 없음
          throw err;
        });

      await expect(axiosInstanceWithAuth.get("/any")).rejects.toThrow(
        "Network error"
      );
      expect(refreshFn).not.toHaveBeenCalled();

      eject?.();
    });

    it("should not retry on /tokens/refresh/ endpoint", async () => {
      const refreshFn = vi.fn();
      const eject = setAutoRetryAfterTokenRefresh(refreshFn);

      axiosInstanceWithAuth.defaults.adapter = vi
        .fn()
        .mockImplementation(async (config) => {
          const err: any = new Error("INVALID_TOKEN");
          err.isAxiosError = true;
          err.config = config;
          err.response = {
            status: 403,
            data: { code: "INVALID_TOKEN" },
            config,
          };
          throw err;
        });

      await expect(
        axiosInstanceWithAuth.get("/tokens/refresh/")
      ).rejects.toThrow("INVALID_TOKEN");
      expect(refreshFn).not.toHaveBeenCalled();

      eject?.();
    });

    it("should reject if status/code not matching", async () => {
      const refreshFn = vi.fn();
      const eject = setAutoRetryAfterTokenRefresh(refreshFn);

      axiosInstanceWithAuth.defaults.adapter = vi
        .fn()
        .mockImplementation(async (config) => {
          const err: any = new Error("Unauthorized");
          err.isAxiosError = true;
          err.config = config;
          err.response = { status: 401, data: { code: "OTHER_ERROR" }, config };
          throw err;
        });

      await expect(axiosInstanceWithAuth.get("/protected")).rejects.toThrow(
        "Unauthorized"
      );
      expect(refreshFn).not.toHaveBeenCalled();

      eject?.();
    });
  });

  describe("serverErrorMessageParser", () => {
    it("should parse known axios error with message", () => {
      const mockError: any = new Error("Request failed");
      mockError.isAxiosError = true;
      mockError.response = {
        data: { message: "Detailed server error", status: "FAIL" },
      };

      const result = serverErrorMessageParser(
        mockError,
        "Fallback error message"
      );
      expect(result).toEqual({
        status: "FAIL",
        message: "Detailed server error",
      });
    });

    it("should return fallback for axios error without message", () => {
      const mockError: any = new Error("Request failed");
      mockError.isAxiosError = true;
      mockError.response = { data: {} };

      const result = serverErrorMessageParser(
        mockError,
        "Fallback error message"
      );
      expect(result).toEqual({
        status: "ERROR",
        message: "Fallback error message",
      });
    });

    it("should return fallback for non-axios error", () => {
      const genericError = new Error("Some other error");

      const result = serverErrorMessageParser(
        genericError,
        "Fallback error message"
      );
      expect(result).toEqual({
        status: "ERROR",
        message: "Fallback error message",
      });
    });
  });
});
