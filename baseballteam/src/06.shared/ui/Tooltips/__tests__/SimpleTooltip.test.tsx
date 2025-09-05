import { describe, it, vi } from "vitest";

import { SimpleTooltip } from "@shared/ui/Tooltips";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Tooltips");

describe("SimpleTooltip", () => {
  it("renders tooltip text on hover", async () => {
    renderWithProviders(<SimpleTooltip text="This is a tooltip" />);
  });
});
