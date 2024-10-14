import { waitFor } from "@testing-library/react";

import { GuidelineDetail } from "./GuidelineDetail";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<GuidelineDetail />", () => {
  it("should render", async () => {
    renderWithProviders(<GuidelineDetail guidelineId={1} goBack={() => {}} />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));
  });
});
