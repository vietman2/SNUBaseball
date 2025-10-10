import { describe, expect, it, vi } from "vitest";

import { ElevatedLink, TextLink } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Buttons");

describe("Links", () => {
  it("should render ElevatedLink correctly", () => {
    const { getByRole } = renderWithProviders(
      <ElevatedLink to="https://example.com">Go to Example</ElevatedLink>
    );
    const link = getByRole("link", { name: /go to example/i });
    expect(link).toBeInTheDocument();
  });

  it("should render TextLink correctly", () => {
    const { getByRole } = renderWithProviders(
      <TextLink to="https://example.com">Go to Example</TextLink>
    );
    const link = getByRole("link", { name: /go to example/i });
    expect(link).toBeInTheDocument();
  });
});
