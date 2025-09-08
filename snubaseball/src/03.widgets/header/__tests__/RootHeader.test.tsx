import { RootHeader } from "@widgets/header";
import { renderWithProviders } from "@test-utils/renderer";

describe("RootHeader", () => {
  it("should render without crashing", () => {
    const { container } = renderWithProviders(<RootHeader />);
    expect(container).toBeInTheDocument();
  });
});
