import { describe, expect, it, vi } from "vitest";

import { SimpleBadge } from "@shared/ui/Badges";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Badges");

describe("SimpleBadge", () => {
  it("should render SimpleBadge with default props correctly", () => {
    const { getByText } = renderWithProviders(
      <SimpleBadge label="Test Badge" />
    );

    expect(getByText("Test Badge")).toBeInTheDocument();
  });

  it("should render SimpleBadge with custom props correctly", () => {
    const { getByText } = renderWithProviders(
      <SimpleBadge label="Test Badge" icon="star" color="#ff0000" size={20} />
    );

    expect(getByText("Test Badge")).toBeInTheDocument();
    expect(getByText("star-icon")).toBeInTheDocument();
  });
});
