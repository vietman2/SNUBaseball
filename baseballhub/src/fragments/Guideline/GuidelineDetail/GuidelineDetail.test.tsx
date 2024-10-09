import { waitFor } from "@testing-library/react";

import { GuidelineDetail } from "./GuidelineDetail";
import { sampleGuidelines } from "@data/guidelines";
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

  it("renders null correctly", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(
      <GuidelineDetail guideline={null} goBack={jest.fn()} />
    );
  });

  it("renders guideline in light mode correctly and handles window size", async () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(
      <GuidelineDetail guideline={sampleGuidelines[0]} goBack={jest.fn()} />
    );

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(1500, 1500));
  });

  it("renders guideline in dark mode correctly", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(
      <GuidelineDetail guideline={sampleGuidelines[0]} goBack={jest.fn()} />
    );
  });
});
