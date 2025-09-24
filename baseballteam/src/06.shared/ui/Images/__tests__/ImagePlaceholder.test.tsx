import { describe, expect, it, vi } from "vitest";

import { ImagePlaceholder } from "@shared/ui/Images";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Images");

describe("ImagePlaceholder", () => {
  it("renders correctly with required props", () => {
    const { container } = renderWithProviders(
      <ImagePlaceholder width="100px" height="100px" borderRadius="8px" />
    );

    expect(container).toBeDefined();
  });

  it("renders correctly with optional label prop", () => {
    const { container, getByText } = renderWithProviders(
      <ImagePlaceholder
        width="150px"
        height="150px"
        borderRadius="12px"
        label="Placeholder"
      />
    );

    expect(getByText("Placeholder")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
