import { Team } from "./Team";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Team", () => ({
  TeamTable: () => <div>TeamTable</div>,
}));

describe("<Team />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Team />);
  });
});
