import { MembersPageLoading } from "@pages/about/members-list";
import { renderWithProviders } from "@test-utils/renderer";

describe("MembersPageLoading", () => {
  it("renders correctly", () => {
    renderWithProviders(<MembersPageLoading />);
  });
});
