import { TeamContainer } from "./TeamContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Members", () => ({
  MembersList: () => <div>MembersList</div>,
}));
jest.mock("./Team", () => ({
  TeamList: () => <div>TeamList</div>,
}));

describe("<TeamContainer />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<TeamContainer />);
  });
});
