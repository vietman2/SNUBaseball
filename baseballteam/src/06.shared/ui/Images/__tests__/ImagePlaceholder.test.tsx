import { describe, expect, it, vi } from "vitest";

import { ImagePlaceholder } from "@shared/ui/Images";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Images");

describe("ImagePlaceholder", () => {
  it("renders correctly with required props", () => {
    const { container } = renderWithProviders(<ImagePlaceholder />);

    expect(container).toBeDefined();
  });

  it("renders correctly with optional label prop", () => {
    const { getByText } = renderWithProviders(
      <ImagePlaceholder label="Placeholder" />
    );

    expect(getByText("Placeholder")).toBeInTheDocument();
  });
});
