import { waitFor } from "@testing-library/react";

import { GuidelineDetail } from "./GuidelineDetail";
import * as ThemeContext from "@contexts/theme";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: jest.fn(),
}));

describe("<GuidelineDetail />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders light mode", async () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(<GuidelineDetail guidelineId={1} goBack={() => {}} />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));
  });

  it("renders dark mode", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(<GuidelineDetail guidelineId={1} goBack={() => {}} />);
  });
});
