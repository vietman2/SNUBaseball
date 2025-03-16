import { HistoryHeaderRow, HistoryRow } from "./HistoryRow";
import { sampleHistory } from "@data/about";
import { renderWithProviders } from "@utils/test-utils";

describe("<HistoryHeaderRow />", () => {
  it("renders", () => {
    renderWithProviders(<HistoryHeaderRow />);
  });
});

describe("<HistoryRow />", () => {
  it("renders", () => {
    renderWithProviders(<HistoryRow history={sampleHistory[0]} />);
  });
});
