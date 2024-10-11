import { Information } from "./Information";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Information", () => ({
  InformationSimple: () => <div />,
}));

describe("<Information />", () => {
  it("renders correctly", async () => {
    renderWithProviders(<Information />);
  });
});
