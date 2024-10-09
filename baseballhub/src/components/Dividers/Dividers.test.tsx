import { VerticalDivider } from "./VerticalDivider";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Dividers");

describe("<VerticalDivider />", () => {
  it("renders correctly", () => {
    renderWithProviders(<VerticalDivider />);
  });
  
  it("renders correctly with options", () => {
    renderWithProviders(<VerticalDivider bold color="black" height="50%" />);
  });
});
