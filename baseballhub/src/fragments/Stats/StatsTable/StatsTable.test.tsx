import { StatsTable } from "./StatsTable";
import { renderWithProviders } from "@utils/test-utils";

describe("<StatsTable />", () => {
  it("renders correctly", () => {
    renderWithProviders(<StatsTable />);
  });
});
