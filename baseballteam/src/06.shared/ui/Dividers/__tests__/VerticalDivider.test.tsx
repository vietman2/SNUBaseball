import { describe, it, vi } from "vitest";

import { VerticalDivider } from "@shared/ui/Dividers";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Dividers");

describe("<VerticalDivider />", () => {
  it("renders correctly", () => {
    renderWithProviders(<VerticalDivider />);
  });

  it("renders correctly with options", () => {
    renderWithProviders(<VerticalDivider bold height="50%" color="blue" />);
  });
});
