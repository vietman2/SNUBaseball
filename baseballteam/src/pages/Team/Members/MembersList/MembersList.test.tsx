import { fireEvent, screen, waitFor } from "@testing-library/react";

import { MembersList } from "./MembersList";
import { sampleMembers } from "@data/user";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Member", () => ({
  MemberAdd: ({ handleClose }: { handleClose: () => void }) => (
    <button onClick={handleClose} data-testid="close" />
  ),
  MembersRowHeader: () => <div data-testid="members-row-header" />,
  MemberTableRow: () => <div data-testid="member-table-row" />,
}));

describe("<MembersList />", () => {
  it("handles bad response", async () => {
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(null);
    renderWithProviders(<MembersList />);

    await waitFor(() => {});
  });

  it("should render members list", async () => {
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(sampleMembers);
    renderWithProviders(<MembersList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("추가"));
      fireEvent.click(screen.getByTestId("member-1"));
      fireEvent.click(screen.getByTestId("close"));
    });
  });
});
