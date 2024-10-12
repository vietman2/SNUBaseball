import { Results } from "./Results";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Tournament", () => ({
  Tournament: () => <div>Tournament</div>,
}));

describe("<Results />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Results onSelectGame={jest.fn()} />);
  });
});
