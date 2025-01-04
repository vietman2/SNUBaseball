import { screen, waitFor } from "@testing-library/react";

import App from "./App";
import * as AuthContext from "@contexts/auth";
import * as ThemeContext from "@contexts/theme";
import { sampleProfile } from "@data/user";
import * as AuthAPI from "@services/auth/auth";
import * as ProfileAPI from "@services/auth/profiles";
import { renderWithProviders } from "@utils/test-utils";
import { dark, light } from "@themes/themeColors";

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

jest.mock("@pages/_layout", () => ({
  RootLayout: () => <div>RootLayout</div>,
}));
jest.mock("@pages/Auth", () => ({
  Login: () => <div>Login</div>,
  SignUp: () => <div />,
}));
jest.mock("@pages/Forum", () => ({
  ForumContainer: () => <div>ForumContainer</div>,
}));
jest.mock("@pages/Home", () => ({
  HomeContainer: () => <div>HomeContainer</div>,
}));
jest.mock("@pages/Management", () => ({
  ManagementContainer: () => <div>ManagementContainer</div>,
}));
jest.mock("@pages/Records", () => ({
  RecordsContainer: () => <div>RecordsContainer</div>,
}));
jest.mock("@pages/Team", () => ({
  TeamContainer: () => <div>TeamContainer</div>,
}));
jest.mock("@pages/Training", () => ({
  TrainingContainer: () => <div>TrainingContainer</div>,
}));

describe("<App />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders and handles auto login success", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
      colors: dark,
    });
    jest
      .spyOn(AuthAPI, "refresh")
      .mockResolvedValue({ status: 200, data: "token" });
    jest
      .spyOn(ProfileAPI, "getProfile")
      .mockResolvedValue({ status: 200, data: sampleProfile });

    await waitFor(() =>
      renderWithProviders(<App />, {
        withRouter: false,
      })
    );

    await waitFor(() =>
      expect(screen.getByText("RootLayout")).toBeInTheDocument()
    );
  });

  it("renders no user (get profile fail) and light mode", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: null,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
      colors: light,
    });
    jest
      .spyOn(AuthAPI, "refresh")
      .mockResolvedValue({ status: 200, data: "token" });
    jest.spyOn(ProfileAPI, "getProfile").mockResolvedValue(null);

    await waitFor(() =>
      renderWithProviders(<App />, {
        withRouter: false,
      })
    );
  });

  it("handles refresh fail", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: null,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
      colors: light,
    });
    jest.spyOn(AuthAPI, "refresh").mockResolvedValue(null);

    await waitFor(() =>
      renderWithProviders(<App />, {
        withRouter: false,
      })
    );
  });
});
