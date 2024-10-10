import { InformationSimple } from "./InformationSimple";
import { renderWithProviders } from "@utils/test-utils";

describe("<InformationSimple />", () => {
  it("renders correctly", () => {
    renderWithProviders(<InformationSimple />);
  });
});
