import { fireEvent, screen, waitFor } from "@testing-library/dom";

import { Header } from "./WideHeader";
import * as ThemeContext from "@contexts/theme";
import { Main } from "@navigation/main";
import * as AuthAPI from "@services/auth/auth";
import { renderWithProviders } from "@utils/test-utils";
import { dark } from "@themes/themeColors";

jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: jest.fn(),
}));

describe("<WideHeader />", () => {
  it("handles menu, tabs and logout", async () => {
    jest.spyOn(AuthAPI, "logout").mockResolvedValue({ status: 200, data: {} });
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      colors: dark,
      toggleTheme: jest.fn(),
    });
    renderWithProviders(
      <Header
        title="Home"
        subtabs={Main.tabs[0].subtabs}
        activeSubTab={Main.tabs[0].subtabs[0]}
        setActiveSubtab={jest.fn()}
      />
    );

    await waitFor(() => {
      fireEvent.mouseOver(screen.getByTestId("menu"));
      fireEvent.mouseOut(screen.getByTestId("menu"));
      fireEvent.click(screen.getByText("홈"));
      fireEvent.click(screen.getByText("로그아웃"));
    });
  });

  it("renders dark mode and logout fail", async () => {
    jest.spyOn(AuthAPI, "logout").mockResolvedValue(null);
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      colors: dark,
      toggleTheme: jest.fn(),
    });
    renderWithProviders(
      <Header
        title="Home"
        subtabs={Main.tabs[0].subtabs}
        activeSubTab={Main.tabs[0].subtabs[0]}
        setActiveSubtab={jest.fn()}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("로그아웃"));
    });
  });
});
