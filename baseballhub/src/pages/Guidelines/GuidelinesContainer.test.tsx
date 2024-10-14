import { fireEvent, screen, waitFor } from "@testing-library/react";

import GuidelinesContainer from "./GuidelinesContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./Guidelines/Guidelines", () => ({
  Guidelines: () => <div />,
}));
jest.mock("@components/Headers", () => ({
  MobileHeader: () => <div />,
  PageHeader: ({
    setSelectedTab,
  }: {
    setSelectedTab: (tab: string) => void;
  }) => (
    <div>
      <button onClick={() => setSelectedTab("tab")}>tab</button>
    </div>
  ),
}));

describe("<GuidelinesContainer />", () => {
  it("renders and handles tabs", async () => {
    renderWithProviders(<GuidelinesContainer />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByText("tab"));
  });
});
