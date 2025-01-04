import { fireEvent, screen } from "@testing-library/react";
import * as Router from "react-router-dom";

import { DesktopLayout } from "./Desktop";
import * as ThemeContext from "@contexts/theme";
import * as AuthAPI from "@services/auth/auth";
import { light } from "@themes/themeColors";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: {children: React.ReactNode}) => <div>{children}</div>,
  useTheme: jest.fn(),
}));

describe("<DesktopLayout />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useNavigate").mockReturnValue(jest.fn());
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/home",
      search: "",
      key: "abc",
      hash: "",
      state: null,
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
      colors: light,
    });
  });

  it("handles sidebar", () => {
    renderWithProviders(<DesktopLayout />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("Home"));
  });

  it("handles header", () => {
    jest.spyOn(AuthAPI, "logout").mockResolvedValue(true);

    renderWithProviders(<DesktopLayout />);

    fireEvent.mouseOver(screen.getByTestId("menu"));
    fireEvent.mouseOut(screen.getByTestId("menu"));
    fireEvent.click(screen.getByText("홈"));
    fireEvent.click(screen.getByText("로그아웃"));
  });

  it("handles landing on subtab", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/notices",
      search: "",
      key: "abc",
      hash: "",
      state: null,
    });

    renderWithProviders(<DesktopLayout />);
  });

  it("handles dark mode and bad logout response", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/notice",
      search: "",
      key: "abc",
      hash: "",
      state: null,
    });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
      colors: light,
    });
    jest.spyOn(AuthAPI, "logout").mockResolvedValue(null);

    renderWithProviders(<DesktopLayout />);

    fireEvent.click(screen.getByText("로그아웃"));
  });

  it("handles bad url", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/foru",
      search: "",
      key: "abc",
      hash: "",
      state: null,
    });

    renderWithProviders(<DesktopLayout />);
  });
});
