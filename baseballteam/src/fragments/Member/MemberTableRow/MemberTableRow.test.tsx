import { MembersRowHeader, MemberTableRow } from "./MemberTableRow";
import { sampleMembers } from "@data/user";
import { renderWithProviders } from "@utils/test-utils";

describe("<MembersRowHeader />", () => {
  it("renders", () => {
    renderWithProviders(<MembersRowHeader />);
  });
});

describe("<MemberTableRow />", () => {
  it("renders", () => {
    renderWithProviders(<MemberTableRow index={0} member={sampleMembers[0]} />);
  });
});
