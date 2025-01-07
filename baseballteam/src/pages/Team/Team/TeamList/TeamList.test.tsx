import { fireEvent, screen, waitFor } from "@testing-library/react";

import { TeamList } from "./TeamList";
import { sampleTeamInfo } from "@data/team";
import * as TeamsAPI from "@services/team/teams";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Team", () => ({
  TeamTableHeader: () => <div data-testid="team-table-header" />,
  TeamTableRow: () => <div data-testid="team-table-row" />,
}));

describe("<TeamList />", () => {
  it("handles bad responses", async () => {
    jest.spyOn(TeamsAPI, "getTeams").mockResolvedValue(null);
    renderWithProviders(<TeamList />);
  });

  it("renders player and staff", async () => {
    jest.spyOn(TeamsAPI, "getTeams").mockResolvedValue([sampleTeamInfo]);
    renderWithProviders(<TeamList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("team-2023"));
    });
  });
});
