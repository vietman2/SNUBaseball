import { Stats } from "./Stats";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Stats", () => ({
  StatsTable: () => <div>StatsTable</div>,
}));

describe("<Stats />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Stats />);
  });
});
