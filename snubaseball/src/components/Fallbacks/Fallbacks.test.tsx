import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./Loading";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Fallbacks");

describe("<ErrorPage />", () => {
  it("renders correctly", () => {
    renderWithProviders(<ErrorPage />);
  });
});

describe("<LoadingPage />", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingPage />);
  });
});
