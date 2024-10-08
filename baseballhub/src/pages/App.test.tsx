import { fireEvent, screen, waitFor } from "@testing-library/react";

import App from "./App";
import * as AuthContext from "@contexts/auth";
import * as ThemeContext from "@contexts/theme";
import { sampleProfile } from "@data/user/people";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("react-router-dom");
jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: jest.fn(),
}));

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders no user and light mode", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: null,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(<App />);
  });

  it("renders user", () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(<App />, {
      initialUser: sampleProfile,
    });

    waitFor(() => fireEvent.click(screen.getByTestId("button-로그인")));
  });
});
