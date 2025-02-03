import { AboutContainer } from "./AboutContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./History/History", () => ({
  History: () => <div>History</div>,
}));
jest.mock("./Team/Team", () => ({
  Team: () => <div>Team</div>,
}));

describe("<AboutContainer />", () => {
  it("renders", () => {
    renderWithProviders(<AboutContainer />);
  });
});
