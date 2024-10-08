import { fireEvent, screen, waitFor } from "@testing-library/react";

import App from "./App";
import { sampleProfile } from "@data/user/people";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("react-router-dom");
jest.unmock("@contexts/auth");

jest.mock("@pages/Admin", () => ({
  Members: () => <div />,
}));
jest.mock("@pages/Forum", () => ({
  Board: () => <div />,
}));
jest.mock("@pages/Home", () => ({
  Home: () => <div />,
}));
jest.mock("@pages/Records", () => ({
  RecordsContainer: () => <div />,
}));
jest.mock("@pages/Schedule", () => ({
  ScheduleContainer: () => <div />,
}));
jest.mock("@pages/Training", () => ({
  Feedback: () => <div />,
  Guidelines: () => <div />,
  Journals: () => <div />,
}));

describe("<App />", () => {
  it("renders no user", () => {
    jest.mock("@contexts/auth", () => ({
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
    jest.mock("@contexts/auth", () => ({
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
      initialUser: sampleProfile,
    });

    waitFor(() => fireEvent.click(screen.getByTestId("button-로그인")));
  });
});
