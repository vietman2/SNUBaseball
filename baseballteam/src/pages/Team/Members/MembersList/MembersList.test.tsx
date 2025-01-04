import { fireEvent, screen, waitFor } from "@testing-library/react";

import { MembersList } from "./MembersList";
import { sampleTeamInfo } from "@data/team";
import * as TeamsAPI from "@services/team/teams";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Member", () => ({
  PlayerSimple: () => <div data-testid="player-simple" />,
  StaffSimple: () => <div data-testid="staff-simple" />,
}));

describe("<MembersList />", () => {
  it("handles bad responses", async () => {
    jest.spyOn(TeamsAPI, "getTeamDetail").mockResolvedValue(null);
    jest.spyOn(TeamsAPI, "getTeams").mockResolvedValue(null);
    renderWithProviders(<MembersList />);
  });

  it("renders player and staff", async () => {
    jest.spyOn(TeamsAPI, "getTeamDetail").mockResolvedValue(sampleTeamInfo);
    jest.spyOn(TeamsAPI, "getTeams").mockResolvedValue({ years: [2025, 2024] });
    renderWithProviders(<MembersList />);

    await waitFor(() => {
      expect(screen.getByTestId("player-simple")).toBeInTheDocument();
      fireEvent.change(screen.getByTestId("year-select"), { target: { value: "2024" } });
    });
  });
});
