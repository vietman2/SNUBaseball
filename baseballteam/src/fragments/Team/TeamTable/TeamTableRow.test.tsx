import { TeamTableHeader, TeamTableRow } from "./TeamTableRow";
import { sampleTeamInfo } from "@data/team";
import { renderWithProviders } from "@utils/test-utils";

describe("<TeamTableHeader />", () => {
  it("should render", () => {
    renderWithProviders(<TeamTableHeader />);
  });
});

describe("<TeamTableRow />", () => {
  it("should render", () => {
    renderWithProviders(<TeamTableRow team={sampleTeamInfo} />);
  });
});
