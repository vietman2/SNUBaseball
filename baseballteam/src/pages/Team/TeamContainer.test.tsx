import { TeamContainer } from "./TeamContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Members", () => ({
  MemberDetail: () => <div>MemberDetail</div>,
  MemberEdit: () => <div>MemberEdit</div>,
  MembersLayout: () => <div>MembersLayout</div>,
}));
jest.mock("./Minutes", () => ({
  MinutesLayout: () => <div>MinutesLayout</div>,
}));
jest.mock("./Team", () => ({
  TeamDetail: () => <div>TeamDetail</div>,
  TeamList: () => <div>TeamList</div>,
}));

describe("<TeamContainer />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<TeamContainer />);
  });
});
