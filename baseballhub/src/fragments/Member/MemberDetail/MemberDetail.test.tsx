import { MemberDetail } from "./MemberDetail";
import { renderWithProviders } from "@utils/test-utils";

describe("<MemberDetail />", () => {
  it("renders correctly", () => {
    renderWithProviders(<MemberDetail memberId={1} goBack={() => {}} />);
  });
});
