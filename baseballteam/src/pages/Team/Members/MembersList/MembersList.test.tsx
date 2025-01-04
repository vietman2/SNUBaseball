import { screen, waitFor } from "@testing-library/react";

import { MembersList } from "./MembersList";
import { sampleMembers } from "@data/user";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Member", () => ({
  MembersRowHeader: () => <div data-testid="members-row-header" />,
  MemberTableRow: () => <div data-testid="member-table-row" />,
}));

describe("<MembersList />", () => {
  it("handles bad response", async () => {
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(null);
    renderWithProviders(<MembersList />);

    await waitFor(() => {
    });
  });

  it("should render members list", async () => {
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(sampleMembers);
    renderWithProviders(<MembersList />);
    
    await waitFor(() => {
        expect(screen.getByTestId("members-row-header")).toBeInTheDocument();
        expect(screen.getAllByTestId("member-table-row")).toHaveLength(sampleMembers.length);
    });
  });
});
