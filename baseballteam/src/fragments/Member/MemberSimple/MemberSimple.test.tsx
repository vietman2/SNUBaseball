import { PlayerSimple, StaffSimple } from "./MemberSimple";
import { samplePlayerInfo, sampleStaffInfo } from "@data/team";
import { renderWithProviders } from "@utils/test-utils";

describe("<PlayerSimple />", () => {
  it("should render", () => {
    renderWithProviders(<PlayerSimple player={samplePlayerInfo} />);
  });
});

describe("<StaffSimple />", () => {
  it("should render", () => {
    renderWithProviders(<StaffSimple staff={sampleStaffInfo} />);
  });
});
