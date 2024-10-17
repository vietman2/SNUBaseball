import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";
import RootLayout from "./RootLayout";
import * as ThemeContext from "@contexts/theme";
import * as AuthAPI from "@services/auth/auth";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.unmock("@components/RootLayout");
jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: jest.fn(),
}));

describe("<Desktop />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render light mode and handle logout success", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });
    jest.spyOn(AuthAPI, "logout").mockResolvedValue({ status: 200, data: {} });
    renderWithProviders(<Desktop />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("Home"));
    fireEvent.click(screen.getByTestId("light-mode"));
    fireEvent.click(screen.getByTestId("dark-mode"));

    fireEvent.click(screen.getByTestId("logout"));
  });

  it("should render dark mode and handle logout fail", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });
    jest.spyOn(AuthAPI, "logout").mockResolvedValue(null);
    renderWithProviders(<Desktop />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("Home"));
    fireEvent.click(screen.getByTestId("light-mode"));
    fireEvent.click(screen.getByTestId("dark-mode"));

    fireEvent.click(screen.getByTestId("logout"));
  });
});

describe("<Mobile />", () => {
  it("should render", async () => {
    renderWithProviders(<Mobile />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("Home"));
  });
});

describe("<RootLayout />", () => {
  it("should render", async () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });
    renderWithProviders(<RootLayout />);

    await waitFor(() => resizeWindow(500, 500));
    await waitFor(() => resizeWindow(1000, 1000));
  });
});
