import { Error } from "./Error";
import { Loading } from "./Loading";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Fallbacks");

describe("<Error />", () => {
  it("renders", () => {
    renderWithProviders(<Error onRefresh={jest.fn()} />);
  });
});

describe("<Loading />", () => {
  it("renders", () => {
    renderWithProviders(<Loading />);
  });
});
