import { screen, waitFor } from "@testing-library/react";

import { History } from "./HistoryList";
import { sampleHistory } from "@data/about";
import * as HistoryAPI from "@services/history/history";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/History", () => ({
  HistoryHeaderRow: () => <div>HistoryHeaderRow</div>,
  HistoryRow: () => <div>HistoryRow</div>,
}));

describe("<History />", () => {
  it("renders", async () => {
    jest.spyOn(HistoryAPI, "getHistory").mockResolvedValueOnce(sampleHistory);

    renderWithProviders(<History />);

    await waitFor(() => {
      expect(screen.getAllByText("HistoryRow")[0]).toBeInTheDocument();
    });
  });

  it("handles api error", async () => {
    jest.spyOn(HistoryAPI, "getHistory").mockResolvedValueOnce(null);

    renderWithProviders(<History />); 
  });
});
