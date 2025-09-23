import { describe, expect, it, vi } from "vitest";

import { WarningText } from "@shared/ui/Texts";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Texts");

describe("WarningText", () => {
  it("should render correctly with given text", () => {
    const { getByText } = renderWithProviders(
      <WarningText>Warning: Example Warning</WarningText>
    );
    expect(getByText("Warning: Example Warning")).toBeInTheDocument();
  });
});
