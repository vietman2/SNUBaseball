import { HistoryContainer } from "./HistoryContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./HistoryList/HistoryList", () => ({
  History: () => <div>History</div>,
}));

describe("<HistoryContainer />", () => {
  it("renders History by default", () => {
    renderWithProviders(<HistoryContainer />);
  });
});
