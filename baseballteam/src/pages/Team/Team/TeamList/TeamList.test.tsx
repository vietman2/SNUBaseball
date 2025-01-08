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

  it("handles create new team", async () => {
    jest.spyOn(TeamsAPI, "getTeams").mockResolvedValue([sampleTeamInfo]);
    jest.spyOn(TeamsAPI, "createTeam").mockResolvedValue(true);
    renderWithProviders(<TeamList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("team-2023"));
      fireEvent.click(screen.getByText("팀 추가"));
      fireEvent.click(screen.getByTestId("modal-overlay"));
      fireEvent.click(screen.getByText("팀 추가"));
      fireEvent.change(screen.getByTestId("year-input"), {
        target: { value: "2023" },
      });
      fireEvent.change(screen.getByTestId("professor-input"), {
        target: { value: "professor" },
      });
      fireEvent.change(screen.getByTestId("head-coach-input"), {
        target: { value: "coach" },
      });
      fireEvent.change(screen.getByTestId("head-manager-input"), {
        target: { value: "manager" },
      });
      fireEvent.change(screen.getByTestId("captain-input"), {
        target: { value: "captain" },
      });
      fireEvent.change(screen.getByTestId("vice-captain-input"), {
        target: { value: "vice-captain" },
      });
      fireEvent.click(screen.getByText("추가"));
    });
  });

  it("handles create fail", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(TeamsAPI, "getTeams").mockResolvedValue([sampleTeamInfo]);
    jest.spyOn(TeamsAPI, "createTeam").mockResolvedValue(null);
    renderWithProviders(<TeamList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("팀 추가"));
      fireEvent.click(screen.getByText("추가"));
    });
  });
});
