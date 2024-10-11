import { fireEvent, screen, waitFor } from "@testing-library/react";

import RecordsContainer from "./RecordsContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./Results/Results", () => ({
  Results: ({ onSelectGame }: { onSelectGame: (gameId: number) => void }) => (
    <div>
      <button onClick={() => onSelectGame(1)}>Select Game</button>
    </div>
  ),
}));
jest.mock("./GameDetail/GameDetail", () => ({
  GameDetail: ({ goBack }: { goBack: () => void }) => (
    <div>
      <button onClick={goBack}>GameDetail</button>
    </div>
  ),
}));
jest.mock("./Stats/Stats", () => ({
  Stats: () => <div>Stats</div>,
}));
jest.mock("@components/Tabs", () => ({
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("경기결과")}>경기결과</button>
      <button onClick={() => setActiveTab("개인기록")}>개인기록</button>
      <button onClick={() => setActiveTab("연습경기")}>연습경기</button>
      <button onClick={() => setActiveTab("체력측정")}>체력측정</button>
      <button onClick={() => setActiveTab("asdf")}>asdf</button>
    </div>
  ),
}));

describe("<RecordsContainer />", () => {
  it("renders all tabs", async () => {
    renderWithProviders(<RecordsContainer />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("개인기록"));
    fireEvent.click(screen.getByText("연습경기"));
    fireEvent.click(screen.getByText("체력측정"));
    fireEvent.click(screen.getByText("asdf"));
  });

  it("renders game detail", () => {
    renderWithProviders(<RecordsContainer />);

    fireEvent.click(screen.getByText("Select Game"));
    fireEvent.click(screen.getByText("GameDetail"));
  });
});
