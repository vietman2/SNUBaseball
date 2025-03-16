import { screen, waitFor } from "@testing-library/dom";

import { Members } from "./Members";
import { sampleManagers, samplePlayers } from "@data/about";
import * as HistoryAPI from "@services/history/history";
import { renderWithProviders } from "@utils/test-utils";

describe("<Members />", () => {
  it("renders correctly", async () => {
    jest
      .spyOn(HistoryAPI, "getMembers")
      .mockResolvedValue({ players: samplePlayers, managers: sampleManagers });

    renderWithProviders(<Members />);

    await waitFor(() => {
      expect(screen.getByTestId("player-1")).toBeInTheDocument();
    });
  });

  it("handles api error", async () => {
    jest.spyOn(HistoryAPI, "getMembers").mockResolvedValue(null);

    renderWithProviders(<Members />);
  });
});
