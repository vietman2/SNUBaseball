import { Statsbar } from "./Statsbar";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Progressbars");

describe("<Statsbar />", () => {
  it("renders without errors", () => {
    renderWithProviders(<Statsbar text="안타" number={5} />);
  });
});
