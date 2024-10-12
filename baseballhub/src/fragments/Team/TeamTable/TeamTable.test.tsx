import { waitFor } from "@testing-library/react";

import { TeamTable } from "./TeamTable";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<TeamTable />", () => {
  it("renders correctly", async () => {
    renderWithProviders(<TeamTable />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));
  });
});
