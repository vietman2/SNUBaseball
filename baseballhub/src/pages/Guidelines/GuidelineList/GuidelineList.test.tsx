import { fireEvent, screen, waitFor } from "@testing-library/react";

import { GuidelineList } from "./GuidelineList";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Guideline", () => ({
  GuidelinePreview: () => <div />,
}));

describe("<GuidelineList />", () => {
  it("renders and handles guideline click correctly", async () => {
    renderWithProviders(
      <GuidelineList selectedCategory="내야" onSelectGuideline={jest.fn()} />
    );

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("guideline-1"));
  });
});
