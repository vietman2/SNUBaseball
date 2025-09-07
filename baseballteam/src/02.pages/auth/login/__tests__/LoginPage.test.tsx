import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { LoginPage } from "@pages/auth/login";
import { axiosInstance } from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

describe("LoginPage", () => {
  it("회원가입 버튼 클릭 시, 회원가입 페이지로 이동", () => {
    const { getByText } = renderWithProviders(<LoginPage />);

    fireEvent.click(getByText("회원가입"));
  });

  it("로그인 폼을 정상적으로 작성하고 제출하면 로그인 요청", async () => {
    vi.spyOn(axiosInstance, "post").mockResolvedValue({
      data: { access: "sample-jwt-token" },
    });

    const { getByTestId } = renderWithProviders(<LoginPage />);

    fireEvent.change(getByTestId("username-input"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "testpassword" },
    });

    // Form 제출로 테스트
    fireEvent.submit(getByTestId("login-form"));

    await waitFor(() => {
      // 로그인 버튼이 로딩 상태가 되는지 확인
      expect(getByTestId("login-button")).toBeDisabled();
    });
  });

  it("로그인 실패 시, 에러 메시지 표시", async () => {
    vi.spyOn(axiosInstance, "post").mockRejectedValue({
      response: {
        data: { status: "ERROR", message: "Invalid credentials" },
      },
    });

    const { getByTestId, findByText } = renderWithProviders(<LoginPage />);

    fireEvent.change(getByTestId("username-input"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "wrongpassword" },
    });

    // 버튼 클릭으로 테스트
    fireEvent.click(getByTestId("login-button"));

    // 에러 메시지가 화면에 표시되는지 확인
    expect(await findByText("Invalid credentials")).toBeInTheDocument();
  });

  it("handles unknown error during login", async () => {
    vi.spyOn(axiosInstance, "post").mockRejectedValue(
      new Error("Network Error")
    );

    const { getByTestId, findByText } = renderWithProviders(<LoginPage />);

    fireEvent.change(getByTestId("username-input"), {
      target: { value: "anyuser" },
    });
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "anypassword" },
    });

    fireEvent.click(getByTestId("login-button"));

    expect(
      await findByText("알 수 없는 에러가 발생했습니다.")
    ).toBeInTheDocument();
  });
});
