import { waitFor } from "@testing-library/react";

import HomeContainer from "./HomeContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<HomeContainer />", () => {
  it("renders without crashing", async () => {
    renderWithProviders(<HomeContainer />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));
  });
});
