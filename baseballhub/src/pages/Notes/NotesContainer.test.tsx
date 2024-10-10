import { fireEvent, screen, waitFor } from "@testing-library/react";

import NotesContainer from "./NotesContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@components/Tabs", () => ({
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("훈련 일지")}>훈련 일지</button>
      <button onClick={() => setActiveTab("피드백")}>피드백</button>
      <button onClick={() => setActiveTab("전력분석")}>전력분석</button>
      <button onClick={() => setActiveTab("asdf")}>asdf</button>
    </div>
  ),
}));
jest.mock("./Feedback/Feedback", () => ({
  Feedback: () => <div>Feedback</div>,
}));

describe("<NotesContainer />", () => {
  it("renders", async () => {
    renderWithProviders(<NotesContainer />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("훈련 일지"));
    fireEvent.click(screen.getByText("피드백"));
    fireEvent.click(screen.getByText("전력분석"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
