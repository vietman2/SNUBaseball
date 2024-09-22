import { fireEvent, screen } from "@testing-library/react";

import RecordsContainer from "./RecordsContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Results/Results", () => ({
  Results: ({ onSelectGame }: { onSelectGame: (gameId: number) => void }) => (
    <div>
      <button onClick={() => onSelectGame(1)}>Select Game</button>
    </div>
  ),
}));
jest.mock("./Results/GameDetail", () => ({
  GameDetail: () => <div>GameDetail</div>,
}));
jest.mock("@components/Tabs", () => ({
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("경기결과")}>경기결과</button>
      <button onClick={() => setActiveTab("기록실")}>기록실</button>
      <button onClick={() => setActiveTab("연습경기")}>연습경기</button>
      <button onClick={() => setActiveTab("체력측정")}>체력측정</button>
      <button onClick={() => setActiveTab("asdf")}>asdf</button>
    </div>
  ),
}));

describe("<RecordsContainer />", () => {
  it("renders all tabs", () => {
    renderWithProviders(<RecordsContainer />);

    fireEvent.click(screen.getByText("기록실"));
    fireEvent.click(screen.getByText("연습경기"));
    fireEvent.click(screen.getByText("체력측정"));
    fireEvent.click(screen.getByText("asdf"));
  });

  it("renders game detail", () => {
    renderWithProviders(<RecordsContainer />);

    fireEvent.click(screen.getByText("Select Game"));
  });
});
