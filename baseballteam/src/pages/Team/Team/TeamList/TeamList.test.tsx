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
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(TeamsAPI, "getTeams").mockResolvedValue([sampleTeamInfo]);
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("handles bad responses", async () => {
    jest.spyOn(TeamsAPI, "getTeams").mockResolvedValue(null);
    renderWithProviders(<TeamList />);
  });

  it("handles create new team", async () => {
    jest.spyOn(TeamsAPI, "createTeam").mockResolvedValue(true);
    renderWithProviders(<TeamList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("team-2023"));
      fireEvent.click(screen.getByText("팀 추가"));
      fireEvent.change(screen.getByTestId("year"), {
        target: { value: "2023" },
      });
      fireEvent.change(screen.getByTestId("professor"), {
        target: { value: "professor" },
      });
      fireEvent.change(screen.getByTestId("head-coach"), {
        target: { value: "coach" },
      });
      fireEvent.click(screen.getByTestId("modal-overlay"));
      fireEvent.click(screen.getByText("팀 추가"));
      fireEvent.click(screen.getByText("추가"));
    });
  });

  it("handles create fail", async () => {
    jest.spyOn(TeamsAPI, "createTeam").mockResolvedValue(null);
    renderWithProviders(<TeamList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("팀 추가"));
      fireEvent.change(screen.getByTestId("head-manager"), {
        target: { value: "manager" },
      });
      fireEvent.change(screen.getByTestId("captain"), {
        target: { value: "captain" },
      });
      fireEvent.change(screen.getByTestId("vice-captain"), {
        target: { value: "vice-captain" },
      });
      fireEvent.click(screen.getByText("추가"));
    });
  });
});
