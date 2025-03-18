import { Results } from "./Results";
import { sampleResults } from "@data/events";
import { renderWithProviders } from "@utils/test-utils";

describe("<Results />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Results results={sampleResults[0]} />);
  });
});
