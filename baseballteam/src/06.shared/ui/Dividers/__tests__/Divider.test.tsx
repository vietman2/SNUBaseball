import { describe, it, vi } from "vitest";

import { Divider } from "@shared/ui/Dividers";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Dividers");

describe("<Divider />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Divider />);
  });

  it("renders correctly with options", () => {
    renderWithProviders(<Divider bold color="blue" />);
  });
});
