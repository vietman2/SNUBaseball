import { PitchingTable } from "./PitchingTable";
import { renderWithProviders } from "@utils/test-utils";

describe("<PitchingTable />", () => {
  it("renders correctly", () => {
    renderWithProviders(<PitchingTable />);
  });
});
