import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import BareAxios from "axios";

import { SignupPage } from "@pages/auth/signup";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SignupPage", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  describe("back button", () => {
    it("handles go to login when no history", () => {
      window.history.replaceState({ idx: 0 }, "", "/auth/signup");

      const { getByText } = renderWithProviders(<SignupPage />);

      fireEvent.click(getByText("돌아가기"));

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("handles go back", () => {
      // mock history state
      window.history.replaceState({ idx: 1 }, "", "/auth/signup");

      const { getByText } = renderWithProviders(<SignupPage />);

      fireEvent.click(getByText("돌아가기"));

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe("IdCheckForm and SignupForm", () => {
    beforeEach(() => {
      vi.spyOn(BareAxios, "isAxiosError").mockReturnValue(true);
    });

    const ID_CHECK_SUCCESS_RESPONSE = {
      status: "SUCCESS",
      data: { member_id: 1, name: "홍길동" },
    };

    it("handles register success", async () => {
      const { getByTestId, getByText } = renderWithProviders(<SignupPage />);

      // student id api
      vi.spyOn(AxiosAPI.axiosInstance, "post").mockResolvedValueOnce(
        ID_CHECK_SUCCESS_RESPONSE
      );
      fireEvent.change(getByTestId("student-id-input"), {
        target: { value: "20123456" },
      });
      fireEvent.click(getByText("확인"));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("홍길동 가입 가능합니다.");
      });

      // signup api
      vi.spyOn(AxiosAPI.axiosInstance, "post").mockResolvedValueOnce({
        status: "SUCCESS",
        data: undefined,
      });
      fireEvent.change(getByTestId("username-input"), {
        target: { value: "testuser" },
      });
      fireEvent.change(getByTestId("password-input"), {
        target: { value: "TestPassword123!" },
      });
      fireEvent.change(getByTestId("password-confirm-input"), {
        target: { value: "TestPassword123!" },
      });
      fireEvent.click(getByText("회원가입"));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(
          "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."
        );
        expect(mockNavigate).toHaveBeenCalledWith("/login");
      });
    });

    it("handles id check failures", async () => {
      const { getByTestId, getByText } = renderWithProviders(<SignupPage />);

      // student id api: unknown error
      vi.spyOn(AxiosAPI.axiosInstance, "post").mockRejectedValue(
        new Error("학번을 다시 확인해주세요.")
      );
      fireEvent.change(getByTestId("student-id-input"), {
        target: { value: "20123456" },
      });
      fireEvent.click(getByText("확인"));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("알 수 없는 에러가 발생했습니다.");
      });

      // student id api: known error
      vi.spyOn(AxiosAPI.axiosInstance, "post").mockRejectedValue({
        response: {
          data: { status: "ERROR", message: "이미 가입된 학번입니다." },
        },
      });
      fireEvent.change(getByTestId("student-id-input"), {
        target: { value: "20123456" },
      });
      fireEvent.click(getByText("확인"));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("이미 가입된 학번입니다.");
      });
    });

    it("handles register api failures", async () => {
      const { getByTestId, getByText } = renderWithProviders(<SignupPage />);

      vi.spyOn(AxiosAPI.axiosInstance, "post").mockResolvedValueOnce(
        ID_CHECK_SUCCESS_RESPONSE
      );
      fireEvent.change(getByTestId("student-id-input"), {
        target: { value: "20123456" },
      });
      fireEvent.click(getByText("확인"));

      // wait for id check
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("홍길동 가입 가능합니다.");
      });

      // signup api: unknown error
      vi.spyOn(AxiosAPI.axiosInstance, "post").mockRejectedValueOnce(
        new Error("회원가입에 실패했습니다.")
      );
      fireEvent.change(getByTestId("username-input"), {
        target: { value: "testuser" },
      });
      fireEvent.change(getByTestId("password-input"), {
        target: { value: "TestPassword123!" },
      });
      fireEvent.change(getByTestId("password-confirm-input"), {
        target: { value: "TestPassword123!" },
      });
      fireEvent.click(getByText("회원가입"));

      await waitFor(() => {
        expect(getByText("알 수 없는 오류가 발생했습니다.")).toBeInTheDocument();
      });

      // signup api: known error
      vi.spyOn(AxiosAPI.axiosInstance, "post").mockRejectedValue({
        response: {
          data: { status: "ERROR", message: "아이디가 이미 존재합니다." },
        },
      });
      fireEvent.click(getByText("회원가입"));

      await waitFor(() => {
        expect(getByText("아이디가 이미 존재합니다.")).toBeInTheDocument();
      });
    });

    it("handles empty fields", async () => {
      const { getByText } = renderWithProviders(<SignupPage />);

      fireEvent.click(getByText("확인"));

      // wait for id check
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("학번을 입력해주세요.");
      });
    });
  });
});
