import { PageHeader } from "./PageHeader";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Headers");

describe("<PageHeader />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <PageHeader>children</PageHeader>
    );
  });
});
