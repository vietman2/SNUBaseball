import { fireEvent, screen } from "@testing-library/react";

import { GameDetail } from "./GameDetail";
import * as Hook from "@hooks/useWindowSize";
import * as ThemeContext from "@contexts/theme";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@components/Tabs", () => ({
  ExpandableTab: () => <div>ExpandableTabs</div>,
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("엔트리")}>엔트리</button>
      <button onClick={() => setActiveTab("피드백")}>피드백</button>
      <button onClick={() => setActiveTab("중계")}>중계</button>
      <button onClick={() => setActiveTab("상세기록")}>상세기록</button>
      <button onClick={() => setActiveTab("영상")}>영상</button>
      <button onClick={() => setActiveTab("asdf")}>asdf</button>
    </div>
  ),
}));
jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: jest.fn(),
}));
jest.mock("@fragments/Game", () => ({
  GameEntry: () => <div>GameEntry</div>,
  GameFeedback: () => <div>GameFeedback</div>,
  GameStory: () => <div>GameStory</div>,
  GameRecords: () => <div>GameRecords</div>,
  Scoreboard: () => <div>Scoreboard</div>,
}));

describe("<GameDetail />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders wide in light mode", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });
    jest
      .spyOn(Hook, "useWindowSize")
      .mockReturnValue({ width: 1920, height: 1000 });
    renderWithProviders(<GameDetail selectedGame={1} goBack={jest.fn()} />);
  });

  it("renders narrow in dark mode", () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });
    jest
      .spyOn(Hook, "useWindowSize")
      .mockReturnValue({ width: 768, height: 1000 });
    renderWithProviders(<GameDetail selectedGame={1} goBack={jest.fn()} />);

    fireEvent.click(screen.getByText("엔트리"));
    fireEvent.click(screen.getByText("피드백"));
    fireEvent.click(screen.getByText("중계"));
    fireEvent.click(screen.getByText("상세기록"));
    fireEvent.click(screen.getByText("영상"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
