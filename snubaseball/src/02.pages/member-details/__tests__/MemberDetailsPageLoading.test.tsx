import { MemberDetailsPageLoading } from "@pages/member-details";
import { renderWithProviders } from "@test-utils/renderer";

describe("MemberDetailsPageLoading", () => {
  it("renders correctly", () => {
    renderWithProviders(<MemberDetailsPageLoading />);
  });
});
