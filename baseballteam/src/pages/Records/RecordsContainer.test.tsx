import { RecordsContainer } from "./RecordsContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Results/Results", () => ({
  Results: () => <div>Results</div>,
}));

describe("<RecordsContainer />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<RecordsContainer />);
  });
});
