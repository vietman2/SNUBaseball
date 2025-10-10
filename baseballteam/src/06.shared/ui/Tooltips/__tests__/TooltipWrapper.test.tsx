import { describe, expect, it, vi } from "vitest";

import { TooltipWrapper } from "@shared/ui/Tooltips";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Tooltips");

describe("TooltipWrapper", () => {
  it("renders children and tooltip text", () => {
    const { getByText } = renderWithProviders(
      <TooltipWrapper text="Tooltip text">
        <button>Hover me</button>
      </TooltipWrapper>
    );

    expect(getByText("Hover me")).toBeInTheDocument();
    expect(getByText("Tooltip text")).toBeInTheDocument();
  });
});
