import { HistoryDetail } from "./HistoryDetail";
import { renderWithProviders } from "@utils/test-utils";

describe("<HistoryDetail />", () => {
  it("renders correctly", () => {
    renderWithProviders(<HistoryDetail historyId={1} goBack={jest.fn()} />);
  });
});
