import { fireEvent, screen, waitFor } from "@testing-library/react";

import GuidelinesContainer from "./GuidelinesContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./GuidelineDetail/GuidelineDetail", () => ({
  GuidelineDetail: ({ goBack }: { goBack: () => void }) => (
    <div>
      <button onClick={goBack}>goBack</button>
    </div>
  ),
}));
jest.mock("./GuidelineList/GuidelineList", () => ({
  GuidelineList: ({
    onSelectGuidelineId,
  }: {
    onSelectGuidelineId: (guidelineId: number) => void;
  }) => (
    <div>
      <button
        onClick={() => onSelectGuidelineId(1)}
        data-testid="guideline-1"
      >
        GuidelineList
      </button>
    </div>
  ),
}));
jest.mock("@components/Tabs", () => ({
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("tab")}>tab</button>
    </div>
  ),
}));

describe("<GuidelinesContainer />", () => {
  it("renders and handles tabs", async () => {
    renderWithProviders(<GuidelinesContainer />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("tab"));
  });

  it("handles guideline select", async () => {
    renderWithProviders(<GuidelinesContainer />);

    fireEvent.click(screen.getByTestId("guideline-1"));
    fireEvent.click(screen.getByText("goBack"));
  });
});
