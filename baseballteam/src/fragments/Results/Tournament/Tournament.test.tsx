import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Tournament } from "./Tournament";
import { sampleTournament } from "@data/records";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<Tournament />", () => {
  it("handles different sizes and navigate correctly", async () => {
    renderWithProviders(<Tournament tournament={sampleTournament} />);

    await waitFor(() => resizeWindow(1800, 1800));
    await waitFor(() => resizeWindow(1400, 1400));
    await waitFor(() => resizeWindow(1200, 1200));
    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("game-1"));
    fireEvent.click(screen.getByTestId("game-2"));
  });
});
