import { fireEvent, screen, waitFor } from "@testing-library/react";

import { SignUp } from "./SignUp";
import * as RegisterAPI from "@services/auth/register";
import { renderWithProviders } from "@utils/test-utils";

jest.spyOn(window, "alert").mockImplementation(() => {});

describe("<SignUp />", () => {
  it("handles signup failure (no member id) and go back", () => {
    renderWithProviders(<SignUp />);

    fireEvent.click(screen.getByTestId("button-회원가입"));
    fireEvent.click(screen.getByText("뒤로"));
  });

  it("handles check student id failure", () => {
    renderWithProviders(<SignUp />);

    jest.spyOn(RegisterAPI, "checkStudentId").mockResolvedValue(null);

    fireEvent.change(screen.getByTestId("textinput-학번"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByText("확인"));

    jest.spyOn(RegisterAPI, "checkStudentId").mockResolvedValue({
      status: 400,
      error: "Invalid student ID",
    });

    waitFor(() => fireEvent.click(screen.getByText("확인")));
  });

  it("handles register failure", async () => {
    jest.spyOn(RegisterAPI, "checkStudentId").mockResolvedValue({
      status: 200,
      data: { id: 1, name: "test" },
    });

    renderWithProviders(<SignUp />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("확인"));
      expect(screen.getByText("확인")).toBeDisabled();
    });

    jest.spyOn(RegisterAPI, "signUp").mockResolvedValue(null);
    await waitFor(() => fireEvent.click(screen.getByTestId("button-회원가입")));

    jest.spyOn(RegisterAPI, "signUp").mockResolvedValue({
      status: 400,
      error: "Invalid input",
    });
    await waitFor(() => fireEvent.click(screen.getByTestId("button-회원가입")));
  });

  it("handles register success", async () => {
    jest.spyOn(RegisterAPI, "checkStudentId").mockResolvedValue({
      status: 200,
      data: { id: 1, name: "test" },
    });
    jest.spyOn(RegisterAPI, "signUp").mockResolvedValue({
      status: 201,
      data: {},
    });

    renderWithProviders(<SignUp />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("확인"));
      expect(screen.getByText("확인")).toBeDisabled();
    });

    await waitFor(() => fireEvent.click(screen.getByTestId("button-회원가입")));
  });
});
