import { BattingTable } from "./BattingTable";
import { renderWithProviders } from "@utils/test-utils";

describe("<BattingTable />", () => {
  it("renders correctly", () => {
    renderWithProviders(<BattingTable />);
  });
});
