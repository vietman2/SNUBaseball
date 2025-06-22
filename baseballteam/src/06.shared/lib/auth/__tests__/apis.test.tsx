import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import {
  useLogin,
  useSignup,
  useStudentIdCheck,
  useTokenRefresh,
  samplePlayer,
} from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/auth");

const MockComponent = () => {
  const { mutate: refresh } = useTokenRefresh();
  const { mutate: checkStudentId } = useStudentIdCheck();
  const { mutate: login } = useLogin();
  const { mutate: signup } = useSignup();

  const handleRequest = async () => {
    refresh(null);
  };

  const handleCheck = async () => {
    checkStudentId({ studentId: "1234567890" });
  };

  const handleLogin = async () => {
    login({ username: "testuser", password: "password" });
  };

  const handleSignup = async () => {
    signup({
      memberId: 1,
      studentId: "student_id",
      username: "newuser",
      password: "newpassword",
      passwordConfirm: "newpassword",
    });
  };

  return (
    <div>
      <button onClick={handleRequest}>Refresh Token</button>
      <button onClick={handleCheck}>Check Student ID</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

describe("refresh", () => {
  it("should return user profile and token", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      data: { user: samplePlayer, token: "mock_token" },
    });
    const { getByText } = renderWithProviders(<MockComponent />);

    fireEvent.click(getByText("Refresh Token"));
  });
});

describe("checkStudentId", () => {
  it("should return user profile and token", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      data: { user: samplePlayer, token: "mock_token" },
    });
    const { getByText } = renderWithProviders(<MockComponent />);

    fireEvent.click(getByText("Check Student ID"));
  });

  it("should show error on failure", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(axios, "post").mockRejectedValue({
      response: {
        data: { error: "Invalid Student ID" },
      },
    });
    const { getByText } = renderWithProviders(<MockComponent />);

    fireEvent.click(getByText("Check Student ID"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Invalid Student ID");
    });
  });
});

describe("login", () => {
  it("should return user profile and token", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      data: { user: samplePlayer, token: "mock_token" },
    });
    const { getByText } = renderWithProviders(<MockComponent />);

    fireEvent.click(getByText("Login"));
  });
});

describe("signup", () => {
  it("should return user profile and token", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      data: { user: samplePlayer, token: "mock_token" },
    });
    const { getByText } = renderWithProviders(<MockComponent />);

    fireEvent.click(getByText("Signup"));
  });

  it("should show error on failure", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(axios, "post").mockRejectedValue(new Error("Signup failed"));
    const { getByText } = renderWithProviders(<MockComponent />);

    fireEvent.click(getByText("Signup"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "회원가입에 실패했습니다. 다시 시도해주세요."
      );
    });
  });
});
