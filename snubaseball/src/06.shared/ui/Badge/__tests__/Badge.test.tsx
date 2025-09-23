import { Badge } from "@shared/ui/Badge";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Badge");

describe("Badge", () => {
  it("renders correctly with given label and color", () => {
    const { getByText } = renderWithProviders(
      <Badge label="New" color="#ff0000" />
    );

    expect(getByText("New")).toBeInTheDocument();
  });
});
