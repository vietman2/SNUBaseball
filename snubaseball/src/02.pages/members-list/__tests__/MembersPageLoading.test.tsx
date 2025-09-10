import { MembersPageLoading } from "@pages/members-list";
import { renderWithProviders } from "@test-utils/renderer";

describe("MembersPageLoading", () => {
  it("renders correctly", () => {
    renderWithProviders(<MembersPageLoading />);
  });
});
