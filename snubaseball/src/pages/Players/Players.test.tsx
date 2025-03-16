import { Players } from "./Players";
import { renderWithProviders } from "@utils/test-utils";

describe("<Players />", () => {
  it("renders correctly", async () => {
    renderWithProviders(<Players />);
  });
});
