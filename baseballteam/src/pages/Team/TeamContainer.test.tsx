import { TeamContainer } from "./TeamContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Members", () => ({
  MembersList: () => <div>MembersList</div>,
}));

describe("<TeamContainer />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<TeamContainer />);
  });
});
