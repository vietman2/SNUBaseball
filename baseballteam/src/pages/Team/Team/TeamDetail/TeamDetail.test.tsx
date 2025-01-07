import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { TeamDetail } from "./TeamDetail";
import { sampleTeamMembers } from "@data/team";
import * as TeamsAPI from "@services/team/teams";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Member", () => ({
  PlayerSimple: () => <div>PlayerSimple</div>,
  StaffSimple: () => <div>StaffSimple</div>,
}));
jest.mock("@fragments/Team", () => ({
  TeamMemberAddModal: ({ handleClose }: { handleClose: () => void }) => (
    <button onClick={handleClose} data-testid="close" />
  ),
}));

describe("<TeamDetail />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ year: "2023" });
  });

  it("handles bad response", async () => {
    jest.spyOn(TeamsAPI, "getTeamDetail").mockResolvedValue(null);
    renderWithProviders(<TeamDetail />);

    await waitFor(() => {
      expect(screen.getByText("데이터가 없습니다.")).toBeInTheDocument();
    });
  });

  it("renders correctly", async () => {
    jest.spyOn(TeamsAPI, "getTeamDetail").mockResolvedValue(sampleTeamMembers);
    renderWithProviders(<TeamDetail />);

    await waitFor(() => {
      expect(screen.getByText("PlayerSimple")).toBeInTheDocument();
      fireEvent.click(screen.getByText("팀원 추가"));
      fireEvent.click(screen.getByTestId("close"));
    });

    fireEvent.click(screen.getByTestId("back"));
  });
});
