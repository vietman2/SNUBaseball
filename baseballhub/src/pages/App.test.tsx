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
  AdminContainer: () => <div />,
}));
jest.mock("@pages/Auth", () => ({
  Login: () => <div />,
  SignUp: () => <div />,
}));
jest.mock("@pages/Forum", () => ({
  ForumContainer: () => <div />,
}));
jest.mock("@pages/Guidelines", () => ({
  GuidelinesContainer: () => <div />,
}));
jest.mock("@pages/Home", () => ({
  HomeContainer: () => <div />,
}));
jest.mock("@pages/Management", () => ({
  ManagementContainer: () => <div />,
}));
jest.mock("@pages/Notes", () => ({
  NotesContainer: () => <div />,
}));
jest.mock("@pages/Records", () => ({
  RecordsContainer: () => <div />,
}));
jest.mock("@pages/Schedule", () => ({
  ScheduleContainer: () => <div />,
}));

describe("<App />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });

    await waitFor(() =>
      renderWithProviders(<App />, {
        initialUser: sampleProfile,
      })
    );
  });

  it("renders no user and light mode", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: null,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });

    await waitFor(() => renderWithProviders(<App />));
  });
});
