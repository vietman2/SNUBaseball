import { describe, expect, it, vi } from "vitest";

import { ElevatedTextButton, ElevatedLink } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Buttons");

describe("Elevated Buttons", () => {
  it("should render ElevatedTextButton correctly", () => {
    const { getByRole } = renderWithProviders(
      <ElevatedTextButton onClick={() => {}}>Click Me</ElevatedTextButton>
    );

    const button = getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should render ElevatedLink correctly", () => {
    const { getByRole } = renderWithProviders(
      <ElevatedLink href="https://example.com">Go to Example</ElevatedLink>
    );
    const link = getByRole("link", { name: /go to example/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
