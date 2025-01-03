import { RecordsContainer } from "./RecordsContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Results", () => ({
  ResultsDetail: () => <div>ResultsDetail</div>,
  ResultsList: () => <div>ResultsList</div>,
}));

describe("<RecordsContainer />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<RecordsContainer />);
  });
});
