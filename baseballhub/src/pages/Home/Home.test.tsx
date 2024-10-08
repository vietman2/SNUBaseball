import { screen, waitFor } from "@testing-library/react";

import Home from "./Home";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<Home />", () => {
  it("renders without crashing", async () => {
    renderWithProviders(<Home />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));
  });
});
