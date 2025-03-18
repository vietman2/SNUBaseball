import { Graduation } from "./Graduation";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Graduates", () => ({
  GraduatesGroup: () => <div data-testid="graduates-group" />,
}));

describe("<Graduation />", () => {
  it("renders Graduation component", () => {
    renderWithProviders(<Graduation />);
  });
});
