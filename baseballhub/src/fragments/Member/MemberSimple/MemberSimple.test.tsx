import { sampleMembers } from "@data/user";
import { MemberSimple, MemberSimpleHeader } from "./MemberSimple";
import { renderWithProviders } from "@utils/test-utils";

describe("<MemberSimple />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <MemberSimple member={sampleMembers[0]} wide={true} />
        <MemberSimple member={sampleMembers[4]} wide={true} />
      </>
    );
  });
});

describe("<MemberSimpleHeader />", () => {
  it("renders correctly", () => {
    renderWithProviders(<MemberSimpleHeader wide={true} />);
  });
});
