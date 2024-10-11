import { FeedbackList } from "./FeedbackList";
import * as ThemeContext from "@contexts/theme";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: jest.fn(),
}));

describe("<FeedbackList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders in light mode", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(<FeedbackList />);
  });

  it("renders in dark mode", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });

    renderWithProviders(<FeedbackList />);
  });
});
