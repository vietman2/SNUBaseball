import { Feedback } from "./Feedback";
import { renderWithProviders } from "@utils/test-utils";

describe("<Feedback />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Feedback />);
  });
});
