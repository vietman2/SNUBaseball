import { fireEvent, screen, waitFor } from "@testing-library/react";

import GuidelinesContainer from "./GuidelinesContainer";
import { GuidelineSimpleType } from "@models/guidelines";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";
import { sampleGuidelines } from "@data/guidelines";

jest.mock("./GuidelineDetail/GuidelineDetail", () => ({
  GuidelineDetail: ({ goBack }: { goBack: () => void }) => (
    <div>
      <button onClick={goBack}>goBack</button>
    </div>
  ),
}));
jest.mock("./GuidelineList/GuidelineList", () => ({
  GuidelineList: ({
    onSelectGuideline,
  }: {
    onSelectGuideline: (guideline: GuidelineSimpleType) => void;
  }) => (
    <div>
      <button
        onClick={() => onSelectGuideline(sampleGuidelines[0])}
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
