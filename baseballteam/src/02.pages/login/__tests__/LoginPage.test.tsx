import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { LoginPage } from "@pages/login";
import { sampleCaptain } from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/auth");

describe("LoginPage", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("handles login request correctly", async () => {
    const { getByTestId } = renderWithProviders(<LoginPage />);

    await waitFor(() => {
      expect(getByTestId("textinput-아이디")).toBeInTheDocument();
    });

    fireEvent.change(getByTestId("textinput-아이디"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByTestId("textinput-비밀번호"), {
      target: { value: "testpassword" },
    });

    // 1차 시도: 실패 (login by click)
    vi.spyOn(axios, "post").mockRejectedValueOnce({
      response: {
        data: {
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        },
      },
    });
    fireEvent.click(getByTestId("textbutton-로그인"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("로그인에 실패했습니다.");
    });

    // 2차 시도: 성공 (login by enter key)
    vi.spyOn(axios, "post").mockResolvedValue({
      data: {
        user: sampleCaptain,
        access: "sample_access_token",
      },
    });
    fireEvent.keyDown(window, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/home");
    });
  });

  it("handles navigate to signup page", async () => {
    const { getByTestId } = renderWithProviders(<LoginPage />);

    await waitFor(() => {
      expect(getByTestId("textbutton-회원가입")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("textbutton-회원가입"));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/signup");
    });
  });
});
