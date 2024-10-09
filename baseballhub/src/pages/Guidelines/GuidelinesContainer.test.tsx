import { fireEvent, screen, waitFor } from "@testing-library/react";
import GuidelinesContainer from "./GuidelinesContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@components/Tabs", () => ({
  ChipTabs: () => <div>ChipTabs</div>,
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("내야")}>내야</button>
    </div>
  ),
}));
jest.mock("@fragments/Guideline", () => ({
  GuidelineDetail: ({ goBack }: { goBack: () => void }) => (
    <div>
      <button onClick={goBack}>GuidelineDetail</button>
    </div>
  ),
  GuidelinePreview: () => <div>GuidelinePreview</div>,
}));

describe("<GuidelinesContainer />", () => {
  it("renders and handles all buttons", async () => {
    renderWithProviders(<GuidelinesContainer />);

    fireEvent.click(screen.getByTestId("guideline-1"));
    fireEvent.click(screen.getByText("GuidelineDetail"));
    fireEvent.click(screen.getByText("내야"));

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("내야"));
  });
});
