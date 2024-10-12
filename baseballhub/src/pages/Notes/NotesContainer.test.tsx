import { fireEvent, screen, waitFor } from "@testing-library/react";

import NotesContainer from "./NotesContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@components/Headers", () => ({
  MobileHeader: () => <div />,
  PageHeader: ({
    setSelectedTab,
  }: {
    setSelectedTab: (tab: string) => void;
  }) => (
    <div>
      <button onClick={() => setSelectedTab("훈련 일지")}>훈련 일지</button>
      <button onClick={() => setSelectedTab("피드백")}>피드백</button>
      <button onClick={() => setSelectedTab("전력분석")}>전력분석</button>
      <button onClick={() => setSelectedTab("asdf")}>asdf</button>
    </div>
  ),
}));
jest.mock("./Feedback/Feedback", () => ({
  Feedback: () => <div>Feedback</div>,
}));

describe("<NotesContainer />", () => {
  it("renders", async () => {
    renderWithProviders(<NotesContainer />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByText("훈련 일지"));
    fireEvent.click(screen.getByText("피드백"));
    fireEvent.click(screen.getByText("전력분석"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
