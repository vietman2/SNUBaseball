import { Homecoming } from "./Homecoming";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Homecoming", () => ({
  Results: () => <div>Results</div>,
}));

describe("<Homecoming />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<Homecoming />);
  });
});
