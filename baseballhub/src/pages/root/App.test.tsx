import { fireEvent, screen, waitFor } from "@testing-library/react";

import App from "./App";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("react-router-dom");
jest.unmock("@pages/Auth/AuthProvider");

describe("<App />", () => {
  it("renders no user", () => {
    jest.mock("@pages/Auth/AuthProvider", () => ({
      AuthProvider: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      ),
      useAuth: () => ({
        logout: jest.fn(),
        login: jest.fn(),
      }),
    }));
    renderWithProviders(<App />);
  });

  it("renders user", () => {
    jest.mock("@pages/Auth/AuthProvider", () => ({
      AuthProvider: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      ),
      useAuth: () => ({
        user: {
          uuid: "1",
          token: "token",
        },
        logout: jest.fn(),
        login: jest.fn(),
      }),
    }));

    renderWithProviders(<App />, {
      initialUser: {
        uuid: "1",
        token: "token",
      },
    });

    waitFor(() => fireEvent.click(screen.getByTestId("button-로그인")));
  });
});
