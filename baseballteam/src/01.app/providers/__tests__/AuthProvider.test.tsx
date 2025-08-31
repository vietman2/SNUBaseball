/* eslint-disable  @typescript-eslint/no-explicit-any */
import { act, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthProvider } from "../auth/AuthProvider";
import * as RefreshTokenAPI from "@features/auth/refreshToken";
import * as AuthAPI from "@entities/user";
import { useTokens } from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/auth");

const MockComponent = () => {
  const { isAuthenticated, user } = AuthAPI.useUser();
  const { setToken, clearToken } = useTokens();

  return (
    <div>
      <p>{isAuthenticated ? user.name : "Not Authenticated"}</p>
      {isAuthenticated ? (
        <button onClick={clearToken}>Logout</button>
      ) : (
        <button onClick={() => setToken("mock-token")}>Login</button>
      )}
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.spyOn(AuthAPI, "useMe").mockReturnValue({
      data: AuthAPI.sampleUser,
    } as any);
  });

  describe("초기 진입", () => {
    it("앱을 열면 곧바로 토큰 refresh를 시도한다 (실패)", async () => {
      vi.spyOn(RefreshTokenAPI, "refreshToken").mockResolvedValue(null);

      const { getByText } = renderWithProviders(
        <AuthProvider>
          <MockComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(getByText("Not Authenticated")).toBeInTheDocument();
      });

      expect(RefreshTokenAPI.refreshToken).toHaveBeenCalledTimes(1);
    });

    it("앱을 열면 곧바로 토큰 refresh를 시도한다 (성공)", async () => {
      vi.spyOn(RefreshTokenAPI, "refreshToken").mockResolvedValue({
        data: {
          access: "mock-access-token",
        },
        status: "SUCCESS",
      });

      const { getByText } = renderWithProviders(
        <AuthProvider>
          <MockComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(getByText(AuthAPI.sampleUser.name)).toBeInTheDocument();
      });

      expect(RefreshTokenAPI.refreshToken).toHaveBeenCalledTimes(1);
    });
  });

  describe("로그인/로그아웃", () => {
    beforeEach(() => {
      vi.spyOn(RefreshTokenAPI, "refreshToken").mockResolvedValue(null);
    });

    it("로그인 버튼을 누르면 로그인되고, 로그아웃 버튼을 누르면 로그아웃된다", async () => {
      const { getByText } = renderWithProviders(
        <AuthProvider>
          <MockComponent />
        </AuthProvider>
      );

      // Initially not authenticated
      await waitFor(() => {
        expect(getByText("Not Authenticated")).toBeInTheDocument();
      });

      fireEvent.click(getByText("Login"));

      await waitFor(() => {
        expect(getByText("테스트 유저")).toBeInTheDocument();
      });

      fireEvent.click(getByText("Logout"));

      await waitFor(() => {
        expect(getByText("Not Authenticated")).toBeInTheDocument();
      });
    });
  });

  describe("다중 탭 동기화", () => {
    beforeEach(() => {
      vi.spyOn(RefreshTokenAPI, "refreshToken").mockResolvedValue({
        data: {
          access: "mock-access-token",
        },
        status: "SUCCESS",
      });
    });

    it("한 탭에서 로그아웃하면 다른 탭도 로그아웃된다", async () => {
      const { getByText } = renderWithProviders(
        <AuthProvider>
          <MockComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(getByText("테스트 유저")).toBeInTheDocument();
      });

      // Simulate logout from another tab
      act(() => {
        new (globalThis as any).BroadcastChannel("auth").postMessage({
          type: "LOGGED_OUT",
          from: "some-other-tab",
        });
      });

      await waitFor(() => {
        expect(getByText("Not Authenticated")).toBeInTheDocument();
      });
    });

    it("ignores any other messages (other than logged out)", async () => {
      const { getByText } = renderWithProviders(
        <AuthProvider>
          <MockComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(getByText("테스트 유저")).toBeInTheDocument();
      });

      // Simulate irrelevant message from another tab
      act(() => {
        new (globalThis as any).BroadcastChannel("auth").postMessage({
          type: "SOME_OTHER_MESSAGE",
          from: "some-other-tab",
        });
      });

      // Still authenticated
      expect(getByText("테스트 유저")).toBeInTheDocument();
    });

    it("fails to set up BroadcastChannel", async () => {
      const originalBC = (globalThis as any).BroadcastChannel;
      delete (globalThis as any).BroadcastChannel;
      try {
        const { getByText } = renderWithProviders(
          <AuthProvider>
            <MockComponent />
          </AuthProvider>
        );

        await waitFor(() => {
          expect(getByText("테스트 유저")).toBeInTheDocument();
        });
      } finally {
        // 2) 원복
        (globalThis as any).BroadcastChannel = originalBC;
      }
    });
  });
});
