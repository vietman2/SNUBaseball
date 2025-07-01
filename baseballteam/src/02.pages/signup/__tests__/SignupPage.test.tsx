import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { SignupPage } from "@pages/signup";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/auth");

describe("SignupPage", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("renders and handles signup correctly", async () => {
    const { getByTestId, getByText } = renderWithProviders(<SignupPage />);

    await waitFor(() => {
      expect(getByTestId("textbutton-회원가입")).toBeInTheDocument();
    });

    // 학번 확인을 안하고 회원가입 시도 시, 오류 alert를 띄운다.
    fireEvent.click(getByTestId("textbutton-회원가입"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("학번을 먼저 확인해주세요.");
    });

    // 학번 확인
    // 1차 시도: 실패
    vi.spyOn(axios, "post").mockRejectedValueOnce(new Error());
    fireEvent.change(getByTestId("textinput-학번"), {
      target: { value: "2025-12345" },
    });
    fireEvent.click(getByText("확인"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "오류가 발생했습니다. 다시 시도해주세요."
      );
    });

    // 2차 시도: 성공
    vi.spyOn(axios, "post").mockResolvedValueOnce({ data: { member_id: 1 } });
    fireEvent.click(getByText("확인"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("학번 확인되었습니다.");
    });

    // Form 채우고, 회원가입 시도
    fireEvent.change(getByTestId("textinput-아이디"), {
      target: { value: "sample-username" },
    });
    fireEvent.change(getByTestId("textinput-비밀번호"), {
      target: { value: "sample-password" },
    });
    fireEvent.change(getByTestId("textinput-비밀번호 확인"), {
      target: { value: "sample-password" },
    });

    // 1차 시도: 실패 (by click)
    vi.spyOn(axios, "post").mockRejectedValueOnce(new Error());
    fireEvent.click(getByTestId("textbutton-회원가입"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "오류가 발생했습니다. 다시 시도해주세요."
      );
    });

    // 2차 시도: 성공 (by enter key)
    vi.spyOn(axios, "post").mockResolvedValueOnce({ data: {} });
    fireEvent.keyDown(window, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "회원가입에 성공했습니다. 로그인 해주세요."
      );
      expect(navigateMock).toHaveBeenCalledWith("/login");
    });
  });

  it("handles navigating back to LoginPage", () => {
    const { getByTestId } = renderWithProviders(<SignupPage />);

    fireEvent.click(getByTestId("textbutton-뒤로"));

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
