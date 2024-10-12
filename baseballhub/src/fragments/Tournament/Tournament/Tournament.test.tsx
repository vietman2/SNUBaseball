import { waitFor } from "@testing-library/react";

import { Tournament } from "./Tournament";
import { sampleTournament } from "@data/records";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Game", () => ({
  GameSummary: () => <div>GameSummary</div>,
}));

describe("<Tournament />", () => {
  it("renders correctly", async () => {
    renderWithProviders(
      <Tournament tournament={sampleTournament} onSelectGame={jest.fn()} />
    );

    await waitFor(() => resizeWindow(1920, 1920));
    await waitFor(() => resizeWindow(1440, 1440));
    await waitFor(() => resizeWindow(1080, 1080));
    await waitFor(() => resizeWindow(768, 768));
  });
});
