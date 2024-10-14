import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Guidelines } from "./Guidelines";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Guideline", () => ({
  GuidelineDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>GuidelineDetail</button>
  ),
  GuidelineSimple: () => <div />,
}));

describe("<Guidelines />", () => {
  it("renders wide screen correctly", async () => {
    renderWithProviders(<Guidelines selectedCategory="내야" />);

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("guideline-1"));
    fireEvent.click(screen.getByText("GuidelineDetail"));
  });

  it("renders mobile screen correctly", async () => {
    renderWithProviders(<Guidelines selectedCategory="내야" />);

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("guideline-1"));
    fireEvent.click(screen.getByText("GuidelineDetail"));
  });
});
