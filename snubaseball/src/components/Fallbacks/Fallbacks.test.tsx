import { ErrorPage } from "./ErrorPage";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Fallbacks");

describe("<ErrorPage />", () => {
  it("renders correctly", () => {
    renderWithProviders(<ErrorPage />);
  });
});
