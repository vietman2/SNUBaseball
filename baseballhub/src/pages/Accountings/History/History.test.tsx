import { History } from "./History";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Accountings", () => ({
  HistorySimple: () => <div />,
  HistorySimpleHeader: () => <div />,
}));

describe("<History />", () => {
  it("renders correctly", () => {
    renderWithProviders(<History />);
  });
});
