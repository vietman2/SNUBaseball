import { Divider } from "./Divider";
import { renderWithProviders } from "@utils/test-utils";

describe("<Divider />", () => {
  it("renders solid divider", () => {
    renderWithProviders(<Divider />);
  });

  it("renders dashed divider", () => {
    renderWithProviders(<Divider text="2024" type="dashed" />);
  });
});
