import { AccountingsContainer } from "./AccountingsContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./History", () => ({
  HistoryDetail: () => <div>HistoryDetail</div>,
  HistoryLayout: () => <div>HistoryLayout</div>,
  HistoryWrite: () => <div>HistoryWrite</div>,
}));

describe("<AccountingsContainer />", () => {
  it("should render successfully", () => {
    renderWithProviders(<AccountingsContainer />);
  });
});
