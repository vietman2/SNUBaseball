import { fireEvent, screen, waitFor } from "@testing-library/react";

import { TeamMemberAddModal } from "./TeamAdd";
import { sampleMemberMinis } from "@data/user";
import * as TeamsAPI from "@services/team/teams";
import { renderWithProviders } from "@utils/test-utils";

describe("<TeamMemberAddModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest
      .spyOn(TeamsAPI, "getMemberOptions")
      .mockResolvedValue(sampleMemberMinis);
  });

  it("handles api fail", async () => {
    jest.spyOn(TeamsAPI, "getMemberOptions").mockResolvedValue(null);
    renderWithProviders(
      <TeamMemberAddModal year={undefined} handleClose={jest.fn()} />
    );
  });

  it("handles create correctly", async () => {
    jest.spyOn(TeamsAPI, "createTeamMember").mockResolvedValue(true);
    renderWithProviders(
      <TeamMemberAddModal year="2023" handleClose={jest.fn()} />
    );

    await waitFor(() => {
      expect(screen.getByText("김유안 (21)")).toBeInTheDocument();
      fireEvent.change(screen.getByTestId("member-select"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("back-number-input"), {
        target: { value: "10" },
      });
      fireEvent.change(screen.getByTestId("role-select"), {
        target: { value: "선수" },
      });
      fireEvent.click(screen.getByTestId("registered-checkbox"));
      fireEvent.click(screen.getByText("추가"));
    });
  });

  it("handles create fail", async () => {
    jest.spyOn(TeamsAPI, "createTeamMember").mockResolvedValue(null);
    renderWithProviders(
      <TeamMemberAddModal year="2023" handleClose={jest.fn()} />
    );

    await waitFor(() => {
      expect(screen.getByText("김유안 (21)")).toBeInTheDocument();
      fireEvent.click(screen.getByText("추가"));
    });
  });
});
