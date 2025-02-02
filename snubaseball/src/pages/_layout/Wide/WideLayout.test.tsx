import { WideLayout } from "./WideLayout";
import { renderWithProviders } from "@utils/test-utils";

describe("<WideLayout />", () => {
  it("should render", () => {
    renderWithProviders(<WideLayout />);
  });
});
